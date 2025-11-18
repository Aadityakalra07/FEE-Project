# Voice Controlled To-Do App - Render Deployment Guide

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Deploy on Render

1. **Go to Render Dashboard**: https://dashboard.render.com/
2. **Click "New +"** and select **"Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service**:

#### Build & Deploy Settings:
- **Name**: `voice-todo-app` (or your preferred name)
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: Leave empty
- **Runtime**: `Node`
- **Build Command**: `npm install && cd server && npm install && cd .. && npm run build`
- **Start Command**: `npm start`

#### Environment Variables:
- **NODE_ENV**: `production`
- **PORT**: `10000` (Render will auto-assign)

#### Advanced Settings:
- **Auto-Deploy**: Yes (Enable)
- **Instance Type**: Free (or choose paid plan)

### 3. Click "Create Web Service"

Render will:
- Clone your repository
- Install dependencies
- Build the React app
- Start the Node.js server
- Provide a live URL (e.g., `https://voice-todo-app.onrender.com`)

### 4. Access Your App

Once deployment completes (5-10 minutes):
- Your app will be live at: `https://your-app-name.onrender.com`
- The URL will be shown in the Render dashboard

## Notes

- **Free Tier Limitations**: Free instances spin down after 15 minutes of inactivity and may take 30-60 seconds to wake up
- **Data Persistence**: Files (users.json, tasks.json, sessions.json) are stored locally and will reset when the service restarts. For production, consider using a database like MongoDB or PostgreSQL
- **Custom Domain**: You can add a custom domain in the Render dashboard settings

## Troubleshooting

If deployment fails:
1. Check the build logs in Render dashboard
2. Ensure all dependencies are in package.json
3. Verify the build command runs successfully locally: `npm run build`
4. Check that port is configured correctly (Render sets PORT env variable automatically)

## Local Development

To run locally:
```bash
npm run dev
```

This runs both the React dev server and the Node.js backend concurrently.
