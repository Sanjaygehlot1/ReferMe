# 📘 ReferMe – Referral & Credit System

## 🚀 Project Overview
**ReferMe** is a full-stack referral and credit system that allows users to sign up, share referral links, and earn credits when their referred friends make their first purchase.  
Built to demonstrate clean architecture, scalable backend logic, and modern, minimal UI design.

### 🧠 Tech Stack
- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS + Framer Motion  
- **Backend:** Node.js + Express.js + MongoDB (Mongoose)  
- **State Management:** Context API (AuthProvider)  
- **Authentication:** JWT (Access + Refresh Tokens via Cookies)  
- **API Client:** Axios  



## ⚙️ Setup Instructions

### 🧭 1. Clone the repository
```bash
git clone https://github.com/<your-username>/FileSure.git
cd FileSure
```


🛠️ 2. Install dependencies
Server
cd server
npm install

Client
```bash
cd ../client
npm install
```

3. Setup Environment Variables
🖥️ Server (server/.env)
```
PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/FileSure
ACCESSTOKEN_SECRET=yourAccessSecretKey
REFRESHTOKEN_SECRET=yourRefreshSecretKey
ACCESSTOKEN_EXPIRY=15m
REFRESHTOKEN_EXPIRY=7d
CORS_ORIGIN=http://localhost:3000
```

💻 Client (client/.env)
```
NEXT_PUBLIC_API_BASE=http://localhost:8000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the app locally

Start backend:

```bash
cd server
npm run dev
```


Start frontend:

```bash
cd ../client
npm run dev
```

Then open:
http://localhost:3000
