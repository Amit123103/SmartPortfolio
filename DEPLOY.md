# Deploying to Render

You are deploying a single **Web Service** that runs your Node.js backend. This backend also serves your React frontend.

## 1. Create Web Service
1.  Go to the [Render Dashboard](https://dashboard.render.com).
2.  Click **New +** -> **Web Service**.
3.  Select **"Build and deploy from a Git repository"**.
4.  Connect your GitHub account and select your repo: `SmartPortfolio`.

## 2. Configuration Settings
Fill in the form exactly as follows:

| Field | Value | Reason |
| :--- | :--- | :--- |
| **Name** | `SmartPortfolio` | Can be anything |
| **Region** | `Singapore` | Or closest to you |
| **Branch** | `main` | Source code |
| **Root Directory** | *(Leave Empty)* | We are in the root |
| **Runtime** | `Node` | Backend environment |
| **Build Command** | `npm install; npm run build` | Installs deps & builds Vite app |
| **Start Command** | `npm start` | Starts Node server (which serves frontend) |

## 3. Environment Variables
Click **"Advanced"** or **"Environment Variables"** and add these keys (copy values from your local `.env`):



## 4. Deploy
Click **"Create Web Service"**.

Render will:
1.  Clone your repo.
2.  Run `npm install` (backend & frontend deps).
3.  Run `npm run build` (creates `dist/` folder).
4.  Run `npm start` (starts `server/index.js`).
5.  Your site will be live at `https://smartportfolio-xxxx.onrender.com`.
