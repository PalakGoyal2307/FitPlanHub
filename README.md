# 🏋️‍♂️ FitPlanHub

FitPlanHub is a **full-stack fitness platform** connecting **trainers and users**.  
Users can view, follow, and subscribe to trainers’ fitness plans, while trainers can create and manage their own plans.

---

## 🚀 Installation & Setup

1️⃣ Clone the Repository
```
git clone <your-github-repo-url>

cd fitplanhub
```
2️⃣ Backend Setup
```
cd backend

npm install
```

#### Create a .env file inside the backend folder:

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

#### Run the backend server:
```
npm run dev
```
Backend will run on:
```
👉 http://localhost:5000
```

3️⃣ Frontend Setup
```
cd frontend

npm install

npm run dev
```

Frontend will run on:
```
👉 http://localhost:5173
```
---

## 🔄 API Overview

1️⃣ Authentication

--> POST /api/auth/register – User/Trainer registration

--> POST /api/auth/login – Login and JWT token generation

2️⃣ Plans

--> GET /api/plans – View all plans (preview mode)

--> POST /api/plans – Create a plan (Trainer only)

3️⃣ Subscriptions

--> POST /api/subscribe/:planId – Subscribe to a fitness plan

4️⃣ Follow Trainers

--> POST /api/follow/:trainerId – Follow a trainer

--> DELETE /api/unfollow/:trainerId – Unfollow a trainer

---

## 🧪 API Testing

--> APIs can be tested using Postman

--> Authorization token must be sent in headers:

--> Authorization: Bearer <JWT_TOKEN>

---

## 🛠️ Tech Stack

### Frontend

--> React.js (Vite)

--> Axios

--> React Router DOM

--> Tailwind CSS

### Backend

--> Node.js

--> Express.js

--> MongoDB (Mongoose)

--> JWT Authentication

--> bcrypt.js

### Tools

--> Git & GitHub

--> Postman (API testing)

---

## 📁 Project Structure

```bash
fitplanhub/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── planController.js
│   │   ├── subscriptionController.js
│   │   └── followController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Plan.js
│   │   ├── Subscription.js
│   │   └── Follow.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── planRoutes.js
│   │   ├── subscriptionRoutes.js
│   │   └── followRoutes.js
│   │
│   ├── .env
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   │
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── PlanCard.jsx
    │   │
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Landing.jsx
    │   │   ├── TrainerDashboard.jsx
    │   │   ├── CreatePlan.jsx
    │   │   └── UserFeed.jsx
    │   │
    │   ├── App.jsx
    │   └── main.jsx
    │
    └── package.json
```
---

### Features

#### 🔐 Authentication

--> Signup & login for users and trainers

--> Password hashing using bcrypt

--> JWT-based authentication

--> Role-based access control

#### 👤 Users

--> View all available fitness plans

--> Follow / unfollow trainers

--> Subscribe to plans (simulated payment)

--> Personalized feed (plans from followed trainers only)

--> Full plan access after subscription

#### 🧑‍🏫 Trainers

--> Create, edit, and delete fitness plans

--> View their own plans

--> Trainer profile with plan list

--> Dashboard-ready structure for future analytics

#### 🔁 Shared Features

--> View trainer profiles

--> Follow / unfollow trainers

--> Subscription-based access control

--> Role-based routing

---

## 💾 Database Design

Models / Collections
### User
```
{
  "name": "String",
  "email": "String (unique)",
  "password": "String",
  "role": "user | trainer"
}
```

### Plan
```
{
  "title": "String",
  "description": "String",
  "price": "Number",
  "duration": "String",
  "trainer": "ObjectId -> User"
}
```
### Subscription
```
{
  "user": "ObjectId -> User",
  "plan": "ObjectId -> Plan"
}
```
### Follow
```
{
  "user": "ObjectId -> User",
  "trainer": "ObjectId -> User"
}
```

### 🔗 Relationships

--> User (1) → (M) Subscriptions → Plans

--> User (M) → (M) Follows → Trainers

--> Trainer (1) → (M) Plans

---

## Screenshots

### LANDING PAGE

Show all plans with previews

<img width="1888" height="906" alt="image" src="https://github.com/user-attachments/assets/f2c93037-d949-4bfc-b378-582aa8e27aea" />


### LOGIN/SIGNUP

Store token and redirect

<img width="1885" height="902" alt="image" src="https://github.com/user-attachments/assets/aea5f441-d77f-4bd0-85d2-0d52e62687d6" />

<img width="1881" height="918" alt="image" src="https://github.com/user-attachments/assets/87bb2cad-35c7-491a-8770-df54106dff68" />


### TRAINER PROFILE

Follow/unfollow + list of plans

<img width="1883" height="908" alt="image" src="https://github.com/user-attachments/assets/3d619f3b-45a1-4732-89ef-588178b70eb6" />


### TRAINER DASHBOARD

CRUD operations on plans

<img width="1893" height="917" alt="image" src="https://github.com/user-attachments/assets/c587c77e-bc98-4e53-bd55-f104b2f03f30" />


#### CREATE PLAN

<img width="1882" height="912" alt="image" src="https://github.com/user-attachments/assets/026f5e52-19c5-48b8-9a65-c885b2479316" />


#### TRAINER ANALYTICS

<img width="1881" height="912" alt="image" src="https://github.com/user-attachments/assets/9557b509-1ca9-4ec5-b56b-b8cf33c00e6b" />



### HOME PAGE

<img width="1898" height="908" alt="image" src="https://github.com/user-attachments/assets/9bc26ef5-889b-47ab-aed9-368f5a9a3c38" />


### USER FEED

Personalized list of plans from followed trainers

<img width="1878" height="913" alt="image" src="https://github.com/user-attachments/assets/982320bb-2ac6-4fd7-a325-3093f1f50952" />

---

### DATABASE

#### USERS

<img width="1918" height="1021" alt="image" src="https://github.com/user-attachments/assets/b7fcdac0-98b0-4499-b05d-c82b10f92733" />

#### PLANS

<img width="1917" height="1015" alt="image" src="https://github.com/user-attachments/assets/71e9c579-61b7-4062-a3e1-fc0c36ba55fd" />


---
