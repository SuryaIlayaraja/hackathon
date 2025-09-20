# 🚀 Complete Render Deployment Guide for Agrico

This guide will walk you through deploying your Agrico application to Render step by step.

## 📋 Prerequisites

1. **GitHub Account**: Your code should be pushed to GitHub
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **Supabase Project**: Already set up (✅ Done)
4. **Clerk Account**: For authentication (if using)

## 🎯 Deployment Strategy

We'll deploy **two separate services**:
1. **Frontend Service** - React/Vite application
2. **Backend Service** - Express.js API server

## 📝 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Verify these files are in your repository**:
   - `render.yaml` ✅
   - `Dockerfile` ✅
   - `package.json` (updated) ✅
   - `server/package.json` ✅
   - `server/config.js` (updated) ✅

### Step 2: Create Render Account & Connect GitHub

1. Go to [render.com](https://render.com) and sign up
2. Connect your GitHub account
3. Authorize Render to access your repositories

### Step 3: Deploy Backend Service First

1. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your `agrico` repository

2. **Configure Backend Service**:
   ```
   Name: agrico-backend
   Environment: Node
   Region: Choose closest to your users
   Branch: main
   Root Directory: (leave empty)
   Build Command: cd server && npm install
   Start Command: cd server && npm start
   ```

3. **Set Environment Variables**:
   ```
   NODE_ENV = production
   PORT = 10000
   SUPABASE_URL = https://ycorozkbfeqwybujwnaz.supabase.co
   SUPABASE_SERVICE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljb3JvemtiZmVxd3lidWp3bmF6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzY2MTQ2MCwiZXhwIjoyMDczMjM3NDYwfQ.Uk8pYd76w-UEEzLmnXrTJEMdo86sB71iOA1vnQI8UoQ
   ```

4. **Deploy Backend**:
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note the URL: `https://agrico-backend.onrender.com`

### Step 4: Deploy Frontend Service

1. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository (same repo)

2. **Configure Frontend Service**:
   ```
   Name: agrico-frontend
   Environment: Node
   Region: Same as backend
   Branch: main
   Root Directory: (leave empty)
   Build Command: npm install && npm run build
   Start Command: npm run preview
   ```

3. **Set Environment Variables**:
   ```
   VITE_API_URL = https://agrico-backend.onrender.com/api
   VITE_SUPABASE_URL = https://ycorozkbfeqwybujwnaz.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljb3JvemtiZmVxd3lidWp3bmF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2NjE0NjAsImV4cCI6MjA3MzIzNzQ2MH0.YourAnonKeyHere
   VITE_CLERK_PUBLISHABLE_KEY = your-clerk-publishable-key-here
   ```

4. **Deploy Frontend**:
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note the URL: `https://agrico-frontend.onrender.com`

### Step 5: Update CORS Settings

1. **Update Backend CORS**:
   - Go to your backend service on Render
   - Go to Environment tab
   - Add/Update environment variable:
   ```
   CORS_ORIGIN = https://agrico-frontend.onrender.com
   ```

2. **Redeploy Backend**:
   - Click "Manual Deploy" → "Deploy latest commit"

### Step 6: Configure Custom Domain (Optional)

1. **Add Custom Domain**:
   - Go to your frontend service
   - Click "Settings" → "Custom Domains"
   - Add your domain (e.g., `agrico.com`)
   - Follow DNS configuration instructions

## 🔧 Alternative: Single Service Deployment

If you prefer a single service deployment:

1. **Create One Web Service**:
   ```
   Name: agrico-app
   Environment: Node
   Build Command: npm install && npm run build && cd server && npm install
   Start Command: npm run start
   ```

2. **Environment Variables**:
   ```
   NODE_ENV = production
   PORT = 10000
   VITE_API_URL = https://agrico-app.onrender.com/api
   VITE_SUPABASE_URL = https://ycorozkbfeqwybujwnaz.supabase.co
   VITE_SUPABASE_ANON_KEY = your-anon-key
   VITE_CLERK_PUBLISHABLE_KEY = your-clerk-key
   SUPABASE_URL = https://ycorozkbfeqwybujwnaz.supabase.co
   SUPABASE_SERVICE_KEY = your-service-key
   ```

## 🚨 Important Notes

### Free Tier Limitations:
- **Sleep Mode**: Services sleep after 15 minutes of inactivity
- **Cold Start**: First request after sleep takes 30-60 seconds
- **Build Time**: 90 minutes per month
- **Bandwidth**: 100GB per month

### Production Considerations:
1. **Upgrade to Paid Plan** for:
   - Always-on services
   - Faster cold starts
   - More resources

2. **Environment Variables**:
   - Never commit sensitive keys to GitHub
   - Use Render's environment variable system
   - Update CORS origins for production domains

3. **Database**:
   - Your Supabase database is already production-ready
   - No additional setup needed

## 🔍 Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check build logs in Render dashboard

2. **CORS Errors**:
   - Update CORS_ORIGIN environment variable
   - Ensure frontend URL is correct
   - Redeploy backend after CORS changes

3. **Environment Variables**:
   - Double-check all environment variables
   - Ensure no typos in variable names
   - Verify Supabase keys are correct

4. **Service Not Starting**:
   - Check start command in Render
   - Verify PORT environment variable
   - Check server logs for errors

### Debugging Steps:

1. **Check Logs**:
   - Go to your service dashboard
   - Click "Logs" tab
   - Look for error messages

2. **Test Endpoints**:
   - Backend: `https://agrico-backend.onrender.com/health`
   - Frontend: `https://agrico-frontend.onrender.com`

3. **Verify Environment Variables**:
   - Go to Environment tab
   - Ensure all required variables are set

## 🎉 Post-Deployment Checklist

- [ ] Backend service is running and accessible
- [ ] Frontend service is running and accessible
- [ ] API endpoints are working
- [ ] Database connections are working
- [ ] Authentication is working (if using Clerk)
- [ ] CORS is properly configured
- [ ] Custom domain is working (if configured)
- [ ] SSL certificates are active
- [ ] Performance is acceptable

## 📞 Support

If you encounter issues:
1. Check Render's documentation: [render.com/docs](https://render.com/docs)
2. Check service logs in Render dashboard
3. Verify environment variables
4. Test locally first to isolate issues

## 🚀 Your Application URLs

After successful deployment:
- **Frontend**: `https://agrico-frontend.onrender.com`
- **Backend API**: `https://agrico-backend.onrender.com`
- **Health Check**: `https://agrico-backend.onrender.com/health`

---

**Congratulations!** Your Agrico application is now live on Render! 🎊
