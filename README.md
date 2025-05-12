# Mini CRM Platform

A lightweight, modular Customer Relationship Management (CRM) system built using modern web technologies like Next.js, Tailwind CSS, and TypeScript. Designed to help businesses manage customer data and marketing campaigns with ease.

---

## 🧑‍💻 Local Setup Instructions

### Prerequisites

- **Node.js** v18+
- **pnpm** package manager  
  Install with:  
  ```bash
  npm install -g pnpm


## Steps to Run Locally
git clone https://github.com/Piyushdhiman17/mini-crm-platform.git
cd mini-crm-platform
pnpm install
pnpm dev

## Architecture Overview Diagram
Frontend (Next.js with App Router)
│
├── app/                → Pages & routing
├── components/         → Reusable UI (Shadcn, Lucide)
├── hooks/              → Custom React hooks
├── lib/                → Helpers & utilities
└── styles/             → Global & Tailwind styling

API Routes (Next.js)
├── Route Handlers      → User auth, campaign logic

Authentication
└── NextAuth.js         → Session & JWT management

## Tech Stack & Tools
Category	Tool / Tech
Frontend	Next.js, TypeScript
Styling	Tailwind CSS
UI Components	Shadcn/ui, Lucide
Auth	NextAuth.js
Package Manager	pnpm
Icons	Lucide-react
AI Tools	Currently not integrated – can integrate OpenAI APIs for smart customer segmentation or chat features.

## 📌 Known Limitations & Assumptions
🔒 No backend database – current version assumes in-memory or static data; integration with PostgreSQL, MongoDB, or Firebase needed for persistence.

💬 Messaging system is UI-only; sending functionality is mocked.

🧪 No test coverage yet; unit and integration tests are to be added.

🌐 No deployment is currently set; instructions can be added for Vercel or Netlify.

📄 License
This project is licensed under the MIT License.





## ✅ To add this:
1. Create or open your `README.md`
2. Paste the above content
3. Save & commit:
```bash
git add README.md
git commit -m "Add detailed README with architecture and setup"
git push origin main
