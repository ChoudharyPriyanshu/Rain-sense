const Prediction = require('../models/Prediction');

// Simple rainfall prediction algorithm (mock ML model)
const predictRainfall = (inputs) => {
  const { humidity, temperature, windSpeed, pressure, cloudDensity } = inputs;

  // Weighted scoring system
  let score = 0;
  
  // Humidity contribution (0-40 points)
  score += (humidity / 100) * 40;
  
  // Cloud density contribution (0-30 points)
  score += (cloudDensity / 100) * 30;
  
  // Temperature contribution (0-15 points)
  // Lower temperatures increase rain probability
  if (temperature < 10) {
    score += 15;
  } else if (temperature < 20) {
    score += 10;
  } else if (temperature < 30) {
    score += 5;
  }
  
  // Pressure contribution (0-10 points)
  // Lower pressure increases rain probability
  if (pressure < 1000) {
    score += 10;
  } else if (pressure < 1013) {
    score += 5;
  }
  
  // Wind speed contribution (0-5 points)
  if (windSpeed > 20) {
    score += 5;
  } else if (windSpeed > 10) {
    score += 3;
  }

  // Calculate rainfall probability (0-100%)
  const rainfallProbability = Math.min(Math.round(score), 100);
  
  // Expected rainfall in mm based on probability and humidity
  const expectedRainfall = (rainfallProbability / 100) * (humidity / 10) * (cloudDensity / 20);
  
  // Determine weather condition
  let weatherCondition;
  if (rainfallProbability < 20) {
    weatherCondition = 'Clear';
  } else if (rainfallProbability < 40) {
    weatherCondition = 'Cloudy';
  } else if (rainfallProbability < 60) {
    weatherCondition = 'Light Rain';
  } else if (rainfallProbability < 80) {
    weatherCondition = 'Moderate Rain';
  } else if (rainfallProbability < 95) {
    weatherCondition = 'Heavy Rain';
  } else {
    weatherCondition = 'Storm';
  }
  
  // Confidence level based on data consistency
  const confidence = Math.min(
    70 + Math.round((humidity + cloudDensity) / 10),
    95
  );

  return {
    rainfallProbability: Math.round(rainfallProbability),
    expectedRainfall: Math.round(expectedRainfall * 10) / 10,
    weatherCondition,
    confidence
  };
};

// @desc    Create new prediction
// @route   POST /api/predictions
// @access  Public
exports.createPrediction = async (req, res) => {
  try {
    const { humidity, temperature, windSpeed, pressure, cloudDensity, location } = req.body;

    // Validation
    if (!humidity || !temperature || windSpeed === undefined || !pressure || !cloudDensity) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required input parameters'
      });
    }

    // Calculate prediction
    const result = predictRainfall({
      humidity,
      temperature,
      windSpeed,
      pressure,
      cloudDensity
    });

    // Create prediction record
    const prediction = await Prediction.create({
      userId: req.user ? req.user._id : null,
      inputs: {
        humidity,
        temperature,
        windSpeed,
        pressure,
        cloudDensity
      },
      result,
      location: location || {}
    });

    res.status(201).json({
      success: true,
      data: prediction
    });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during prediction'
    });
  }
};

// @desc    Get all predictions
// @route   GET /api/predictions
// @access  Public
exports.getPredictions = async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    
    const predictions = await Prediction.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Prediction.countDocuments();

    res.json({
      success: true,
      count: predictions.length,
      total,
      data: predictions
    });
  } catch (error) {
    console.error('Get predictions error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Get prediction by ID
// @route   GET /api/predictions/:id
// @access  Public
exports.getPredictionById = async (req, res) => {
  try {
    const prediction = await Prediction.findById(req.params.id);

    if (!prediction) {
      return res.status(404).json({
        success: false,
        message: 'Prediction not found'
      });
    }

    res.json({
      success: true,
      data: prediction
    });
  } catch (error) {
    console.error('Get prediction error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Get analytics data
// @route   GET /api/predictions/analytics
// @access  Public
exports.getAnalytics = async (req, res) => {
  try {
    const predictions = await Prediction.find().sort({ createdAt: -1 }).limit(100);

    // Calculate analytics
    const totalPredictions = predictions.length;
    const avgProbability = predictions.reduce((sum, p) => sum + p.result.rainfallProbability, 0) / totalPredictions;
    const avgRainfall = predictions.reduce((sum, p) => sum + p.result.expectedRainfall, 0) / totalPredictions;

    // Weather condition distribution
    const conditionDistribution = predictions.reduce((acc, p) => {
      acc[p.result.weatherCondition] = (acc[p.result.weatherCondition] || 0) + 1;
      return acc;
    }, {});

    // Recent trends (last 7 predictions)
    const recentTrends = predictions.slice(0, 7).map(p => ({
      date: p.createdAt,
      probability: p.result.rainfallProbability,
      rainfall: p.result.expectedRainfall,
      condition: p.result.weatherCondition
    }));

    res.json({
      success: true,
      data: {
        totalPredictions,
        avgProbability: Math.round(avgProbability),
        avgRainfall: Math.round(avgRainfall * 10) / 10,
        conditionDistribution,
        recentTrends
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};
