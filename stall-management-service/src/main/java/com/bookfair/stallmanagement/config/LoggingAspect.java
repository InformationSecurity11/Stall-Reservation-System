package com.bookfair.stall.config;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class LoggingAspect {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Before("execution(* com.bookfair.stall.service.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        logger.info("Entering method: {} with arguments: {}", 
                joinPoint.getSignature().getName(), Arrays.toString(joinPoint.getArgs()));
    }

    @AfterReturning(pointcut = "execution(* com.bookfair.stall.service.*.*(..))", returning = "result")
    public void logAfter(JoinPoint joinPoint, Object result) {
        logger.info("Exiting method: {} with result: {}", 
                joinPoint.getSignature().getName(), result);
    }
}