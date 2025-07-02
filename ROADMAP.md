# 🛣️ Shiftwello Roadmap

A clear step-by-step plan to turn Shiftwello into a production-ready, AI-powered scheduling & wellbeing platform for hotel teams.

---

## 🎯 Project goals

✅ Save hours of manual scheduling work for managers.  
✅ Detect burnout & absenteeism risks **before** they become costly.  
✅ Reduce turnover by fostering a healthier, more motivating workplace.  
✅ Ensure labor law compliance (hours, breaks, fair rotations).  
✅ Provide clear ROI dashboards for hotel management.

---

## 🚀 Sprints & milestones

### ✅ Sprint 1: Core architecture & database
- Set up Node.js + Express + MySQL with dotenv.
- Design relational schema: employees, roles, shifts, check-ins, incentives, logs.
- Implement JWT auth with bcrypt.
- Role-based access control (manager / supervisor / employee).

### ✅ Sprint 2: Frontend foundation
- Initialize React app (PWA ready).
- Set up protected routes for managers & staff.
- Build login + signup pages.
- Connect to backend API for authentication.

### ✅ Sprint 3: Manual scheduling module
- CRUD: managers can create, edit, delete shifts.
- Employees view their upcoming shifts.
- Weekly calendar view for managers.

### ✅ Sprint 4: Wellbeing daily check-ins & basic incentives
- Staff can submit 🙂😐😞 check-ins daily.
- Manager dashboard with overall team mood.
- Simple leaderboard of attendance & engagement.

### ✅ Sprint 5: Automatic smart scheduling (rule-based)
- Generate fair schedules automatically based on:
  - max hours per week
  - preferred / unavailable days
  - rest periods
- Highlight overtime or law compliance issues.

### ✅ Sprint 6: Predictive module (basic AI)
- Simple machine learning model (Python microservice) to predict:
  - absenteeism risk
  - burnout trends
- Recommendations in manager dashboard.

### ✅ Sprint 7: Incentives, reports & export
- Gamified badges for staff milestones.
- Monthly exportable PDF report for HR / compliance.
- Display estimated ROI (hours saved, turnover reduced).

---

## 🔥 Future AI & Predictive Features

- NLP sentiment analysis on employee comments.
- Advanced anomaly detection in working patterns.
- Prescriptive dashboard suggestions (e.g. "consider rotating Carlos to avoid burnout").
- Integration with PMS / payroll for smarter forecasts.

---

## 📝 Deployment roadmap

| Stage              | Environment             |
|--------------------|-------------------------|
| Internal dev       | Localhost + Figma       |
| Pilot phase        | Railway / PlanetScale DB |
| Public demo        | Vercel / Netlify + custom domain |
| Production         | Secure hosting + GDPR checks |

---

✅ This roadmap will be updated continuously.  
Next: move on to Sprint 1 and complete database schema + backend auth.

---