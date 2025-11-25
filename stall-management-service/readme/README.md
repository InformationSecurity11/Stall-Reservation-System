## 🔌 Stall Service API Endpoints

**Base URL:** `http://localhost:8082`

> **Note:** All endpoints (except public ones) require a valid JWT Token in the header.
>
> **Header:** `Authorization: Bearer <your_token>`

### 🛒 Stall Management

| Method | Endpoint | Description | Expected Status |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/stalls` | Create a new stall | `201 Created` |
| `PUT` | `/api/stalls/{id}` | Update an existing stall | `200 OK` |
| `DELETE` | `/api/stalls/{id}` | Delete a stall | `204 No Content` |

#### **Create / Update Request Body**

```json
{
  "stallCode": "A-001",
  "name": "Stall A",
  "size": "MEDIUM",
  "section": "Hall A",
  "row": 1,
  "column": 1,
  "xPosition": 100.0,
  "yPosition": 200.0,
  "width": 3.0,
  "length": 3.0,
  "pricePerDay": 5000.0,
  "description": "Corner stall near entrance"
}