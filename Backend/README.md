# GoCabby Backend API Documentation

## User Registration Endpoint

### `POST /user/register`

Registers a new user in the system.

---

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "password": "yourpassword"
}
```

#### **Field Requirements**
- `fullname.firstname`: String, required, minimum 3 characters
- `fullname.lastname`: String, required, minimum 3 characters
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
      "phone": "1234567890"
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
        "param": "fullname.firstname",
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
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "password": "yourpassword"
  }'
```

---

## User Login Endpoint

### `POST /user/login`

Authenticates a user and returns a JWT token.

---

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### **Field Requirements**
- `email`: String, required, valid email format
- `password`: String, required, minimum 6 characters

---

### **Responses**

#### **200 OK**
- **Description:** Login successful.
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
      "phone": "1234567890"
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
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      ...
    ]
  }
  ```

#### **401 Unauthorized**
- **Description:** Invalid email or password.
- **Body:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

---

### **Example cURL Request**

```sh
curl -X POST http://localhost:4000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

---

**Note:**  
- Both fields are required.
- The endpoint returns a JWT token upon successful login.

---

## User Profile Endpoint

### `GET /user/profile`

Returns the profile of the authenticated user.

---

### **Headers**

- `Authorization: Bearer <JWT Token>`

or

- Send the token as a cookie named `token`.

---

### **Responses**

#### **200 OK**
- **Description:** Returns the authenticated user's profile.
- **Body:**
  ```json
  {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "phone": "1234567890",
    // ...other user fields
  }
  ```

#### **401 Unauthorized**
- **Description:** Token is missing, invalid, expired, or blacklisted.
- **Body:**
  ```json
  {
    "message": "Unauthorized access"
  }
  ```

---

### **Example cURL Request**

```sh
curl -X GET http://localhost:4000/user/profile \
  -H "Authorization: Bearer <JWT Token>"
```

---

## User Logout Endpoint

### `POST /user/logout`

Logs out the authenticated user by blacklisting their JWT token.

---

### **Headers**

- `Authorization: Bearer <JWT Token>`

or

- Send the token as a cookie named `token`.

---

### **Responses**

#### **200 OK**
- **Description:** User logged out successfully.
- **Body:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

#### **401 Unauthorized**
- **Description:** Token is missing, invalid, expired, or already blacklisted.
- **Body:**
  ```json
  {
    "message": "Unauthorized access"
  }
  ```

---

### **Example cURL Request**

```sh
curl -X POST http://localhost:4000/user/logout \
  -H "Authorization: Bearer <JWT Token>"
```

---

## Captain Registration Endpoint

### `POST /captain/register`

Registers a new captain (driver) in the system.

---

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "phone": "9876543210",
  "password": "yourpassword",
  "vehicle": {
    "color": "white",
    "plate": "MH 47 CJ 0001",
    "type": "car"
  }
}
```

#### **Field Requirements**
- `fullname.firstname`: String, required, minimum 3 characters
- `fullname.lastname`: String, required, minimum 3 characters
- `email`: String, required, valid email format, unique
- `phone`: String, required, exactly 10 digits
- `password`: String, required, minimum 6 characters
- `vehicle.color`: String, required, minimum 3 characters
- `vehicle.plate`: String, required, minimum 3 characters
- `vehicle.type`: String, required, one of `car`, `bike`, or `auto`

---

### **Responses**

#### **201 Created**
- **Description:** Captain registered successfully.
- **Body:**
  ```json
  {
    "token": "<JWT Token>",
    "captain": {
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "phone": "9876543210",
      "vehicle": {
        "color": "white",
        "plate": "MH 47 CJ 0001",
        "type": "car"
      },
      // ...other captain fields
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
        "param": "fullname.firstname",
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
    "error": "Error creating captain: <error message>"
  }
  ```

---

### **Example cURL Request**

```sh
curl -X POST http://localhost:4000/captain/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "phone": "9876543210",
    "password": "yourpassword",
    "vehicle": {
      "color": "white",
      "plate": "MH 47 CJ 0001",
      "type": "car"
    }
  }'
```

---

## Captain Login Endpoint

### `POST /captain/login`

Authenticates a captain and returns a JWT token.

---

### **Request Body**

```json
{
  "email": "jane.doe@example.com",
  "password": "yourpassword"
}
```

#### **Field Requirements**
- `email`: String, required, valid email format
- `password`: String, required, minimum 6 characters

---

### **Responses**

#### **200 OK**
- **Description:** Login successful.
- **Body:**
  ```json
  {
    "token": "<JWT Token>",
    "captain": {
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "phone": "9876543210",
      "vehicle": {
        "color": "white",
        "plate": "MH 47 CJ 0001",
        "type": "car"
      }
      // ...other captain fields
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
        "msg": "Please provide a valid email address",
        "param": "email",
        "location": "body"
      },
      ...
    ]
  }
  ```

#### **401 Unauthorized**
- **Description:** Invalid email or password.
- **Body:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

---

### **Example cURL Request**

```sh
curl -X POST http://localhost:4000/captain/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.doe@example.com",
    "password": "yourpassword"
  }'
```

---

## Captain Profile Endpoint

### `GET /captain/profile`

Returns the profile of the authenticated captain.

---

### **Headers**

- `Authorization: Bearer <JWT Token>`

or

- Send the token as a cookie named `token`.

---

### **Responses**

#### **200 OK**
- **Description:** Returns the authenticated captain's profile.
- **Body:**
  ```json
  {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "phone": "9876543210",
    "vehicle": {
      "color": "white",
      "plate": "MH 47 CJ 0001",
      "type": "car"
    }
    // ...other captain fields
  }
  ```

#### **401 Unauthorized**
- **Description:** Token is missing, invalid, expired, or blacklisted.
- **Body:**
  ```json
  {
    "message": "Unauthorized access"
  }
  ```

---

### **Example cURL Request**

```sh
curl -X GET http://localhost:4000/captain/profile \
  -H "Authorization: Bearer <JWT Token>"
```

---

## Captain Logout Endpoint

### `GET /captain/logout`

Logs out the authenticated captain by blacklisting their JWT token.

---

### **Headers**

- `Authorization: Bearer <JWT Token>`

or

- Send the token as a cookie named `token`.

---

### **Responses**

#### **200 OK**
- **Description:** Captain logged out successfully.
- **Body:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

#### **401 Unauthorized**
- **Description:** Token is missing, invalid, expired, or already blacklisted.
- **Body:**
  ```json
  {
    "message": "Unauthorized access"
  }
  ```

---

### **Example cURL Request**

```sh
curl -X GET http://localhost:4000/captain/logout \
  -H "Authorization: Bearer <JWT Token>"
```