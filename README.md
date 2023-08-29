# Authentication API Documentation

Welcome to the Authentication API documentation. This API provides endpoints for authentication-related operations, user registration, login, and user information updates.

- This API is Implemented in Express.js
- PostgreSQL is used data persistance.
- Express-validator to validate user payload.
- Jwt token to verify user.
- Password hashing using bcrypt.

## Base URL

The base URL for all API endpoints is `https://vast-red-ladybug-tux.cyclic.app/api`.

## Endpoints

## To Create a User

**Endpoint**: `POST /users`

**Request:**

```json
POST /signup

Body:
{
    "email":"hardeep@gmail.com",
    "password":"akm12345"
}
```

## To update a user

**Endpoint**: `PUT /users/:id`

First Login to get JWT token Add it to beare token then update user,

**Request:**

```json
PUT /users/:id

Body:
{
    "email":"hardeep@gmail.com", "username":"hardeep"
}
```

## To Delete a user

**Endpoint**: `DELETE /users/:id`

First Login to get JWT token Add it to beare token then update user,

**Request:**

```json
DELETE /users/:id
```

## To get all User.

**Endpoint**: `GET /users`

**Request:**

```json
GET /users
```

## To get User By ID.

**Endpoint**: `GET /users/:id`

**Request:**

```json
GET /users/:id
```
