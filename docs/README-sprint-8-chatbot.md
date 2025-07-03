# Moodio Pro 🧠✨

Moodio Pro is a platform designed for therapists to manage patients, clinical sessions, and their own professional profile with clarity, security, and a clean interface. Built using React, Node.js, Express, and MySQL.

---

## 🚀 What's New in `mejoras-v2` Branch

### 🖥️ UI & Design
- Modern, clean, and fully responsive design.
- Professional look across all pages.
- Patient photo now appears as a thumbnail next to their name.
- Optimized for both large and small screens.
- Clearly separated action buttons (professional layout).
- "Moodio Pro" logo redirects correctly depending on login status.

### 🔐 Navigation & Authentication
- Navbar hides "Login" and "Register" when the user is logged in.
- Shows authenticated links: Dashboard, Profile, Patients, etc.
- "Logout" button only visible when session is active.

### 👩‍⚕️ Patient Management
- Enhanced patient detail view with:
  - Responsive profile image.
  - Toggleable editing mode.
  - Cancel button restores previous values.
- Image URL field hidden when not editing.
- Each patient card includes a thumbnail and their full name.
- Modular CSS files for each page.

### 📝 Clinical Sessions
- Each session displayed in a separate, styled block with:
  - Full date and time display.
  - “Read more” button for long notes.
  - Secure edit mode.
  - Confirm before deleting.
- Improved session creation form with professional textarea.

### 🧑‍⚕️ Therapist Dashboard
- Profile card with avatar, email, specialty, and bio.
- List of patients with thumbnails and direct view buttons.
- New button to add a patient directly from the dashboard.

### 📁 Structure & Environment
- Separate `.env.development` and `.env.production` files.
- Seamless switching between local and production environments.
- Protected backend using custom JWT middleware.
- Organized folder structure: `pages`, `components`, `styles`, `services`.

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router, CSS Modules, Vite
- **Backend:** Node.js, Express
- **Database:** MySQL + Sequelize ORM
- **Authentication:** JWT + Custom Middleware
- **Current Deploy:** Railway (backend & DB), Vercel (frontend)

---

## 📦 Getting Started Locally

```bash
git clone https://github.com/matiascaparotta/Moodio-Pro.git
cd Moodio-Pro
git checkout mejoras-v2

# Frontend
cd client
npm install
npm run dev

# Backend (in a new terminal)
cd ../server
npm install
npm run dev
```

---

## 💡 Future Improvements (Ideas)

- Calendar view of sessions.
- PDF export of session history.
- Notifications and reminders.
- User roles (therapist, patient).
- Dashboard with statistics and analytics.

---

## ✨ Author

Developed with passion by **Matías Caparotta**.  
[GitHub](https://github.com/matiascaparotta) | [LinkedIn](https://www.linkedin.com/in/matiascaparotta)