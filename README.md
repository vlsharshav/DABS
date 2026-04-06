# DABS
This project is solely based on appointment booking system for patients and doctors


Got it — I’ll rewrite everything cleanly for your **exact stack** and format it as a **GLOBAL README (production-level)** that your whole team can follow.

---

# 🏥 Hospital Management System (Global README)

---

## 🧠 Core Idea

A full-stack Hospital Management System where:

* Patients can search doctors and book appointments.
* Doctors manage schedules and patient records.
* Admin oversees the system.
* Firebase handles authentication.
* Spring Boot handles business logic securely.

---

## 🧩 Tech Stack

### Frontend

* React.js (with normal CSS)
* fetch api (API calls)
* React Router

### Backend

* Spring Boot (Java)
* Spring Security (for Firebase token validation)
* REST APIs

### Database

* MySQL (via Spring Data JPA / Hibernate)

### Authentication

* Firebase Authentication (Email/Password + Google)

### Hosting

* Frontend → Vercel / Netlify
* Backend → Render / Railway / AWS
* Database → MySQL (AWS RDS / PlanetScale / local)

---

## 🔐 Authentication Flow

1. User logs in via Firebase (frontend)
2. Firebase returns **ID Token**
3. Token is sent in headers:

   ```
   Authorization: Bearer <firebase_token>
   ```
4. Spring Boot verifies token using Firebase Admin SDK
5. Backend extracts user details (UID, email)

---

## 🧑‍⚕️ User Roles

* **PATIENT**
* **DOCTOR**
* **ADMIN**

👉 Stored in database (NOT Firebase)

---

## 🧩 Features

### 1. Patient

* Search doctors
* Book appointments
* View history
* Upload medical records

### 2. Doctor

* Set availability
* Manage appointments
* Add prescriptions

### 3. Admin

* Manage users
* Monitor system

---

## ⚙️ Backend APIs

### Auth (handled via Firebase middleware)

* No login endpoint required

---

### Doctor APIs

```
POST   /api/doctors
GET    /api/doctors
GET    /api/doctors/{id}
PUT    /api/doctors/{id}
DELETE /api/doctors/{id}
```

---

### Appointment APIs

```
POST   /api/appointments
GET    /api/appointments
GET    /api/appointments/{id}
PUT    /api/appointments/{id}
DELETE /api/appointments/{id}
```

---

### Medical Records APIs

```
POST   /api/records
GET    /api/records/{patientId}
```

---

### User APIs

```
GET /api/users/me
```

---

## 💾 Database Schema (MySQL + JPA)

---

### 🧑 User Table

```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    firebase_uid VARCHAR(128) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,

    role ENUM('PATIENT', 'DOCTOR', 'ADMIN') NOT NULL,
    gender ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,

    phone VARCHAR(15),
    profile_pic TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 🧑‍⚕️ Doctor Table

```sql
CREATE TABLE doctors (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    user_id BIGINT NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    experience INT,
    hospital_name VARCHAR(150),
    consultation_fee DECIMAL(10,2),

    rating DOUBLE DEFAULT 0,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

### 📅 Availability Table (IMPORTANT DESIGN)

```sql
CREATE TABLE availability (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    doctor_id BIGINT NOT NULL,
    day_of_week ENUM('MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY'),

    start_time TIME,
    end_time TIME,

    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);
```

---

### 📅 Appointment Table

```sql
CREATE TABLE appointments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    patient_id BIGINT NOT NULL,
    doctor_id BIGINT NOT NULL,

    appointment_date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,

    status ENUM('PENDING','CONFIRMED','CANCELLED','COMPLETED') DEFAULT 'PENDING',

    reason TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (patient_id) REFERENCES users(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);
```

---

### 📄 Medical Records Table

```sql
CREATE TABLE medical_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    patient_id BIGINT NOT NULL,
    doctor_id BIGINT NOT NULL,

    diagnosis TEXT,
    prescription_url TEXT,
    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (patient_id) REFERENCES users(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);
```

---

## 🧠 Backend Architecture (Spring Boot)

```
com.hms
│
├── controller
├── service
├── repository
├── model (Entity classes)
├── dto
├── config
├── security (Firebase filter)
└── exception
```

---

## 🔐 Firebase Integration (Spring Boot)

### Dependency

```xml
<dependency>
  <groupId>com.google.firebase</groupId>
  <artifactId>firebase-admin</artifactId>
</dependency>
```

---

### Token Filter Flow

* Extract token from header
* Verify using Firebase Admin SDK
* Set authentication in Spring Security context

---

## 🛡️ Constraints (CRITICAL)

* ❌ No overlapping appointments
* ✅ Validate availability before booking
* ✅ Only authenticated users allowed
* ✅ Role-based access
* ✅ Prevent double booking

---

## 🎨 Frontend Pages (React)

* Landing Page
* Login / Signup
* Home (Doctor Search)
* Doctor Details
* Book Appointment
* Dashboard (Patient / Doctor / Admin)
* Medical Records

---

## 📂 Folder Structure

```
project-root/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/ (API calls)
│   │   ├── context/ (auth context)
│
├── backend/
│   ├── src/main/java/com/hms/
│   ├── resources/
│
└── README.md
```

---

## ⚙️ Setup Instructions

---

### Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

---

### application.properties

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hms
spring.datasource.username=root
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

### Frontend (React)

```bash
cd frontend
npm install
npm start
```

---

### Firebase Setup

* Enable:

  * Email/Password
  * Google Login
* Download service account key → backend

---

## 📡 API Example

### Create Appointment

```
POST /api/appointments

Headers:
Authorization: Bearer <firebase_token>

Body:
{
  "doctorId": 1,
  "appointmentDate": "2026-04-10",
  "timeSlot": "10:00-10:30",
  "reason": "Fever"
}
```

---

## 🚀 Future Enhancements

* Video consultation (WebRTC)
* AI disease prediction (you can plug your glaucoma model 🔥)
* Payments (Razorpay)
* Doctor ratings
* Notifications (Firebase Cloud Messaging)

---


Perfect — this is exactly how real teams work 👍
I’ll give you **clean, production-ready DTOs for every API**, so your frontend team can **start immediately without backend dependency**.

I’ll structure it like this:

* 📦 Package structure
* 📥 Request DTOs
* 📤 Response DTOs
* 🔄 Common DTOs
* ⚠️ Notes for frontend devs

---

# 📦 Package Structure

```
com.hms.dto
│
├── request
├── response
├── common
```

---

# 🔄 Common DTOs (Reusable)

---

## 🧑 UserDTO

```java
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Long id;
    private String name;
    private String email;
    private String role;      // PATIENT / DOCTOR / ADMIN
    private String gender;    // MALE / FEMALE / OTHER
    private String phone;
    private String profilePic;
}
```

---

## 🧑‍⚕️ DoctorDTO

```java
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDTO {

    private Long id;
    private UserDTO user;

    private String specialization;
    private Integer experience;
    private String hospitalName;
    private Double consultationFee;

    private Double rating;
}
```

---

## 📅 AvailabilityDTO

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AvailabilityDTO {

    private String dayOfWeek;   // MONDAY, TUESDAY...
    private String startTime;   // "09:00"
    private String endTime;     // "17:00"
}
```

---

## 📅 AppointmentDTO

```java
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDTO {

    private Long id;

    private UserDTO patient;
    private DoctorDTO doctor;

    private String appointmentDate; // "2026-04-10"
    private String timeSlot;        // "10:00-10:30"

    private String status;          // PENDING / CONFIRMED / CANCELLED / COMPLETED
    private String reason;
}
```

---

## 📄 MedicalRecordDTO

```java
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MedicalRecordDTO {

    private Long id;

    private UserDTO patient;
    private DoctorDTO doctor;

    private String diagnosis;
    private String prescriptionUrl;
    private String notes;

    private String createdAt;
}
```

---

# 📥 REQUEST DTOs

---

## 🔐 Create / Update User (after Firebase login)

```java
@Data
public class CreateUserRequest {

    private String name;
    private String email;
    private String role;     // PATIENT / DOCTOR / ADMIN
    private String gender;
    private String phone;
    private String profilePic;
}
```

---

## 🧑‍⚕️ Create Doctor Profile

```java
@Data
public class CreateDoctorRequest {

    private String specialization;
    private Integer experience;
    private String hospitalName;
    private Double consultationFee;

    private List<AvailabilityDTO> availability;
}
```

---

## 🧑‍⚕️ Update Doctor

```java
@Data
public class UpdateDoctorRequest {

    private String specialization;
    private Integer experience;
    private String hospitalName;
    private Double consultationFee;
}
```

---

## 📅 Create Appointment

```java
@Data
public class CreateAppointmentRequest {

    private Long doctorId;

    private String appointmentDate;  // "YYYY-MM-DD"
    private String timeSlot;         // "HH:mm-HH:mm"

    private String reason;
}
```

---

## 📅 Update Appointment Status

```java
@Data
public class UpdateAppointmentStatusRequest {

    private String status;   // CONFIRMED / CANCELLED / COMPLETED
}
```

---

## 📄 Create Medical Record

```java
@Data
public class CreateMedicalRecordRequest {

    private Long patientId;
    private Long doctorId;

    private String diagnosis;
    private String prescriptionUrl;
    private String notes;
}
```

---

# 📤 RESPONSE DTOs

---

## ✅ Generic API Response

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApiResponse<T> {

    private boolean success;
    private String message;
    private T data;
}
```

---

## 🧑 User Response

```java
@Data
public class UserResponse {
    private UserDTO user;
}
```

---

## 🧑‍⚕️ Doctor Response

```java
@Data
public class DoctorResponse {
    private DoctorDTO doctor;
}
```

---

## 🧑‍⚕️ Doctor List Response

```java
@Data
public class DoctorListResponse {

    private List<DoctorDTO> doctors;
}
```

---

## 📅 Appointment Response

```java
@Data
public class AppointmentResponse {

    private AppointmentDTO appointment;
}
```

---

## 📅 Appointment List Response

```java
@Data
public class AppointmentListResponse {

    private List<AppointmentDTO> appointments;
}
```

---

## 📄 Medical Record Response

```java
@Data
public class MedicalRecordResponse {

    private MedicalRecordDTO record;
}
```

---

## 📄 Medical Record List Response

```java
@Data
public class MedicalRecordListResponse {

    private List<MedicalRecordDTO> records;
}
```

---

# 📡 API → DTO Mapping (VERY IMPORTANT FOR TEAM)

---

## 🧑 User

| API               | Request           | Response             |
| ----------------- | ----------------- | -------------------- |
| POST /api/users   | CreateUserRequest | ApiResponse<UserDTO> |
| GET /api/users/me | —                 | ApiResponse<UserDTO> |

---

## 🧑‍⚕️ Doctor

| API                   | Request             | Response           |
| --------------------- | ------------------- | ------------------ |
| POST /api/doctors     | CreateDoctorRequest | DoctorResponse     |
| GET /api/doctors      | —                   | DoctorListResponse |
| GET /api/doctors/{id} | —                   | DoctorResponse     |
| PUT /api/doctors/{id} | UpdateDoctorRequest | DoctorResponse     |

---

## 📅 Appointment

| API                        | Request                        | Response                |
| -------------------------- | ------------------------------ | ----------------------- |
| POST /api/appointments     | CreateAppointmentRequest       | AppointmentResponse     |
| GET /api/appointments      | —                              | AppointmentListResponse |
| PUT /api/appointments/{id} | UpdateAppointmentStatusRequest | AppointmentResponse     |

---

## 📄 Medical Records

| API                          | Request                    | Response                  |
| ---------------------------- | -------------------------- | ------------------------- |
| POST /api/records            | CreateMedicalRecordRequest | MedicalRecordResponse     |
| GET /api/records/{patientId} | —                          | MedicalRecordListResponse |

---

# ⚠️ FRONTEND CONTRACT (VERY IMPORTANT)

Tell your frontend team:

### 1. Dates Format

```
YYYY-MM-DD
```

### 2. Time Slot Format

```
HH:mm-HH:mm
Example: "10:00-10:30"
```

### 3. Enums (STRICT)

```js
role = ["PATIENT", "DOCTOR", "ADMIN"]
gender = ["MALE", "FEMALE", "OTHER"]
status = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]
dayOfWeek = ["MONDAY", ...]
```

---

# 🚀 Bonus (Highly Useful for You)

Since you're strong in backend + architecture:

👉 Next best steps:

* Add **DTO → Entity mapping using MapStruct**
* Add **Global Exception Handler**
* Add **Pagination DTO (PageResponse)**

---

If you want next:

✅ I can generate:

* Full Controller + Service layer
* Firebase Security Filter
* Postman collection
* OR complete working backend starter

Just tell 👍



