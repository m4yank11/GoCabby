# GoCabby Backend API Documentation

## User Registration Endpoint

### `POST /user/register`

Registers a new user in the system.

---

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "password": "yourpassword"
}
```

#### **Field Requirements**
- `firstname`: String, required, minimum 3 characters
- `lastname`: String, required, minimum 3 characters
- `email`: String, required, valid email format, unique
- `phone`: String, required, exactly 10 digits
- `password`: String, required, minimum 6 characters

---

### **Responses**

#### **201 Created**
- **Description:** User registered successfully.
- **Body:**
  ```json
  {
    "token": "<JWT Token>",
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "phone": "1234567890",
      "password": "<hashed_password>"
    }
  }
  ```

#### **400 Bad Request**
- **Description:** Validation failed. One or more fields are missing or invalid.
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters long",
        "param": "firstname",
        "location": "body"
      },
      ...
    ]
  }
  ```

#### **500 Internal Server Error**
- **Description:** Server error or database error.
- **Body:**
  ```json
  {
    "error": "Error creating user: <error message>"
  }
  ```

---

### **Example cURL Request**

```sh
curl -X POST http://localhost:4000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "password": "yourpassword"
  }'
```

---

**Note:**  
- All fields are required.
- The endpoint returns a JWT token upon successful registration.