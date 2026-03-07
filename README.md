# 🌦️ RainSense - AI-Powered Rainfall Prediction Platform

A production-quality, transitions-rich rainfall prediction website built with the MERN stack featuring stunning animations, parallax effects, and a futuristic UI design.

![RainSense](https://img.shields.io/badge/MERN-Stack-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)

## 🎯 Features

### 🏠 Landing Page
- Hero section with animated rain, clouds, and lightning effects
- Smooth parallax scroll effects and fade-in animations
- Glowing CTA buttons with hover effects
- Weather parameter icons with staggered animations

### 📊 Prediction Dashboard
- Interactive input fields for weather parameters:
  - Humidity (%)
  - Temperature (°C)
  - Wind Speed (km/h)
  - Air Pressure (hPa)
  - Cloud Density (%)
- Real-time prediction with animated transitions
- Dynamic background changes based on weather conditions
- Animated result cards with counters and progress bars
- 3D tilt effects on interactive cards

### 📈 Analytics Page
- Interactive charts with Recharts library:
  - Line charts for trend analysis
  - Pie charts for weather condition distribution
  - Bar charts for rainfall analysis
- Real-time weather data integration
- Animated stat cards with 3D tilt effects
- Live weather updates from OpenWeatherMap API

### 🎨 UI/UX Design
- **Glassmorphism** with blur effects and transparency
- **Framer Motion** animations throughout
- **Parallax effects** with react-parallax-tilt
- **Dark/Light mode** with smooth transitions
- Animated backgrounds with floating particles
- Custom scrollbar with gradient effects
- Loading animations and state transitions

### 🔐 Authentication
- JWT-based secure authentication
- User registration and login
- Protected routes
- Admin role support

## 🛠️ Tech Stack

### Frontend
- **React.js 18.2** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Recharts** - Chart library
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **React Parallax Tilt** - 3D tilt effects

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt.js** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin support

### External APIs
- **OpenWeatherMap API** - Real-time weather data

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- OpenWeatherMap API key

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/rainsense.git
cd rainsense
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Environment Setup

#### Server Environment Variables
Create `server/.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/rainsense
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_in_production
OPENWEATHER_API_KEY=your_openweathermap_api_key
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

#### Get OpenWeatherMap API Key
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Add it to your `.env` file

### 4. Start MongoDB
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas connection string in .env
```

### 5. Run the Application

#### Option 1: Run Both Servers Concurrently (Recommended)
```bash
# From root directory
npm run dev
```

#### Option 2: Run Separately
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 🎨 Color Palette

- **Primary**: #00D2FF → #3A7BD5 (Sky blue gradient)
- **Background**: #0F172A (Deep storm gray)
- **Accent**: #90E0EF (Cyan glow)
- **Text**: #F8FAFC (Soft white)

## 🖋️ Typography

- **Headings**: Orbitron
- **Body**: Poppins / Inter

## 📁 Project Structure

```
rainsense/
├── client/                  # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── AnimatedBackground.js
│   │   │   └── Navbar.js
│   │   ├── context/        # React contexts
│   │   │   ├── AuthContext.js
│   │   │   └── ThemeContext.js
│   │   ├── pages/          # Page components
│   │   │   ├── LandingPage.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Analytics.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
├── server/                  # Express backend
│   ├── controllers/        # Route controllers
│   │   ├── authController.js
│   │   ├── predictionController.js
│   │   └── weatherController.js
│   ├── middleware/         # Custom middleware
│   │   └── auth.js
│   ├── models/            # Mongoose models
│   │   ├── User.js
│   │   └── Prediction.js
│   ├── routes/            # API routes
│   │   ├── auth.js
│   │   ├── predictions.js
│   │   └── weather.js
│   ├── index.js
│   └── package.json
├── .gitignore
├── .env.example
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Predictions
- `POST /api/predictions` - Create new prediction
- `GET /api/predictions` - Get all predictions
- `GET /api/predictions/:id` - Get prediction by ID
- `GET /api/predictions/analytics` - Get analytics data

### Weather
- `GET /api/weather/current?city=London` - Get current weather
- `GET /api/weather/current?lat=51.5&lon=-0.1` - Get weather by coordinates
- `GET /api/weather/forecast?city=London` - Get weather forecast

## 🧠 Prediction Algorithm

The rainfall prediction uses a weighted scoring system based on:

1. **Humidity** (40% weight) - Higher humidity increases rain probability
2. **Cloud Density** (30% weight) - More clouds indicate higher rain chance
3. **Temperature** (15% weight) - Lower temperatures favor precipitation
4. **Pressure** (10% weight) - Low pressure systems bring rain
5. **Wind Speed** (5% weight) - Strong winds can indicate storms

The algorithm calculates:
- Rainfall probability (0-100%)
- Expected rainfall in mm
- Weather condition classification
- Confidence level

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy build folder to Vercel
```

### Backend (Render/Railway)
1. Create new web service
2. Connect your repository
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create cluster on [MongoDB Atlas](https://cloud.mongodb.com)
2. Get connection string
3. Update `MONGODB_URI` in environment variables

## 🎬 Animations & Effects

- **Framer Motion**: Page transitions, element animations
- **Parallax**: Scroll-based parallax effects
- **3D Tilt**: Interactive card tilting
- **Custom CSS**: Rain animations, glowing effects
- **Loading States**: Animated loaders and skeletons
- **Hover Effects**: Scale, glow, and color transitions

## 📱 Responsive Design

Fully responsive layout optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🔒 Security Features

- JWT authentication with secure tokens
- Password hashing with bcrypt
- Helmet.js for security headers
- CORS configuration
- Input validation
- MongoDB injection protection

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh

# Or check MongoDB service status
# Windows: services.msc
# Mac/Linux: sudo systemctl status mongodb
```

### Port Already in Use
```bash
# Kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### API Key Issues
- Ensure OpenWeatherMap API key is valid
- Check API key activation (may take a few hours)
- Verify API key in `.env` file

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

Built with 💙 by the RainSense Team

## 🙏 Acknowledgments

- OpenWeatherMap for weather data API
- Framer Motion for animation library
- Tailwind CSS for styling framework
- MongoDB for database solution

## 🌟 Future Enhancements

- [ ] Machine learning model integration
- [ ] Historical weather data analysis
- [ ] Location-based auto-detection
- [ ] Multi-language support
- [ ] Export predictions as PDF
- [ ] Email notifications for weather alerts
- [ ] Social sharing features
- [ ] Mobile app version

---

**Made with ❤️ using MERN Stack**

For issues and feature requests, please create an issue on GitHub.
