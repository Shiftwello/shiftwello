# Shiftwello

![Shiftwello Logo](./frontend/src/assets/images/logoShiftwello.png)

## Description

Shiftwello is a platform designed to simplify hotel workforce management by automating scheduling, improving wellbeing, and ensuring labor law compliance.

Currently, the project is in active development with user authentication, role-based access, and manual scheduling fully implemented.

---

## 🚀 Features Implemented So Far

- **Authentication & Authorization:** JWT-based login/signup with role-based access control.
- **User Management:** Admin and supervisors can create and manage employees.
- **Scheduling Module:** Managers can create, edit, and delete shifts with a calendar view.
- **Roles & Permissions:** Differentiated access for managers, supervisors, and employees.
- **Responsive Interface:** Modern UI designed for desktop and mobile.

---

## 🛠️ Technology Stack

- **Backend:** Node.js, Express, MySQL, Sequelize ORM
- **Frontend:** React, React Router, Tailwind CSS
- **Authentication:** JWT with bcrypt password hashing
- **Tools:** VSCode, Git, Postman

---

## 🗂 Project Structure

- `/backend` - Node.js API and database logic
- `/frontend` - React application with routing and UI components

---

## 📅 Roadmap & Next Steps

- **Sprint 3:** Finalize manual scheduling module and employee shift views.
- **Sprint 4:** Implement daily wellbeing check-ins & basic incentives.
- **Sprint 5:** Add rule-based automatic scheduling features.
- **Sprint 6:** Integrate simple AI predictive models for burnout and absenteeism risk.
- **Sprint 7:** Build reporting and export features.
- **Sprint 8:** Develop an AI chatbot assistant for managers and employees.

---

## 🤖 Upcoming Sprint 8: Chatbot Assistant

The chatbot will provide:

- Quick answers to scheduling questions.
- Help with shift swaps and availability updates.
- Wellbeing tips and notifications.
- Integration with the scheduling backend to offer personalized assistance.

---

## 🚀 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/Shiftwello/shiftwello.git
cd shiftwello

# Backend
cd backend
npm install
npm run dev

# Frontend (in another terminal)
cd ../frontend
npm install
npm start