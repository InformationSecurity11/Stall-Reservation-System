import React, { useState, useRef, useEffect, useCallback, forwardRef, ReactElement, cloneElement } from 'react'
import { createPortal } from 'react-dom'

type Align = 'start' | 'center' | 'end'

const MenuContext = React.createContext<{
  open: boolean
  setOpen: (v: boolean) => void
}>({ open: false, setOpen: () => {} })

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <MenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </MenuContext.Provider>
  )
}

export const DropdownMenuTrigger = forwardRef<HTMLButtonElement, { asChild?: boolean; children: any }>(
  ({ asChild, children }, ref) => {
    const { open, setOpen } = React.useContext(MenuContext)

    const toggle = (e?: React.MouseEvent) => {
      e?.stopPropagation()
      setOpen(!open)
    }

    useEffect(() => {
      const onDoc = () => setOpen(false)
      if (open) document.addEventListener('click', onDoc)
      return () => document.removeEventListener('click', onDoc)
    }, [open, setOpen])

    if (asChild && React.isValidElement(children)) {
      return cloneElement(children as ReactElement, {
        ref,
        onClick: (e: any) => {
          ;(children as any).props?.onClick?.(e)
          toggle(e)
        },
        'data-state': open ? 'open' : 'closed',
      })
    }

    return (
      <button ref={ref} onClick={toggle} data-state={open ? 'open' : 'closed'}>
        {children}
      </button>
    )
  }
)
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger'

export function DropdownMenuContent({
  children,
  align = 'start',
  className = '',
}: {
  children: React.ReactNode
  align?: Align
  className?: string
}) {
  const { open, setOpen } = React.useContext(MenuContext)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false)
  }, [setOpen])

  useEffect(() => {
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onKey])

  if (!open) return null

  const alignmentClass = align === 'end' ? 'right-0 left-auto' : align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0'

  const content = (
    <div ref={wrapperRef} className={`absolute z-50 mt-2 ${alignmentClass} ${className}`} role="menu">
      {children}
    </div>
  )

  // Render inline (portal not strictly necessary but useful)
  return createPortal(content, document.body)
}

export function DropdownMenuItem({ children, onClick, className = '' }: any) {
  const { setOpen } = React.useContext(MenuContext)
  const handle = (e: React.MouseEvent) => {
    onClick?.(e)
    setOpen(false)
  }
  return (
    <div
      role="menuitem"
      tabIndex={0}
      onClick={handle}
      onKeyDown={(e) => e.key === 'Enter' && handle(e as any)}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer ${className}`}
    >
      {children}
    </div>
  )
}

export function DropdownMenuLabel({ children, className = '' }: any) {
  return <div className={`px-3 py-2 text-xs font-semibold ${className}`}>{children}</div>
}

export function DropdownMenuSeparator({ className = '' }: { className?: string }) {
  return <div className={`h-px w-full my-2 ${className}`} />
}

export default DropdownMenu
