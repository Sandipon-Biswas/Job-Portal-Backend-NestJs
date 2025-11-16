# Job Portal API – NestJS

A complete **Job Portal Backend API** built with **NestJS**, featuring **role-based authentication**, **job posting**, **job applications**, **profile management**, and **file uploads** using Cloudinary.

---

## ⭐ Features

### 🔐 Authentication
- Register
- Login
- JWT Auth
- Role-based access (`user`, `recruiter`, `admin`)
- Profile info for logged-in users

### 👤 Users Module
- Get my profile
- Update my profile
- Upload profile photo
- Upload CV
- Admin: Get all users

### 💼 Jobs Module
- Recruiter: Create job
- Public: View jobs + job details
- Recruiter: Update own job
- Recruiter/Admin: Delete job

### 📨 Applications Module
- User: Apply to a job
- Recruiter: View applicants
- Recruiter: Update application status
- User: View my applications

### 📤 File Upload Module
- Upload profile photo
- Upload CV
- Uses Cloudinary

---

## 📁 Project Structure
src/
├── auth/
├── users/
├── jobs/
├── applications/
├── upload/
├── common/
└── main.ts


# 🚀 API Endpoints Guide (Job Board Backend)

This guide provides a quick reference for testing all major API endpoints of the Job Board backend, running locally on `http://localhost:3000`.

## 🔑 Authentication and Headers

All protected endpoints require a **JWT (JSON Web Token)**.

1.  **Login** to get the token.
2.  Include the token in the **`Authorization`** header for protected routes:
    * **Key:** `Authorization`
    * **Value:** `Bearer <Your JWT Token Here>`

## 🌐 Endpoints List

### 1. 🔐 Authentication & User Management (`/auth`, `/users`)

| Method | Endpoint | Description | Role Required | Demo Body (JSON) |
| :--- | :--- | :--- | :--- | :--- |
| **`POST`** | `/auth/register` | Create a new user account. | None | `{"email": "new.user@example.com", "password": "securePass123", "role": "applicant"}` |
| **`POST`** | `/auth/login` | Authenticate and receive a JWT token. | None | `{"email": "test@example.com", "password": "securePass123"}` |
| **`GET`** | `/auth/profile` | Check token validity (returns user ID/role). | Any (JWT) | (No Body) |
| **`GET`** | `/users/me` | Retrieve the logged-in user's profile. | Any (JWT) | (No Body) |
| **`PATCH`**| `/users/me` | Update the logged-in user's profile. | Any (JWT) | `{"firstName": "Jane", "phone": "017xxxxxxx"}` |
| **`GET`** | `/users` | List all users in the system. | **Admin** (JWT) | (No Body) |

---

### 2. 💼 Job Management (`/jobs`)

| Method | Endpoint | Description | Role Required | Demo Body (JSON) |
| :--- | :--- | :--- | :--- | :--- |
| **`POST`** | `/jobs` | Recruiter posts a new job listing. | **Recruiter** (JWT) | `{"title": "DevOps Engineer", "description": "Cloud experience needed.", "salary": 95000}` |
| **`GET`** | `/jobs` | View all public job listings. | None | (No Body) |
| **`GET`** | `/jobs/:id` | View a specific job listing by its ID. | None | (No Body) |
| **`PATCH`**| `/jobs/:id` | Recruiter updates their own job listing. | **Recruiter** (JWT) | `{"title": "Senior DevOps Engineer"}` |
| **`DELETE`**| `/jobs/:id` | Delete a job listing. | **Recruiter** or **Admin** (JWT) | (No Body) |

---

### 3. 📝 Application Management (`/applications`)

| Method | Endpoint | Description | Role Required | Demo Body (JSON) |
| :--- | :--- | :--- | :--- | :--- |
| **`POST`** | `/applications/apply/:jobId` | User submits an application for a job. | **Applicant** (JWT) | `{"coverLetter": "Highly interested...", "cvUrl": "http://cloudinary.link/cv.pdf"}` |
| **`GET`** | `/applications/me` | Applicant views their own applications. | **Applicant** (JWT) | (No Body) |
| **`GET`** | `/applications/job/:jobId` | Recruiter views all applicants for a job. | **Recruiter** (JWT) | (No Body) |
| **`PATCH`**| `/applications/:id` | Recruiter updates an application's status. | **Recruiter** (JWT) | `{"status": "Interview Scheduled"}` |

---

### 4. ☁️ File Uploads (`/upload`)

| Method | Endpoint | Description | Content Type | Required Field |
| :--- | :--- | :--- | :--- | :--- |
| **`POST`** | `/upload/photo` | Upload a photo file (e.g., profile picture). | `multipart/form-data` | `file` |
| **`POST`** | `/upload/cv` | Upload a CV/document file. | `multipart/form-data` | `file` |
| **Note:** The `PATCH /users/photo` and `PATCH /users/cv` endpoints are designed to update the user's profile with a URL *after* the file has been successfully uploaded using the `/upload` endpoints.

