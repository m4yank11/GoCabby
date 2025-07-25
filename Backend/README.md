# GoCabby Backend API Documentation

## User Registration Endpoint

### `POST /User/register`

Registers a new User in the system.

---

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "password": "yourpassword"
}
```

#### **Field Requirements**
- `fullName.firstName`: String, required, minimum 3 characters
- `fullName.lastName`: String, required, minimum 3 characters
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
    "User": {
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
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
        "param": "fullName.firstName",
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
    "error": "Error creating User: <error message>"
  }
  ```

---

### **Example cURL Request**

```sh
curl -X POST http://localhost:4000/User/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "password": "yourpassword"
  }'
```

---

## User Login Endpoint

### `POST /User/login`

Authenticates a User and returns a JWT token.

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
    "User": {
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
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
curl -X POST http://localhost:4000/User/login \
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

### `GET /User/profile`

Returns the profile of the authenticated User.

---

### **Headers**

- `Authorization: Bearer <JWT Token>`

or

- Send the token as a cookie named `token`.

---

### **Responses**

#### **200 OK**
- **Description:** Returns the authenticated User's profile.
- **Body:**
  ```json
  {
    "_id": "User_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "phone": "1234567890",
    // ...other User fields
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
curl -X GET http://localhost:4000/User/profile \
  -H "Authorization: Bearer <JWT Token>"
```

---

## User Logout Endpoint

### `POST /User/logout`

Logs out the authenticated User by blacklisting their JWT token.

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
curl -X POST http://localhost:4000/User/logout \
  -H "Authorization: Bearer <JWT Token>"
```

---

## Captain Registration Endpoint

### `POST /Captain/register`

Registers a new Captain (driver) in the system.

---

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Doe"
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
- `fullName.firstName`: String, required, minimum 3 characters
- `fullName.lastName`: String, required, minimum 3 characters
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
    "Captain": {
      "fullName": {
        "firstName": "Jane",
        "lastName": "Doe"
      },
      "email": "jane.doe@example.com",
      "phone": "9876543210",
      "vehicle": {
        "color": "white",
        "plate": "MH 47 CJ 0001",
        "type": "car"
      },
      // ...other Captain fields
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
        "param": "fullName.firstName",
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
    "error": "Error creating Captain: <error message>"
  }
  ```

---

### **Example cURL Request**

```sh
curl -X POST http://localhost:4000/Captain/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
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

### `POST /Captain/login`

Authenticates a Captain and returns a JWT token.

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
    "Captain": {
      "fullName": {
        "firstName": "Jane",
        "lastName": "Doe"
      },
      "email": "jane.doe@example.com",
      "phone": "9876543210",
      "vehicle": {
        "color": "white",
        "plate": "MH 47 CJ 0001",
        "type": "car"
      }
      // ...other Captain fields
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
curl -X POST http://localhost:4000/Captain/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.doe@example.com",
    "password": "yourpassword"
  }'
```

---

## Captain Profile Endpoint

### `GET /Captain/profile`

Returns the profile of the authenticated Captain.

---

### **Headers**

- `Authorization: Bearer <JWT Token>`

or

- Send the token as a cookie named `token`.

---

### **Responses**

#### **200 OK**
- **Description:** Returns the authenticated Captain's profile.
- **Body:**
  ```json
  {
    "_id": "Captain_id",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "jane.doe@example.com",
    "phone": "9876543210",
    "vehicle": {
      "color": "white",
      "plate": "MH 47 CJ 0001",
      "type": "car"
    }
    // ...other Captain fields
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
curl -X GET http://localhost:4000/Captain/profile \
  -H "Authorization: Bearer <JWT Token>"
```

---

## Captain Logout Endpoint

### `GET /Captain/logout`

Logs out the authenticated Captain by blacklisting their JWT token.

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
curl -X GET http://localhost:4000/Captain/logout \
  -H "Authorization: Bearer <JWT Token>"
```

---

## Maps API Endpoints

#### Get Distance and Time

**Route:** `GET /Maps/getDistanceTime`

**Description:** Calculates the estimated travel distance and time between two locations.

| Parameter   | Type   | Required | Description                         |
|-------------|--------|----------|-------------------------------------|
| pickup      | string | Yes      | Pickup location address.            |
| destination | string | Yes      | Destination location address.       |

**Example Request:**

```sh
curl -X GET "http://localhost:4000/Maps/getDistanceTime?pickup=VR%20Trillium%20Mall,%20Nagpur&destination=Futala%20Lake,%20Nagpur"
```

**Success Response (200 OK):**

```json
{
  "distance": { "value": 3500 },
  "duration": { "value": 600 }
}
```

---

### Ride API Endpoints

#### Create a New Ride

**Route:** `POST /Ride/create`

**Description:** Allows an authenticated user to request a new ride.

**Authentication:** Required – include the user's JWT in the `Authorization` header.

| Parameter    | Type   | Required | Description                                                     |
|--------------|--------|----------|-----------------------------------------------------------------|
| pickup       | string | Yes      | Pickup location address.                                          |
| destination  | string | Yes      | Destination location address.                                     |
| vehicleType  | string | Yes      | Type of vehicle (must be one of: `car`, `bike`, or `auto`).         |

**Example Request:**

```sh
curl -X POST http://localhost:4000/Ride/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT Token>" \
  -d '{
    "pickup": "VR Trillium Mall, Nagpur",
    "destination": "Futala Lake, Nagpur",
    "vehicleType": "car"
  }'
```

**Success Response (201 Created):**

```json
{
  "_id": "60d0fe4f5311236168a109ca",
  "user": "60d0fe4f5311236168a109c9",
  "pickup": "VR Trillium Mall, Nagpur",
  "destination": "Futala Lake, Nagpur",
  "fare": 345,
  "status": "pending",
  "duration": 600,
  "distance": 3500,
  "otp": "1234",
  "createdAt": "2025-07-25T12:34:56.789Z",
  "updatedAt": "2025-07-25T12:34:56.789Z"
}
```

**Error Response Examples:**

- **400 Bad Request (Validation Error):**

  ```json
  {
    "errors": [
      {
        "msg": "Invalid pickup address",
        "param": "pickup",
        "location": "body"
      },
      {
        "msg": "Invalid destination address",
        "param": "destination",
        "location": "body"
      }
    ]
  }
  ```

- **401 Unauthorized:**

  ```json
  {
    "message": "Authentication failed. Please log in again."
  }
  ```