import React from 'react'
import { motion } from 'framer-motion'
import { BrandLogo } from '@/components/BrandLogo'

interface AuthLayoutProps {
  children: React.ReactNode
  mode: 'sign-in' | 'sign-up'
}

const AuthLayout = ({ children, mode }: AuthLayoutProps) => {
  const isSignIn = mode === 'sign-in'

  return (
    <div className="flex min-h-screen w-full ">
      {/* Auth Card Section */}
      <motion.div
        initial={{ opacity: 0, x: isSignIn ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full lg:w-1/2 flex items-center justify-center p-4 
          ${isSignIn ? 'lg:order-first' : 'lg:order-last'}`}
      >
        {children}
      </motion.div>

      {/* Branded Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`hidden lg:flex lg:w-1/2 relative overflow-hidden
          ${'bg-primary'}`}
      >
        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-center bg-slate-950">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8 p-2"
          >
            <BrandLogo styling="h-[100px] w-[180px] " />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={`text-2xl font-bold mb-4 text-background`}
          >
            {isSignIn ? 'Welcome Back!' : 'Join Our Community'}
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className={`text-lg max-w-md text-background/85`}
          >
            {isSignIn
              ? 'Secure access to your Reflectify account. Welcome back to this AI Powered Journal app that helps you reflect on your life, analysing your mood and emotions.'
              : 'Join Reflectify and discover a world of possibilities with this AI Powered Journal app that helps you reflect on your life, analysing your mood and emotions.'}
          </motion.p>

          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10 z-50">
            <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-white" />
            <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-white" />
            <div className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AuthLayout
