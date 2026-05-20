"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Spinner } from "@heroui/react"; 
import { motion } from "framer-motion"; 


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, 
    },
  },
};


const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 70, 
      damping: 14 
    }
  }
};

export default function FeaturedPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); 
    setLoading(true);
    
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        setPets(data.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading local data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner label="Loading featured pets..." className="text-[#FFA600]" size="lg" />
      </div>
    );
  }

  if (!isMounted) {
    return null;
  }

  return (
    <section className="py-16  overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black">
            Meet Our <span className="text-[#FFA600]">Featured Pets</span>
          </h2>
          <p className="text-slate-500 mt-2">Lovable friends waiting for a new home!</p>
        </div>

      
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {pets.map((pet, index) => {
            const localImagePath = `/images/p${index + 1}.png`;

            return (
              <motion.div 
                key={pet.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -10, 
                  scale: 1.01,
                  boxShadow: "0px 20px 30px rgba(255, 166, 0, 0.15)", // হালকা অরেঞ্জ শ্যাডো
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                whileTap={{ scale: 0.78 }}
                className=" rounded-3xl shadow-md overflow-hidden border border-slate-100 flex flex-col hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Pet Image */}
                <div className="bg-orange-50 h-52 relative overflow-hidden group">
                  <motion.img 
                    src={localImagePath} 
                    alt={pet.title || pet.name} 
                    className="absolute inset-0 w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }} 
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    onError={(e) => { 
                      e.target.src = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=500"; 
                    }}
                  />
                </div>

                {/* Pet Info */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black text-[#FFA600] uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full">
                      {pet.category || pet.breed || "Pet"}
                    </span>
                    <span className="text-amber-500 font-bold text-sm">
                      ⭐ {pet.rating || "4.8"}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-1">
                    {pet.title || pet.name}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4 font-medium">
                    {pet.location || pet.instructor || "Healthy"}
                  </p>
                  
                  {/* View Details Button */}
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <Link href={`/pet/${pet.id}`} className="block w-full">
                      <motion.button 
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-[#FFA600] hover:bg-[#E09200] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md shadow-orange-100"
                      >
                        View Details
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}