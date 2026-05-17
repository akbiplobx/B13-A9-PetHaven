"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Spinner } from "@heroui/react"; 
import { motion } from "framer-motion"; 

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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800">
            Meet Our <span className="text-[#FFA600]">Featured Pets</span>
          </h2>
          <p className="text-slate-500 mt-2">Lovable friends waiting for a new home!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pets.map((pet, index) => {
            
            const localImagePath = `/images/p${index + 1}.png`;

            return (
              <motion.div 
                key={pet.id}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  type: "spring", 
                  stiffness: 80, 
                  damping: 15,
                  duration: 0.6 
                }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02, 
                  rotate: 1.5, 
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-3xl shadow-md overflow-hidden border border-slate-100 flex flex-col hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Pet Image */}
                <div className="bg-orange-50 h-52 relative overflow-hidden">
                  <img 
                    src={localImagePath} 
                    alt={pet.title || pet.name} 
                    className="absolute inset-0 w-full h-full object-cover"
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
                      <button className="w-full bg-[#FFA600] hover:bg-[#E09200] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md shadow-orange-100">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}