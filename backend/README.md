
# 🚀 Shiftwello

### Smart workforce wellbeing & scheduling for hotels

Shiftwello is an innovative platform designed to help hotels automate their staff scheduling, improve team wellbeing, reduce burnout and optimize operational efficiency.

---

## ⚙️ Tech Stack

- **Backend:** Node.js + Express
- **Database:** MySQL (mysql2)
- **Authentication:** JWT + bcrypt
- **Environment:** dotenv for secure config

---

## 🚀 Getting started

```bash
git clone https://github.com/tuusuario/shiftwello.git
cd shiftwello/backend
npm install
cp .env.example .env
```

Then edit your `.env` with your local DB credentials.

Finally run the dev server:

```bash
npm run dev
```

Server will start on:

```
http://localhost:5001
```

---

## 🔐 Authentication

- JWT based auth with secure bcrypt password hashing.
- Role-based access control (Manager, Supervisor, Employee).

---

## 🗓 Roadmap & Sprints

| Sprint | Features |
|--------|----------|
| ✅ Sprint 1 | Core backend, JWT auth, employees model, protected routes |
| 🔜 Sprint 2 | React frontend (PWA), login/signup UI |
| 🔜 Sprint 3 | Scheduling module: CRUD + weekly calendar |
| 🔜 Sprint 4 | Wellbeing daily check-ins, attendance leaderboard |
| 🔜 Sprint 5 | Automatic smart scheduling (rule-based) |
| 🔜 Sprint 6 | Predictive AI burnout risk & suggestions |

---

## 🌍 Deployment roadmap

| Stage           | Environment |
|-----------------|-------------|
| Internal dev    | Localhost + Figma |
| Pilot phase     | Railway + PlanetScale |
| Public demo     | Vercel + custom domain |
| Production      | Secure GDPR hosting |

---

## 📝 License

MIT © 2025 - Matías Caparotta
