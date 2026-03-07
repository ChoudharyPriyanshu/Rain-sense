import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { WiRain } from 'react-icons/wi';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Analytics', path: '/analytics' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card m-4 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <WiRain className="text-4xl text-primary group-hover:animate-pulse" />
          <span className="text-2xl font-heading font-bold gradient-text">
            RainSense
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative text-sm font-medium transition-colors duration-300
                ${isActive(item.path) ? 'text-primary' : 'text-gray-300 hover:text-white'}`}
            >
              {item.name}
              {isActive(item.path) && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
          >
            {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
          </motion.button>

          {/* Auth Buttons */}
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-300">
                Welcome, <span className="text-primary font-semibold">{user.username}</span>
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 
                          rounded-lg hover:bg-red-500/30 transition-colors"
              >
                <FiLogOut />
                <span>Logout</span>
              </motion.button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Register
                </motion.button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg glass hover:bg-white/10 transition-colors"
        >
          {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden mt-4 pt-4 border-t border-white/10"
        >
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-medium transition-colors
                  ${isActive(item.path) ? 'text-primary' : 'text-gray-300'}`}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-sm text-gray-400">Theme</span>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
              >
                {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
              </button>
            </div>

            {user ? (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="flex items-center justify-center space-x-2 px-4 py-2 
                          bg-red-500/20 text-red-400 rounded-lg"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full btn-secondary">Login</button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <button className="w-full btn-primary">Register</button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
