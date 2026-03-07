const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  inputs: {
    humidity: {
      type: Number,
      required: [true, 'Humidity is required'],
      min: [0, 'Humidity must be at least 0%'],
      max: [100, 'Humidity cannot exceed 100%']
    },
    temperature: {
      type: Number,
      required: [true, 'Temperature is required'],
      min: [-50, 'Temperature must be at least -50°C'],
      max: [60, 'Temperature cannot exceed 60°C']
    },
    windSpeed: {
      type: Number,
      required: [true, 'Wind speed is required'],
      min: [0, 'Wind speed must be positive']
    },
    pressure: {
      type: Number,
      required: [true, 'Air pressure is required'],
      min: [900, 'Pressure must be at least 900 hPa'],
      max: [1100, 'Pressure cannot exceed 1100 hPa']
    },
    cloudDensity: {
      type: Number,
      required: [true, 'Cloud density is required'],
      min: [0, 'Cloud density must be at least 0%'],
      max: [100, 'Cloud density cannot exceed 100%']
    }
  },
  result: {
    rainfallProbability: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    expectedRainfall: {
      type: Number,
      required: true,
      min: 0
    },
    weatherCondition: {
      type: String,
      enum: ['Clear', 'Cloudy', 'Light Rain', 'Moderate Rain', 'Heavy Rain', 'Storm'],
      required: true
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    }
  },
  location: {
    city: String,
    country: String,
    coordinates: {
      lat: Number,
      lon: Number
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
predictionSchema.index({ createdAt: -1 });
predictionSchema.index({ userId: 1 });

module.exports = mongoose.model('Prediction', predictionSchema);
