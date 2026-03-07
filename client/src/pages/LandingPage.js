import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { WiRain, WiCloud, WiStrongWind, WiThermometer, WiBarometer } from 'react-icons/wi';
import { FiArrowRight, FiZap, FiTrendingUp, FiGlobe } from 'react-icons/fi';
import Tilt from 'react-parallax-tilt';

const LandingPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const features = [
    {
      icon: <FiZap className="text-4xl" />,
      title: "AI-Powered Predictions",
      description: "Advanced algorithms analyze multiple weather parameters for accurate rainfall forecasting"
    },
    {
      icon: <FiTrendingUp className="text-4xl" />,
      title: "Real-Time Analytics",
      description: "Live weather data integration with interactive visualizations and trend analysis"
    },
    {
      icon: <FiGlobe className="text-4xl" />,
      title: "Global Coverage",
      description: "Access weather predictions for any location worldwide with precision accuracy"
    }
  ];

  const weatherParams = [
    { icon: <WiRain />, label: "Humidity", color: "text-blue-400" },
    { icon: <WiThermometer />, label: "Temperature", color: "text-red-400" },
    { icon: <WiStrongWind />, label: "Wind Speed", color: "text-cyan-400" },
    { icon: <WiBarometer />, label: "Pressure", color: "text-purple-400" },
    { icon: <WiCloud />, label: "Cloud Density", color: "text-gray-400" }
  ];

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="max-w-7xl mx-auto text-center z-10"
        >
          {/* Animated Rain Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-8"
          >
            <WiRain className="text-9xl text-primary mx-auto animate-pulse" />
          </motion.div>

          {/* Hero Text */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-6"
          >
            <span className="gradient-text">Forecast Smarter.</span>
            <br />
            <span className="text-white">Predict Brighter.</span>
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Harness the power of AI to predict rainfall with unprecedented accuracy.
            Real-time weather analytics at your fingertips.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center space-x-2 text-lg px-8 py-4 animate-glow"
              >
                <span>Start Predicting</span>
                <FiArrowRight />
              </motion.button>
            </Link>
            <Link to="/analytics">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4"
              >
                View Analytics
              </motion.button>
            </Link>
          </motion.div>

          {/* Weather Parameters */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 mt-20"
          >
            {weatherParams.map((param, index) => (
              <motion.div
                key={param.label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className={`text-5xl ${param.color} mb-2`}>
                  {param.icon}
                </div>
                <span className="text-sm text-gray-400">{param.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-primary rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Why Choose <span className="gradient-text">RainSense?</span>
            </h2>
            <p className="text-xl text-gray-400">
              Advanced technology meets intuitive design
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Tilt key={feature.title} tiltMaxAngleX={10} tiltMaxAngleY={10}>
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="glass-card p-8 h-full hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
                >
                  <div className="text-primary mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-heading font-bold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto glass-card p-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ready to Predict the Weather?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of users who trust RainSense for accurate rainfall predictions
          </p>
          <Link to="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-10 py-4 animate-glow"
            >
              Get Started Now
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2024 RainSense. All rights reserved.</p>
          <p className="mt-2 text-sm">Built with 💙 using MERN Stack</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
