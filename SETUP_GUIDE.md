# 🛠️ Complete Setup Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [System Requirements](#system-requirements)
3. [Installation Process](#installation-process)
4. [Configuration](#configuration)
5. [Running the Application](#running-the-application)
6. [Testing](#testing)
7. [Common Issues](#common-issues)

---

## 🎯 Project Overview

**RainSense** is a full-stack MERN application featuring:
- **Frontend**: React 18 + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express + MongoDB
- **Features**: AI rainfall prediction, real-time weather, analytics, authentication

**Tech Stack:**
```
Frontend: React, Tailwind, Framer Motion, Recharts
Backend: Express, MongoDB, Mongoose, JWT
APIs: OpenWeatherMap
```

---

## 💻 System Requirements

### Mandatory
- **Node.js**: v16.0.0 or higher
- **npm**: v8.0.0 or higher
- **MongoDB**: v5.0 or higher (local) OR MongoDB Atlas account

### Recommended
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space
- **OS**: Windows 10/11, macOS 10.15+, Linux (Ubuntu 20.04+)

### Check Your Versions
```bash
node --version    # Should be v16+
npm --version     # Should be v8+
mongod --version  # Should be v5+
```

---

## 📦 Installation Process

### Step 1: Navigate to Project Directory
```bash
cd d:/PROJECTS/RainSense
```

### Step 2: Install All Dependencies
```bash
# Option A: Install everything at once (recommended)
npm run install-all

# Option B: Install manually
npm install                  # Root dependencies
cd server && npm install     # Backend dependencies
cd ../client && npm install  # Frontend dependencies
cd ..                        # Back to root
```

**Expected time**: 3-5 minutes depending on internet speed

---

## ⚙️ Configuration

### 1. MongoDB Setup

#### Option A: Local MongoDB
```bash
# Start MongoDB service
mongod

# Verify it's running
mongosh
# You should see MongoDB shell
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create free account
3. Create cluster (M0 Free tier)
4. Add database user (Database Access)
5. Whitelist IP (Network Access → 0.0.0.0/0)
6. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/rainsense
   ```

### 2. OpenWeatherMap API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Create free account
3. Go to API Keys section
4. Copy your API key
5. **Note**: May take 1-2 hours to activate

### 3. Environment Variables

#### Backend Configuration (`server/.env`)
```bash
# Navigate to server directory
cd server

# Copy example file
copy .env.example .env
# Or on Mac/Linux: cp .env.example .env
```

**Edit `server/.env`:**
```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/rainsense
# OR for Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rainsense

# Server
PORT=5000
NODE_ENV=development

# Authentication (CHANGE THIS!)
JWT_SECRET=your_unique_secret_key_min_32_characters_long

# Weather API
OPENWEATHER_API_KEY=your_api_key_from_openweathermap

# CORS
CLIENT_URL=http://localhost:3000
```

**Important Security Notes:**
- ✅ Use a strong, unique JWT_SECRET (32+ characters)
- ✅ Never commit `.env` file to Git
- ✅ Use different secrets for development/production

---

## 🚀 Running the Application

### Option 1: Run Both Servers Together (Recommended)
```bash
# From root directory
npm run dev
```

This starts:
- Backend on http://localhost:5000
- Frontend on http://localhost:3000

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

### Verify Everything is Running

**Check Backend:**
```bash
# Visit or curl:
http://localhost:5000/api/health

# Expected response:
{
  "status": "OK",
  "message": "RainSense API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Check Frontend:**
- Visit: http://localhost:3000
- Should see animated landing page

---

## 🧪 Testing

### 1. Test Backend API

#### Health Check
```bash
curl http://localhost:5000/api/health
```

#### Create Prediction (without auth)
```bash
curl -X POST http://localhost:5000/api/predictions \
  -H "Content-Type: application/json" \
  -d '{
    "humidity": 75,
    "temperature": 20,
    "windSpeed": 15,
    "pressure": 1013,
    "cloudDensity": 60
  }'
```

#### Get Analytics
```bash
curl http://localhost:5000/api/predictions/analytics
```

### 2. Test Frontend Features

#### Registration
1. Click "Register" in navbar
2. Fill form:
   - Username: testuser
   - Email: test@example.com
   - Password: test123
3. Submit and verify auto-login

#### Make Prediction
1. Go to Dashboard
2. Enter values:
   - Humidity: 80%
   - Temperature: 18°C
   - Wind Speed: 25 km/h
   - Pressure: 1005 hPa
   - Cloud Density: 85%
3. Click "Predict Rainfall"
4. Verify animated results appear

#### View Analytics
1. Click "Analytics" in navbar
2. Verify charts display
3. Check live weather widget

### 3. Test Animations
- ✅ Landing page parallax scrolling
- ✅ Button hover effects
- ✅ Theme toggle transition
- ✅ Dashboard result animations
- ✅ Chart loading animations
- ✅ 3D tilt effects on cards

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module"
```bash
# Solution: Reinstall dependencies
rm -rf node_modules
rm -rf server/node_modules
rm -rf client/node_modules
npm run install-all
```

### Issue: "Port 5000 already in use"
```bash
# Solution 1: Kill process on port
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9

# Solution 2: Change port in server/.env
PORT=5001
```

### Issue: "MongoDB connection failed"
```bash
# Solution 1: Check if MongoDB is running
mongosh

# Solution 2: Verify connection string
# Make sure password doesn't have special characters
# Or URL encode special characters

# Solution 3: Check MongoDB service
# Windows: services.msc → MongoDB
# Mac: brew services list
# Linux: sudo systemctl status mongodb
```

### Issue: "OpenWeatherMap 401 Unauthorized"
```bash
# Solution:
# 1. Wait 1-2 hours after creating API key
# 2. Verify API key is correct in .env
# 3. Check key is activated at openweathermap.org
# 4. Ensure no extra spaces in .env file
```

### Issue: Frontend shows blank page
```bash
# Solution 1: Check console for errors (F12)

# Solution 2: Verify backend is running
curl http://localhost:5000/api/health

# Solution 3: Clear browser cache
# Ctrl+Shift+R (Windows/Linux)
# Cmd+Shift+R (Mac)

# Solution 4: Rebuild
cd client
rm -rf build
npm run build
npm start
```

### Issue: CSS not loading properly
```bash
# Solution:
cd client
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
npm start
```

### Issue: Authentication not working
```bash
# Solution 1: Check JWT_SECRET is set in server/.env

# Solution 2: Clear browser localStorage
# F12 → Application → Local Storage → Clear

# Solution 3: Verify CORS settings in server/index.js
```

---

## 📁 File Structure Reference

```
RainSense/
├── client/                      # React frontend
│   ├── public/
│   │   ├── index.html          # HTML template
│   │   └── manifest.json       # PWA manifest
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnimatedBackground.js
│   │   │   └── Navbar.js
│   │   ├── context/
│   │   │   ├── AuthContext.js  # Auth state
│   │   │   └── ThemeContext.js # Theme state
│   │   ├── pages/
│   │   │   ├── LandingPage.js  # Home
│   │   │   ├── Dashboard.js    # Predictions
│   │   │   ├── Analytics.js    # Charts
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── App.js              # Main app component
│   │   ├── index.js            # Entry point
│   │   └── index.css           # Global styles
│   ├── package.json
│   ├── tailwind.config.js      # Tailwind config
│   └── postcss.config.js       # PostCSS config
├── server/                      # Express backend
│   ├── controllers/
│   │   ├── authController.js   # Auth logic
│   │   ├── predictionController.js
│   │   └── weatherController.js
│   ├── middleware/
│   │   └── auth.js             # JWT verification
│   ├── models/
│   │   ├── User.js             # User schema
│   │   └── Prediction.js       # Prediction schema
│   ├── routes/
│   │   ├── auth.js             # Auth routes
│   │   ├── predictions.js      # Prediction routes
│   │   └── weather.js          # Weather routes
│   ├── index.js                # Server entry point
│   ├── package.json
│   └── .env                    # Environment variables
├── .gitignore
├── .env.example
├── package.json                # Root package.json
├── README.md                   # Main documentation
├── QUICK_START.md              # Quick start guide
├── FEATURES.md                 # Features list
├── DEPLOYMENT.md               # Deployment guide
└── SETUP_GUIDE.md              # This file
```

---

## 🎓 Development Workflow

### 1. Start Development
```bash
# Terminal 1: Backend with auto-reload
cd server
npm run dev

# Terminal 2: Frontend with HMR
cd client
npm start
```

### 2. Make Changes
- Backend changes auto-reload with nodemon
- Frontend changes trigger hot module replacement

### 3. Test Changes
- Check browser console (F12)
- Monitor terminal logs
- Test API with curl/Postman

### 4. Commit Changes
```bash
git add .
git commit -m "Your message"
git push
```

---

## 📊 Environment Checklist

Before running:
- [ ] Node.js v16+ installed
- [ ] MongoDB running (local) or Atlas configured
- [ ] OpenWeatherMap API key obtained
- [ ] `server/.env` file created and configured
- [ ] All dependencies installed (`npm run install-all`)
- [ ] Port 3000 and 5000 available

---

## 🎯 Next Steps

After setup:
1. Read [FEATURES.md](FEATURES.md) for feature details
2. Check [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
3. Customize colors in `client/tailwind.config.js`
4. Add your own features!

---

## 📞 Getting Help

If stuck:
1. Check this guide thoroughly
2. Review error messages in terminal
3. Check browser console (F12)
4. Verify environment variables
5. Ensure all services are running

---

## ✅ Success Checklist

You're successfully set up when:
- [ ] Backend responds at http://localhost:5000/api/health
- [ ] Frontend loads at http://localhost:3000
- [ ] You can register a new account
- [ ] You can make a prediction
- [ ] Analytics page shows charts
- [ ] No console errors
- [ ] Animations work smoothly

---

**Congratulations! You're ready to use RainSense!** 🎉

For quick reference, use [QUICK_START.md](QUICK_START.md)
