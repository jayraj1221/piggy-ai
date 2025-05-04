# 🚀 Piggy.ai API Documentation

## 📌 API Endpoints

### File: authRoutes.js

* **POST** `/api/register/parent` — Register a new parent user

  * **URL**: `/api/register/parent`
  * **Body**:

    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "securepassword"
    }
    ```

* **POST** `/api/register/child` — Register a new child user (requires parent auth)

  * **URL**: `/api/register/child`
  * **Body**:

    ```json
    {
      "name": "Child Doe",
      "email": "child@example.com",
      "password": "securepassword"
    }
    ```
  * **Headers**:
    * `Authorization: Bearer <token>`

* **POST** `/api/login` — Login endpoint for parent or child

  * **URL**: `/api/login`
  * **Body**:

    ```json
    {
        "name": "Charlie John",
        "email": "John@example.com",
        "password": "ChildPass123"
    }
    ```
  * **Headers**: `Content-Type: application/json`

---
