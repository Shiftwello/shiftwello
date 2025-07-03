
# 🚀 Sprint 8 - Internal AI Chatbot for Shiftwello

This sprint implements an **internal AI-based chatbot**, fully integrated into Shiftwello, designed to assist both **hotel staff and managers**, improving access to operational information, internal policies, and reinforcing team wellbeing.

✅ This radically differentiates Shiftwello from traditional shift management systems, positioning it as **a true people operations platform powered by AI**.

---

## 🎯 Main functionalities
- ✅ **Dynamic FAQs**: the bot answers questions about overtime, vacations, internal policies, etc.
- ✅ **Shift queries**: staff can ask, “What shift do I have tomorrow?”
- ✅ **Alerts & recognitions**: congratulates on days without absences, badges, or suggests rest if it detects potential burnout.
- ✅ **Manager assistant**: e.g., “How was the team’s mood this week?”
- ✅ **Central manual & links**: bot provides quick access to PDFs or internal hotel documents.

---

## ⚙️ Technical stack & architecture
### Backend
- **Node.js + Express**
- New route: `POST /api/chatbot`
- Access control via JWT
- Microservice handling AI prompts (GPT-3.5-turbo or local open source model).

### Frontend
- **React (PWA)**
- `ChatbotWidget.jsx` floating component, visible across the dashboard.
- Global context to maintain conversation state.

### Security
- JWT authentication to protect every request.
- Logs of interactions (`chatbot_logs`) for full auditability.

---

## 💡 Example prompt for the AI microservice
```
You are the internal assistant of Shiftwello, a software for managing hotel staff.
Only respond to questions about shifts, wellbeing, hotel policies, or reports.

If the question is unrelated, reply:
"I'm sorry, I can only help with internal hotel topics."

Examples:
Q: What shift do I have tomorrow?
A: Tomorrow you work from 2:00 PM to 10:00 PM at the Front Desk.

Q: What should I do if I’m running late?
A: Immediately notify your direct supervisor or the Duty Manager.

Q: How is the overall team mood?
A: This week, 78% of staff submitted positive check-ins 🙂
```

---

## 📈 Direct benefits
| Benefit                               | Impact                             |
|---------------------------------------|------------------------------------|
| Reduces repetitive questions to supervisors | Saves hours of operational time per month. |
| Improves staff engagement             | More daily use of Shiftwello.      |
| Justifies premium pricing             | Clearly differentiates from basic apps.|

---

## 📊 Chatbot flow diagram (Mermaid)
```mermaid
graph TD
    A[User (staff or manager)] -->|asks question| B[ChatbotWidget (React)]
    B -->|POST /api/chatbot| C[Backend API (Express)]
    C -->|validates JWT & role| D[AIService (GPT/microservice)]
    D -->|optional| E[DB (MySQL)]
    D -->|generates response| C
    C -->|sends JSON response| B
    B -->|renders in UI| A
```

---

## 🚀 Business objectives
- Position Shiftwello as the most advanced hotel people operations suite in the market, leveraging AI.
- Directly save supervisor and manager time.
- Improve staff satisfaction, reducing turnover and indirect costs.

---

## 📝 Next steps
- [ ] Implement `POST /api/chatbot` endpoint in Express.
- [ ] Connect AI microservice with hotel-specific prompt.
- [ ] Create `ChatbotWidget.jsx` in the frontend.
- [ ] Audit logs in `chatbot_logs` table.
- [ ] Functional & UI tests.

---

✅ **Shiftwello** evolves into a fully integrated hotel platform that:
- Automates shifts,
- Predicts burnout,
- Incentivizes with badges,
- And now **supports the team with a 24/7 virtual assistant**.
