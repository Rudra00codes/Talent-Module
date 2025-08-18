# Talent Platform API Documentation

Base URL: `http://localhost:8080/api` (development)

## Authentication

### Register User
**POST** `/auth/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "talent" // or "client", "admin"
}
```

### Login
**POST** `/auth/login`

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

Returns JWT token to use in Authorization header: `Bearer <token>`

### Get Profile
**GET** `/auth/profile`
Requires authentication.

## Talent Endpoints

### Get All Approved Talents
**GET** `/talent`

### Register New Talent
**POST** `/talent/register`
Content-Type: multipart/form-data

```
name: string
email: string
phone: string
skills: JSON string [{"name": "JavaScript", "expertiseLevel": "Expert"}]
description: string
profilePhoto: file (optional)
```

### Get Talent by ID
**GET** `/talent/:id`

## Admin Endpoints

All admin endpoints require authentication with admin role.

### Get Pending Talents
**GET** `/admin/pending-talents`

### Get All Talents (Admin View)
**GET** `/admin/talents`

### Get Talent by ID (Admin)
**GET** `/admin/talents/:id`

### Approve Talent
**PUT** `/admin/approve/:id`

### Reject Talent
**PUT** `/admin/reject/:id`

```json
{
  "rejectionReason": "Profile incomplete"
}
```

## Response Format

### Success Response
```json
{
  "message": "Operation successful",
  "data": { ... },
  "token": "jwt-token" // only for auth endpoints
}
```

### Error Response
```json
{
  "error": "Error message",
  "details": ["Detailed error info"] // optional
}
```

## Status Codes

- 200: Success
- 201: Created
- 400: Bad Request (validation error)
- 401: Unauthorized (authentication required)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 500: Internal Server Error

## File Upload

Profile photos are stored in `/uploads/profile-photos/` directory.
Maximum file size: 5MB
Allowed formats: JPEG, JPG, PNG

## Skills Format

Skills should be sent as an array of objects:

```json
[
  {
    "name": "JavaScript",
    "expertiseLevel": "Expert"
  },
  {
    "name": "React",
    "expertiseLevel": "Advanced"
  }
]
```

Expertise levels: Beginner, Intermediate, Advanced, Expert