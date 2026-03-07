# ⚡ Quick Start Guide

Get RainSense up and running in 5 minutes!

## 🎯 Prerequisites

- Node.js installed (v16+)
- MongoDB installed or MongoDB Atlas account
- OpenWeatherMap API key (free)

---

## 🚀 Installation Steps

### 1️⃣ Install Dependencies (2 minutes)

```bash
# Clone and enter directory
cd RainSense

# Install all dependencies at once
npm run install-all
```

### 2️⃣ Setup Environment Variables (1 minute)

**Create `server/.env`:**
```bash
cd server
copy .env.example .env
```

**Edit `server/.env` with your details:**
```env
MONGODB_URI=mongodb://localhost:27017/rainsense
PORT=5000
JWT_SECRET=my_super_secret_key_12345678
OPENWEATHER_API_KEY=your_api_key_here
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

**Get OpenWeatherMap API Key:**
- Visit: https://openweathermap.org/api
- Sign up (free)
- Copy API key to `.env`

### 3️⃣ Start MongoDB (30 seconds)

**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas:**
- Replace `MONGODB_URI` with Atlas connection string

### 4️⃣ Start Application (30 seconds)

```bash
# From root directory
npm run dev
```

This starts both frontend and backend simultaneously!

---

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

---

## 🎮 First Steps

### 1. Register an Account
1. Click "Register" in navbar
2. Create your account
3. Auto-login to dashboard

### 2. Make Your First Prediction
1. Go to Dashboard
2. Enter weather parameters:
   - Humidity: 75%
   - Temperature: 18°C
   - Wind Speed: 20 km/h
   - Pressure: 1010 hPa
   - Cloud Density: 80%
3. Click "Predict Rainfall"
4. View animated results!

### 3. Check Analytics
1. Click "Analytics" in navbar
2. View prediction trends
3. See weather condition distribution
4. Check live weather data

---

## 🎨 Features to Try

- ✨ **Animations**: Watch smooth transitions everywhere
- 🌓 **Dark Mode**: Toggle theme in navbar
- 📊 **Charts**: Interactive data visualizations
- 🔐 **Auth**: Secure JWT authentication
- 🌍 **Live Weather**: Real-time OpenWeatherMap data
- 📱 **Responsive**: Try on mobile!

---

## 🐛 Troubleshooting

### MongoDB Not Connecting?
```bash
# Check if MongoDB is running
mongosh

# If not installed, download from:
# https://www.mongodb.com/try/download/community
```

### Port Already in Use?
```bash
# Change port in server/.env
PORT=5001
```

### Build Errors?
```bash
# Clear cache and reinstall
rm -rf node_modules
rm -rf server/node_modules
rm -rf client/node_modules
npm run install-all
```

---

## 📚 Next Steps

- Read full [README.md](README.md) for detailed documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Customize colors in `client/tailwind.config.js`
- Add your own features!

---

## 🎉 You're Ready!

Enjoy using RainSense for rainfall predictions! 🌧️

**Need help?** Open an issue on GitHub
