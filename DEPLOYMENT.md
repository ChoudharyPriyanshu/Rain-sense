# 🚀 Deployment Guide

## Quick Deployment Checklist

- [ ] MongoDB Atlas account created
- [ ] OpenWeatherMap API key obtained
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render/Railway
- [ ] Environment variables configured
- [ ] CORS settings updated
- [ ] Testing completed

---

## 📦 MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Sign up for a free account
3. Create a new cluster (Free tier M0)

### 2. Configure Database Access
1. Go to "Database Access"
2. Add new database user
3. Create username and strong password
4. Grant "Read and write to any database" permission

### 3. Configure Network Access
1. Go to "Network Access"
2. Add IP Address
3. Click "Allow access from anywhere" (0.0.0.0/0)
4. Confirm

### 4. Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `rainsense`

Example:
```
mongodb+srv://username:password@cluster.mongodb.net/rainsense?retryWrites=true&w=majority
```

---

## 🎨 Frontend Deployment (Vercel)

### 1. Prepare Frontend
```bash
cd client
npm run build
```

### 2. Deploy to Vercel

#### Option A: Vercel CLI
```bash
npm install -g vercel
cd client
vercel
```

#### Option B: Vercel Dashboard
1. Go to [Vercel](https://vercel.com)
2. Sign up/Login with GitHub
3. Import your repository
4. Configure:
   - Framework Preset: Create React App
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`

### 3. Environment Variables (Vercel)
Add in Vercel dashboard:
```
REACT_APP_API_URL=https://your-backend-url.render.com
```

---

## ⚙️ Backend Deployment (Render)

### 1. Prepare Backend
Ensure `server/package.json` has start script:
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

### 2. Deploy to Render

1. Go to [Render](https://render.com)
2. Sign up/Login with GitHub
3. Create new "Web Service"
4. Connect your repository
5. Configure:
   - Name: `rainsense-api`
   - Environment: `Node`
   - Region: Choose closest to you
   - Branch: `main`
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

### 3. Environment Variables (Render)
Add in Render dashboard:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rainsense
JWT_SECRET=your_production_jwt_secret_min_32_chars
OPENWEATHER_API_KEY=your_openweather_api_key
CLIENT_URL=https://your-vercel-app.vercel.app
NODE_ENV=production
PORT=5000
```

### 4. Update CORS
After deployment, update `server/index.js` CORS configuration to include your Vercel URL:
```javascript
app.use(cors({
  origin: [
    process.env.CLIENT_URL,
    'https://your-vercel-app.vercel.app'
  ],
  credentials: true
}));
```

---

## 🔄 Alternative: Backend on Railway

### 1. Deploy to Railway
1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. Create new project
4. Deploy from GitHub repo
5. Select `server` directory

### 2. Add Environment Variables
Same as Render configuration above

### 3. Get Deployment URL
Railway will provide a URL like:
```
https://rainsense-api-production.up.railway.app
```

---

## 🌍 Alternative: Full Stack on Heroku

### 1. Prepare for Heroku
Create `Procfile` in root:
```
web: cd server && npm start
```

### 2. Deploy
```bash
heroku login
heroku create rainsense-app
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set OPENWEATHER_API_KEY=your_api_key
git push heroku main
```

---

## 🔐 Security Checklist

### Production Environment Variables
- [ ] Use strong JWT secret (min 32 characters)
- [ ] Never commit `.env` files
- [ ] Use environment-specific configurations
- [ ] Enable HTTPS only
- [ ] Restrict CORS to specific origins

### MongoDB Security
- [ ] Use strong database password
- [ ] Enable IP whitelisting (or use 0.0.0.0/0 carefully)
- [ ] Regular backups enabled
- [ ] Monitoring alerts configured

### API Keys
- [ ] OpenWeatherMap API key secured
- [ ] Rate limiting configured
- [ ] Usage monitoring enabled

---

## 🧪 Testing Deployment

### 1. Test Backend
```bash
curl https://your-backend-url.render.com/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "RainSense API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Test Frontend
1. Visit your Vercel URL
2. Check all pages load
3. Test authentication
4. Create a prediction
5. View analytics

### 3. Test Integration
- [ ] Login/Register works
- [ ] Predictions are saved
- [ ] Analytics display correctly
- [ ] Weather API integration works
- [ ] No CORS errors in console

---

## 📊 Monitoring

### Vercel
- Analytics dashboard
- Function logs
- Deployment logs

### Render/Railway
- Logs tab for backend logs
- Metrics for CPU/Memory usage
- Health checks

### MongoDB Atlas
- Performance monitoring
- Query performance
- Database size tracking

---

## 🔧 Common Issues

### CORS Error
**Problem**: Frontend can't connect to backend

**Solution**:
```javascript
// server/index.js
app.use(cors({
  origin: ['https://your-frontend.vercel.app'],
  credentials: true
}));
```

### MongoDB Connection Timeout
**Problem**: Can't connect to MongoDB

**Solution**:
1. Check connection string
2. Verify password has no special characters (or URL encode)
3. Whitelist IP address in MongoDB Atlas
4. Check network access settings

### API Key Not Working
**Problem**: OpenWeatherMap API returns 401

**Solution**:
1. Wait 2-3 hours after creating key
2. Verify key in environment variables
3. Check API key activation status
4. Ensure free tier limits not exceeded

### Build Fails
**Problem**: Deployment build fails

**Solution**:
1. Test build locally first: `npm run build`
2. Check Node version compatibility
3. Ensure all dependencies in package.json
4. Review build logs for specific errors

---

## 🔄 Continuous Deployment

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

---

## 📞 Support

If you encounter issues:
1. Check logs (Vercel/Render dashboard)
2. Verify environment variables
3. Test API endpoints individually
4. Review browser console for errors

---

**Deployment complete! 🎉**

Your RainSense app should now be live and accessible worldwide.
