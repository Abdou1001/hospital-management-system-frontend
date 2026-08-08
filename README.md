# 🏥 Hospital Management System - Frontend

A modern and responsive frontend application for a Hospital Management System.

The application provides an administrative dashboard for managing hospital information, departments, doctors, doctor schedules, appointments, advertisements, users, and account settings.

The frontend is built with modern React technologies and communicates with a RESTful backend API.

---

# 🚀 Features

- 🔐 Authentication & Authorization
- 👤 User Authentication
- 🛡️ Role-Based Access Control
- 📊 Admin Dashboard
- 📈 Dashboard Statistics
- 📅 Appointments Management
- 👨‍⚕️ Doctors Management
- 🏥 Departments Management
- 🏢 Hospital Information Management
- 📢 Advertisements Management
- 🕒 Doctor Schedule Management
- 👥 Users Management
- 🔎 Searching
- 🎯 Filtering
- 📄 Pagination
- ↕️ Sorting
- 📝 Form Validation
- 📱 Responsive Design
- 🌐 Arabic RTL Interface
- ⚙️ Account Settings
- 📞 Change Phone Number with OTP Verification
- 🔑 Change Password
- 👤 Update Personal Information
- ⚡ Server State Management with React Query
- 🧠 Client State Management with Zustand
- 🐳 Docker Support

---

# 🖥️ Dashboard

The admin dashboard provides an overview of the hospital system.

Dashboard statistics include:

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

The dashboard also includes appointment statistics charts with year-based filtering.

---

# 📅 Appointments Management

The appointment management section allows administrators and authorized users to:

- View appointments
- Search appointments
- Filter appointments
- Filter by status
- Filter by doctor
- Filter by patient gender
- Filter by appointment date
- Filter by date range
- Filter by day of week
- Sort appointments
- View appointment details
- Update appointment status
- Cancel appointments
- View payment receipts

Supported appointment statuses include:

- Pending
- Approved
- Rejected
- Cancelled

---

# 👨‍⚕️ Doctors Management

The doctors section provides complete management of doctors.

Features include:

- View doctors
- Add doctors
- Update doctors
- Delete doctors
- Search doctors
- Filter doctors
- Filter by gender
- Filter by experience
- Filter by consultation fee
- Assign doctors to departments
- Manage doctor schedules
- View doctor information

---

# 🏥 Departments Management

Administrators can manage hospital departments.

Features include:

- View departments
- Add departments
- Update departments
- Delete departments
- Search departments
- Upload department images
- View department information
- Manage doctors associated with departments

---

# 🕒 Doctor Schedules

The application provides a dedicated interface for managing doctor working schedules.

Features include:

- Add doctor schedules
- Update schedules
- Delete schedules
- Assign working days
- Configure working hours
- Manage morning and evening shifts
- View doctor availability

---

# 🏢 Hospital Management

Administrators can manage hospital information including:

- Hospital name
- Hospital location
- Phone number
- Hospital image

The interface supports updating hospital information and uploading images.

---

# 📢 Advertisements Management

The advertisement management section allows administrators to:

- View advertisements
- Add advertisements
- Update advertisements
- Delete advertisements
- Upload advertisement images
- Manage advertisement information

---

# 👥 Users Management

The users management section allows administrators to manage system users.

Features include:

- View users
- Search users
- Filter users
- Filter by role
- Filter by gender
- Filter by account status
- Update user information
- Change user role
- Activate/deactivate users

Supported roles include:

- Admin
- Receptionist
- User

---

# ⚙️ Account Settings

Users can manage their own account information from the settings page.

Available features:

### 👤 Personal Information

Users can update:

- Full name
- Email
- Date of birth
- Gender

### 📞 Change Phone Number

The phone number is used as the primary login identifier.

Changing the phone number requires:

1. Entering the new phone number
2. Sending an OTP
3. Verifying the OTP
4. Updating the phone number
5. Logging in again with the new number

### 🔑 Change Password

Users can change their password by providing:

- Current password
- New password
- Password confirmation

After successfully changing the password, the current session is terminated and the user is redirected to the login page.

---

# 🔐 Authentication

Authentication is handled through the backend API.

The frontend uses:

- JWT Authentication
- HTTP Cookies
- Protected Routes
- Role-Based Access Control

Authentication state is managed using Zustand.

The application also uses an API endpoint to retrieve the currently authenticated user.

---

# 🧠 State Management

The project uses **Zustand** for client-side authentication state.

Example structure:

```text
store/
└── auth.store.ts