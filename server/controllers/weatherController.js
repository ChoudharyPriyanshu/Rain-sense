const axios = require('axios');

// @desc    Get current weather data
// @route   GET /api/weather/current
// @access  Public
exports.getCurrentWeather = async (req, res) => {
  try {
    const { city, lat, lon } = req.query;

    if (!city && (!lat || !lon)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide city name or coordinates (lat, lon)'
      });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'OpenWeather API key not configured'
      });
    }

    let url = 'https://api.openweathermap.org/data/2.5/weather?';
    
    if (city) {
      url += `q=${city}`;
    } else {
      url += `lat=${lat}&lon=${lon}`;
    }
    
    url += `&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;

    // Transform data to match our format
    const weatherData = {
      location: {
        city: data.name,
        country: data.sys.country,
        coordinates: {
          lat: data.coord.lat,
          lon: data.coord.lon
        }
      },
      current: {
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        cloudDensity: data.clouds.all,
        description: data.weather[0].description,
        condition: data.weather[0].main,
        icon: data.weather[0].icon
      },
      timestamp: new Date(data.dt * 1000)
    };

    res.json({
      success: true,
      data: weatherData
    });
  } catch (error) {
    console.error('Weather API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.message || 'Error fetching weather data'
    });
  }
};

// @desc    Get weather forecast
// @route   GET /api/weather/forecast
// @access  Public
exports.getForecast = async (req, res) => {
  try {
    const { city, lat, lon } = req.query;

    if (!city && (!lat || !lon)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide city name or coordinates (lat, lon)'
      });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'OpenWeather API key not configured'
      });
    }

    let url = 'https://api.openweathermap.org/data/2.5/forecast?';
    
    if (city) {
      url += `q=${city}`;
    } else {
      url += `lat=${lat}&lon=${lon}`;
    }
    
    url += `&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;

    // Transform forecast data
    const forecast = data.list.slice(0, 8).map(item => ({
      timestamp: new Date(item.dt * 1000),
      temperature: Math.round(item.main.temp),
      humidity: item.main.humidity,
      pressure: item.main.pressure,
      windSpeed: Math.round(item.wind.speed * 3.6),
      cloudDensity: item.clouds.all,
      description: item.weather[0].description,
      condition: item.weather[0].main,
      icon: item.weather[0].icon,
      rainProbability: Math.round((item.pop || 0) * 100)
    }));

    res.json({
      success: true,
      data: {
        location: {
          city: data.city.name,
          country: data.city.country
        },
        forecast
      }
    });
  } catch (error) {
    console.error('Forecast API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.message || 'Error fetching forecast data'
    });
  }
};
