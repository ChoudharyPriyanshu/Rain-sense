import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WiRain, WiCloud, WiStrongWind, WiThermometer, WiBarometer, WiDaySunny } from 'react-icons/wi';
import { FiDroplet, FiActivity } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';
import Tilt from 'react-parallax-tilt';

const Dashboard = () => {
  const [inputs, setInputs] = useState({
    humidity: '',
    temperature: '',
    windSpeed: '',
    pressure: '',
    cloudDensity: ''
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/predictions', {
        humidity: parseFloat(inputs.humidity),
        temperature: parseFloat(inputs.temperature),
        windSpeed: parseFloat(inputs.windSpeed),
        pressure: parseFloat(inputs.pressure),
        cloudDensity: parseFloat(inputs.cloudDensity)
      });

      setResult(response.data.data.result);
      setShowResult(true);
      toast.success('Prediction generated successfully!');
    } catch (error) {
      console.error('Prediction error:', error);
      toast.error(error.response?.data?.message || 'Failed to generate prediction');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      'Clear': <WiDaySunny className="text-9xl text-yellow-400" />,
      'Cloudy': <WiCloud className="text-9xl text-gray-400" />,
      'Light Rain': <WiRain className="text-9xl text-blue-400" />,
      'Moderate Rain': <WiRain className="text-9xl text-blue-500" />,
      'Heavy Rain': <WiRain className="text-9xl text-blue-600" />,
      'Storm': <WiRain className="text-9xl text-purple-500" />
    };
    return icons[condition] || <WiCloud className="text-9xl text-gray-400" />;
  };

  const getBackgroundGradient = (condition) => {
    const gradients = {
      'Clear': 'from-yellow-500/10 to-orange-500/10',
      'Cloudy': 'from-gray-500/10 to-slate-500/10',
      'Light Rain': 'from-blue-500/10 to-cyan-500/10',
      'Moderate Rain': 'from-blue-600/10 to-cyan-600/10',
      'Heavy Rain': 'from-blue-700/10 to-indigo-700/10',
      'Storm': 'from-purple-700/10 to-indigo-700/10'
    };
    return gradients[condition] || 'from-gray-500/10 to-slate-500/10';
  };

  const inputFields = [
    { name: 'humidity', label: 'Humidity (%)', icon: <WiRain />, min: 0, max: 100, step: 1 },
    { name: 'temperature', label: 'Temperature (°C)', icon: <WiThermometer />, min: -50, max: 60, step: 0.1 },
    { name: 'windSpeed', label: 'Wind Speed (km/h)', icon: <WiStrongWind />, min: 0, max: 200, step: 1 },
    { name: 'pressure', label: 'Pressure (hPa)', icon: <WiBarometer />, min: 900, max: 1100, step: 1 },
    { name: 'cloudDensity', label: 'Cloud Density (%)', icon: <WiCloud />, min: 0, max: 100, step: 1 }
  ];

  return (
    <div className="min-h-screen pt-32 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
            Prediction <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-xl text-gray-400">
            Enter weather parameters to predict rainfall probability
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
              <div className="glass-card p-8">
                <h2 className="text-2xl font-heading font-bold mb-6 flex items-center">
                  <FiActivity className="mr-2 text-primary" />
                  Weather Parameters
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {inputFields.map((field, index) => (
                    <motion.div
                      key={field.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <span className="flex items-center">
                          <span className="text-2xl mr-2">{field.icon}</span>
                          {field.label}
                        </span>
                      </label>
                      <input
                        type="number"
                        name={field.name}
                        value={inputs[field.name]}
                        onChange={handleInputChange}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        required
                        className="input-field"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary text-lg py-4 relative overflow-hidden"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="loader mr-3" />
                        Analyzing...
                      </div>
                    ) : (
                      <span className="flex items-center justify-center">
                        <FiDroplet className="mr-2" />
                        Predict Rainfall
                      </span>
                    )}
                  </motion.button>
                </form>
              </div>
            </Tilt>
          </motion.div>

          {/* Results Display */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {showResult && result ? (
                <motion.div
                  key="result"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.6 }}
                >
                  <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
                    <div className={`glass-card p-8 bg-gradient-to-br ${getBackgroundGradient(result.weatherCondition)}`}>
                      <h2 className="text-2xl font-heading font-bold mb-8 text-center">
                        Prediction Results
                      </h2>

                      {/* Weather Icon */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", duration: 0.8 }}
                        className="flex justify-center mb-8"
                      >
                        {getWeatherIcon(result.weatherCondition)}
                      </motion.div>

                      {/* Weather Condition */}
                      <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-bold text-center mb-8 gradient-text"
                      >
                        {result.weatherCondition}
                      </motion.h3>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4 }}
                          className="glass p-6 rounded-lg text-center"
                        >
                          <div className="text-4xl font-bold text-primary mb-2">
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.6 }}
                            >
                              {result.rainfallProbability}%
                            </motion.span>
                          </div>
                          <div className="text-sm text-gray-400">Rain Probability</div>
                        </motion.div>

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 }}
                          className="glass p-6 rounded-lg text-center"
                        >
                          <div className="text-4xl font-bold text-accent mb-2">
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.7 }}
                            >
                              {result.expectedRainfall}mm
                            </motion.span>
                          </div>
                          <div className="text-sm text-gray-400">Expected Rainfall</div>
                        </motion.div>

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.6 }}
                          className="glass p-6 rounded-lg text-center col-span-2"
                        >
                          <div className="text-4xl font-bold text-green-400 mb-2">
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.8 }}
                            >
                              {result.confidence}%
                            </motion.span>
                          </div>
                          <div className="text-sm text-gray-400">Confidence Level</div>
                        </motion.div>
                      </div>

                      {/* Progress Bar */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.7, duration: 1 }}
                        className="mt-8"
                      >
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                          <span>Rainfall Probability</span>
                          <span>{result.rainfallProbability}%</span>
                        </div>
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.rainfallProbability}%` }}
                            transition={{ delay: 0.9, duration: 1 }}
                            className="h-full bg-gradient-primary rounded-full"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </Tilt>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card p-8 h-full flex flex-col items-center justify-center text-center"
                >
                  <WiCloud className="text-9xl text-gray-600 mb-6 animate-float" />
                  <h3 className="text-2xl font-heading font-bold mb-4">
                    Awaiting Prediction
                  </h3>
                  <p className="text-gray-400">
                    Fill in the weather parameters and click "Predict Rainfall" to see results
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
