# 🌐 Patient Management Frontend (Angular)

## 📌 Overview

This is the frontend application developed using **Angular**, which interacts with the [Patient Management Backend API]. It provides a clean and user-friendly interface for managing patients, doctors, appointments, and procedures.

## 🚀 Technologies Used

- Angular 17+
- TypeScript
- RxJS
- Angular Router
- Angular Forms
- Bootstrap
- Angular Material
- HTTP Client Module for REST API communication

## 🔐 Authentication

- JWT-based authentication
- Login and secure token storage in `localStorage`
- Role-based navigation and access control

## 💡 Key Features

- **User Login** and secure session management
- **Dashboard** for doctors and patients to manage appointments
- **CRUD operations** for:
  - Patients
  - Doctors
  - Appointments
  - Medical Procedures
- **Search & filter** functionality for appointments (by name, CNP, phoneNr)
- Association of **procedures to doctors**
- Loading indicators and user feedback messages
- Modular architecture using Angular best practices(I try :) )

## 🔄 API Integration

- Fully integrated with the backend REST API
- Uses HTTP Interceptors to automatically attach the JWT token to every request
- Handles API errors and redirects unauthorized users to the login page

🎯 This frontend is optimized for medical professionals and admins to easily manage medical operations in clinics or private practices.
