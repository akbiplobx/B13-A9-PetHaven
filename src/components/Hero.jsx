"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  return (

    <section className="py-12 lg:py-20 transition-colors duration-300">
      
      <div className="container mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 max-w-7xl">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 dark:text-slate-100 leading-tight"
          >
            Find Your New <br /> 
            <span className="text-[#FFA600] relative inline-block">
              Best Friend
              
              <span className="absolute bottom-1 left-0 w-full h-2 bg-orange-100 dark:bg-orange-950/50 -z-10 rounded"></span>
            </span> Here!
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Every pet deserves a loving home, and every home deserves the joy a pet brings. Browse our shelter records and adopt a healthy, vaccinated friend today.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
          >
            <Link href="/allpets">
              <button className="w-full sm:w-auto bg-[#FFA600] hover:bg-[#E09200] text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-orange-100 dark:shadow-none transition-all duration-300 transform hover:-translate-y-1">
                Adopt Now <i className="fa-solid fa-heart ml-2"></i>
              </button>
            </Link>
            
            <Link href="/#success-stories">
              <button className="w-full sm:w-auto border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 px-8 py-4 rounded-full font-bold transition-all duration-300">
                Success Stories <i className="fa-solid fa-star ml-2 text-[#FFA600]"></i>
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Right Side - Image Section */}
        <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
          
          {/* Main Image Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -15, 0] 
            }}
            transition={{ 
              opacity: { duration: 1 },
              scale: { duration: 1 },
              y: { 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }
            }}
            className="relative z-10 group"
          >
            <img 
              src="/profile.png"  
              alt="Pet Haven Feature" 
              className="w-72 md:w-80 lg:w-[450px] h-[450px] rounded-[40px] shadow-2xl border-4 border-white dark:border-slate-800 object-cover group-hover:border-orange-100 dark:group-hover:border-orange-950 transition-colors duration-300"
            />
            
            
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -left-5 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl dark:shadow-black/40 flex items-center gap-3 border border-slate-50 dark:border-slate-700 select-none"
            >
              <div className="bg-orange-100 dark:bg-orange-950/60 p-2 rounded-xl text-[#FFA600]">
                <i className="fa-solid fa-paw text-xl"></i>
              </div>
              <div className="text-left">
                <p className="text-sm font-black text-slate-800 dark:text-slate-100">100+ Pets</p>
                <p className="text-xs text-slate-400 dark:text-slate-400 font-medium">Adopted this month</p>
              </div>
            </motion.div>
          </motion.div>
          
          
          <div className="absolute top-10 right-10 w-72 h-72 bg-orange-100 dark:bg-orange-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 dark:opacity-30"></div>
          <div className="absolute -bottom-10 left-10 w-64 h-64 bg-amber-100 dark:bg-amber-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 dark:opacity-20"></div>
        </div>

      </div>
    </section>
  );
};

export default Hero;