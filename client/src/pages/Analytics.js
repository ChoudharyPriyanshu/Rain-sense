import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiTrendingUp, FiActivity, FiCloud } from 'react-icons/fi';
import { WiRain } from 'react-icons/wi';
import axios from 'axios';
import toast from 'react-hot-toast';
import Tilt from 'react-parallax-tilt';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchAnalytics();
    fetchWeather();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('/api/predictions/analytics');
      setAnalyticsData(response.data.data);
    } catch (error) {
      console.error('Analytics error:', error);
      toast.error('Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get('/api/weather/current?city=London');
      setWeatherData(response.data.data);
    } catch (error) {
      console.error('Weather error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="loader mx-auto mb-4" />
          <p className="text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const COLORS = ['#00D2FF', '#3A7BD5', '#90E0EF', '#F72585', '#7209B7', '#4CC9F0'];

  const conditionData = analyticsData?.conditionDistribution
    ? Object.entries(analyticsData.conditionDistribution).map(([name, value]) => ({
        name,
        value
      }))
    : [];

  const trendData = analyticsData?.recentTrends?.map((item, index) => ({
    name: `Day ${index + 1}`,
    probability: item.probability,
    rainfall: item.rainfall
  })) || [];

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
            Weather <span className="gradient-text">Analytics</span>
          </h1>
          <p className="text-xl text-gray-400">
            Real-time insights and prediction trends
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-primary text-4xl">
                    <FiActivity />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold gradient-text">
                      {analyticsData?.totalPredictions || 0}
                    </div>
                    <div className="text-sm text-gray-400">Total Predictions</div>
                  </div>
                </div>
                <div className="h-1 bg-gradient-primary rounded-full" />
              </div>
            </Tilt>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-accent text-4xl">
                    <WiRain />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-accent">
                      {analyticsData?.avgProbability || 0}%
                    </div>
                    <div className="text-sm text-gray-400">Avg. Probability</div>
                  </div>
                </div>
                <div className="h-1 bg-accent rounded-full" />
              </div>
            </Tilt>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-blue-400 text-4xl">
                    <FiTrendingUp />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-400">
                      {analyticsData?.avgRainfall || 0}mm
                    </div>
                    <div className="text-sm text-gray-400">Avg. Rainfall</div>
                  </div>
                </div>
                <div className="h-1 bg-blue-400 rounded-full" />
              </div>
            </Tilt>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Trend Chart */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
              <div className="glass-card p-6">
                <h3 className="text-2xl font-heading font-bold mb-6 flex items-center">
                  <FiTrendingUp className="mr-2 text-primary" />
                  Recent Trends
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1E293B',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="probability"
                      stroke="#00D2FF"
                      strokeWidth={3}
                      dot={{ fill: '#00D2FF', r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="rainfall"
                      stroke="#90E0EF"
                      strokeWidth={3}
                      dot={{ fill: '#90E0EF', r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Tilt>
          </motion.div>

          {/* Weather Condition Distribution */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
              <div className="glass-card p-6">
                <h3 className="text-2xl font-heading font-bold mb-6 flex items-center">
                  <FiCloud className="mr-2 text-primary" />
                  Condition Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={conditionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {conditionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1E293B',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Tilt>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3}>
              <div className="glass-card p-6">
                <h3 className="text-2xl font-heading font-bold mb-6 flex items-center">
                  <WiRain className="mr-2 text-primary" />
                  Rainfall Analysis
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1E293B',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="probability" fill="#00D2FF" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="rainfall" fill="#90E0EF" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Tilt>
          </motion.div>
        </div>

        {/* Real-Time Weather */}
        {weatherData && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
              <div className="glass-card p-6">
                <h3 className="text-2xl font-heading font-bold mb-6">
                  Live Weather: {weatherData.location.city}, {weatherData.location.country}
                </h3>
                <div className="grid md:grid-cols-5 gap-4">
                  <div className="glass p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-red-400">
                      {weatherData.current.temperature}°C
                    </div>
                    <div className="text-sm text-gray-400 mt-1">Temperature</div>
                  </div>
                  <div className="glass p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-blue-400">
                      {weatherData.current.humidity}%
                    </div>
                    <div className="text-sm text-gray-400 mt-1">Humidity</div>
                  </div>
                  <div className="glass p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-cyan-400">
                      {weatherData.current.windSpeed} km/h
                    </div>
                    <div className="text-sm text-gray-400 mt-1">Wind Speed</div>
                  </div>
                  <div className="glass p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-purple-400">
                      {weatherData.current.pressure} hPa
                    </div>
                    <div className="text-sm text-gray-400 mt-1">Pressure</div>
                  </div>
                  <div className="glass p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-gray-400">
                      {weatherData.current.cloudDensity}%
                    </div>
                    <div className="text-sm text-gray-400 mt-1">Clouds</div>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
