<div align="center">

# 🏥 Hospital Management System - Frontend

### Modern Hospital Management Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=reactquery)](https://tanstack.com/query)
[![Zustand](https://img.shields.io/badge/Zustand-State-orange)](https://zustand.docs.pmnd.rs/)
[![Docker](https://img.shields.io/badge/Docker-Supported-2496ED?logo=docker)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>

---

## 🏥 About

A modern and responsive frontend application for managing hospital operations.

The system provides an administrative dashboard for managing doctors, departments, appointments, users, advertisements, hospital information, doctor schedules, and account settings.

The application is built with **Next.js, React, TypeScript, Tailwind CSS, TanStack Query, and Zustand**, and communicates with a RESTful backend API.

---

## 🚀 Features

- 🔐 Authentication & Authorization
- 👥 User Management
- 👨‍⚕️ Doctor Management
- 🏥 Department Management
- 📅 Appointment Management
- 🕒 Doctor Schedule Management
- 📢 Advertisement Management
- 🏢 Hospital Information Management
- 📊 Dashboard Statistics
- 📈 Appointment Analytics
- 💰 Revenue Statistics
- 🔎 Search & Filtering
- 📄 Pagination
- ↕️ Sorting
- ⚙️ Account Settings
- 📞 Phone Number Change with OTP
- 🔑 Password Change
- 📝 Form Validation
- 🌐 Arabic RTL Interface
- 📱 Responsive Design
- ⚡ React Query Caching
- 🐳 Docker Support

---

## 🛠 Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **TanStack React Query**
- **Zustand**
- **React Hook Form**
- **Zod**
- **Axios**
- **Recharts**
- **Lucide React**
- **Sonner**
- **Docker**

---

## 📊 Dashboard

The dashboard provides administrators with an overview of the hospital system.

It displays:

- Total Users
- Total Doctors
- Total Departments
- Total Advertisements
- Total Appointments
- Accepted Appointments
- Pending Appointments
- Rejected Appointments
- Cancelled Appointments
- Total Revenue
- Monthly Revenue

It also provides appointment analytics with year-based filtering.

---

## 📅 Appointment Management

Administrators can:

- View appointments
- Search appointments
- Filter by status
- Filter by doctor
- Filter by patient gender
- Filter by appointment date
- Filter by date range
- Filter by day
- Sort appointments
- View appointment details
- Approve appointments
- Reject appointments
- Cancel appointments
- View payment receipts

---

## 👨‍⚕️ Doctor Management

The doctor management section provides:

- Add doctors
- Edit doctors
- Delete doctors
- Search doctors
- Filter doctors
- Filter by gender
- Filter by experience
- Filter by consultation fee
- Assign doctors to departments
- Manage doctor schedules

---

## 🏥 Department Management

Administrators can:

- Add departments
- Edit departments
- Delete departments
- Search departments
- Upload department images
- View department information
- Manage department doctors

---

## 👥 User Management

The users section provides:

- View users
- Search users
- Filter users
- Change user roles
- Activate/deactivate users
- Edit user information

Supported roles:

- Admin
- Receptionist
- User

---

## ⚙️ Account Settings

Users can manage their personal account information.

### 👤 Personal Information

- Full name
- Email
- Date of birth
- Gender

### 📞 Change Phone Number

The phone number is used as the primary login identifier.

The process uses OTP verification:

```text
Enter New Phone
       ↓
Send OTP
       ↓
Verify OTP
       ↓
Update Phone Number
       ↓
Login Again