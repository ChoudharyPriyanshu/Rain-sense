import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { WiRain } from 'react-icons/wi';
import { useAuth } from '../context/AuthContext';
import Tilt from 'react-parallax-tilt';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/dashboard');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
          <div className="glass-card p-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="inline-block"
              >
                <WiRain className="text-7xl text-primary mx-auto animate-pulse" />
              </motion.div>
              <h1 className="text-3xl font-heading font-bold mt-4">
                Welcome Back
              </h1>
              <p className="text-gray-400 mt-2">
                Sign in to access your weather predictions
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field pl-12"
                    placeholder="Enter your email"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="input-field pl-12"
                    placeholder="Enter your password"
                  />
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                type="submit"
                disabled={loading}
                className="w-full btn-primary text-lg py-4"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="loader mr-3" />
                    Signing in...
                  </div>
                ) : (
                  <span className="flex items-center justify-center">
                    Sign In
                    <FiArrowRight className="ml-2" />
                  </span>
                )}
              </motion.button>
            </form>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:text-accent transition-colors">
                  Register here
                </Link>
              </p>
              <Link to="/" className="block mt-4 text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Back to Home
              </Link>
            </motion.div>
          </div>
        </Tilt>
      </motion.div>
    </div>
  );
};

export default Login;
