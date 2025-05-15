"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiEye, FiEyeOff, FiCheck, FiX } from 'react-icons/fi';

const AuthFlow = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    companyName: '',
    companyUrl: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin) {
      if (!formData.companyName) {
        newErrors.companyName = 'Company name is required';
      }
      
      if (!formData.companyUrl) {
        newErrors.companyUrl = 'Company URL is required';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Handle successful auth here
      router.push('/dashboard');
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
        className="w-full max-w-2xl mx-auto"

      >
        <motion.div
          layout
          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20"
        >
          {/* Header */}
          <motion.div 
            className="p-8 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.h2 
              className="text-3xl font-bold text-white mb-2"
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </motion.h2>
            <motion.p 
              className="text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {isLogin ? 'Sign in to continue' : 'Join us today'}
            </motion.p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <motion.div 
              className="px-8 pb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    key="companyName"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-4"
                  >
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Company Name
                      {formData.companyName && !errors.companyName && (
                        <FiCheck className="inline ml-2 text-green-400" />
                      )}
                    </label>
                    <input 
                      name="companyName"
                      type="text" 
                      value={formData.companyName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                        errors.companyName ? 'border-red-400/50' : 'border-white/20'
                      } text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                        errors.companyName ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                      } transition-all`}
                      placeholder="Acme Inc."
                    />
                    {errors.companyName && (
                      <motion.p 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-400"
                      >
                        {errors.companyName}
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    key="companyUrl"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="mb-4"
                  >
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Company URL
                      {formData.companyUrl && !errors.companyUrl && (
                        <FiCheck className="inline ml-2 text-green-400" />
                      )}
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg bg-white/10 border border-r-0 border-white/20 text-gray-300 text-sm">
                        https://
                      </span>
                      <input 
                        name="companyUrl"
                        type="text" 
                        value={formData.companyUrl}
                        onChange={handleChange}
                        className={`flex-1 px-4 py-3 rounded-r-lg bg-white/5 border ${
                          errors.companyUrl ? 'border-red-400/50' : 'border-white/20'
                        } text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                          errors.companyUrl ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                        } transition-all`}
                        placeholder="yourcompany.com"
                      />
                    </div>
                    {errors.companyUrl && (
                      <motion.p 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-400"
                      >
                        {errors.companyUrl}
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: isLogin ? 0 : 0.2 }}
                className="mb-4"
              >
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  {isLogin ? 'Email' : 'Owner Email'}
                  {formData.email && !errors.email && (
                    <FiCheck className="inline ml-2 text-green-400" />
                  )}
                </label>
                <input 
                  name="email"
                  type="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                    errors.email ? 'border-red-400/50' : 'border-white/20'
                  } text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errors.email ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                  } transition-all`}
                  placeholder="owner@company.com"
                />
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-400"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: isLogin ? 0.1 : 0.3 }}
                className="mb-4"
              >
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Password
                  {formData.password && !errors.password && (
                    <FiCheck className="inline ml-2 text-green-400" />
                  )}
                </label>
                <div className="relative">
                  <input 
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      errors.password ? 'border-red-400/50' : 'border-white/20'
                    } text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                      errors.password ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                    } transition-all pr-10`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-400"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </motion.div>

              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    key="confirmPassword"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="mb-6"
                  >
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Confirm Password
                      {formData.confirmPassword && !errors.confirmPassword && (
                        <FiCheck className="inline ml-2 text-green-400" />
                      )}
                    </label>
                    <div className="relative">
                      <input 
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                          errors.confirmPassword ? 'border-red-400/50' : 'border-white/20'
                        } text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                          errors.confirmPassword ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                        } transition-all pr-10`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <motion.p 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-400"
                      >
                        {errors.confirmPassword}
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className={`w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center ${
                  isLoading ? 'opacity-80 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  isLogin ? 'Sign In' : 'Sign Up'
                )}
              </motion.button>

              <motion.div 
                className="mt-6 text-center text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <button 
                  type="button"
                  onClick={toggleAuthMode}
                  className="text-purple-300 hover:text-purple-200 underline transition-colors flex items-center justify-center mx-auto"
                >
                  {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
                </button>
              </motion.div>
            </motion.div>
          </form>
        </motion.div>

        <motion.div 
          className="mt-6 text-center text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button 
            onClick={() => router.push('/')}
            className="hover:text-white transition-colors flex items-center justify-center mx-auto"
          >
            <FiArrowLeft className="mr-1" /> Back to Home
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AuthFlow;