"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Spinner } from "@heroui/react";
import { motion } from "framer-motion";

const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        const selectedPet = data.find(p => p.id === parseInt(id));
        setPet(selectedPet);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [id]);

  const getImagePath = (imagePath) => {
    if (!imagePath) return 'https://placehold.co/600x400?text=No+Image';
    const fileName = imagePath.split('/').pop(); 
    return `/images/${fileName}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner label="Loading..." className="text-[#FFA600]" size="md" />
      </div>
    );
  }

  if (!isMounted) return null;

  if (!pet) {
    return (
      <div className="min-h-[50vh] flex flex-col justify-center items-center gap-3">
        <p className="text-lg font-bold text-slate-500 italic">Pet not found!</p>
        <Link href="/allpets" className="bg-[#FFA600] text-white px-5 py-2 rounded-xl font-bold text-sm">
          Back to All Pets
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-6">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Back Button */}
        <Link href="/allpets" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-[#FFA600] font-bold text-sm mb-6 transition-colors">
          <i className="fa-solid fa-arrow-left text-xs"></i>
          <span>Back to Explore</span>
        </Link>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left Side: Pet Image */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3 }}
            className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 max-h-[380px]"
          >
            <img 
              src={getImagePath(pet.imageUrl)} 
              alt={pet.petName} 
              className="w-full h-[380px] object-cover"
              onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=No+Image'; }}
            />
          </motion.div>

          {/* Right Side: Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm"
          >
            {/* Tag & Fee */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-[11px] font-black text-[#FFA600] uppercase tracking-wider bg-orange-100/60 px-3 py-1 rounded-full">
                {pet.breed || pet.species || "Siamese"}
              </span>
              <span className="text-base font-black text-slate-800 bg-white border border-slate-100 px-3 py-1 rounded-xl shadow-xs">
                BDT {pet.adoptionFee}
              </span>
            </div>

            {/* Pet Name */}
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-1">
              Meet {pet.petName} <span className="text-slate-400 font-medium text-lg">({pet.gender})</span>
            </h1>

            {/* Badges */}
            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="bg-white p-2.5 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <i className="fa-solid fa-calendar-day text-[#FFA600]"></i>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium leading-none">Age</p>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">{pet.age || "2 years"}</p>
                </div>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <i className="fa-solid fa-location-dot text-[#FFA600]"></i>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium leading-none">Location</p>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">{pet.location || "Chattogram"}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-5">
              <h3 className="text-sm font-bold text-slate-800 mb-1">About {pet.petName}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {pet.description || "Playful and friendly indoor cat."}
              </p>
            </div>

            {/* Perks */}
            <h3 className="text-sm font-bold text-slate-800 mb-2 border-b pb-1">Adoption Perks</h3>
            <ul className="space-y-1.5 mb-5">
              {["Complete Medical & Vaccination Records", "Free Veterinary Health Checkup", "Basic Microchipping Done"].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-slate-600 font-medium text-xs">
                  <i className="fa-solid fa-circle-check text-[#FFA600] text-[10px]"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Action Button */}
            <button className="w-full bg-[#FFA600] hover:bg-[#E09200] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-[0.99]">
              Adopt {pet.petName} Now <i className="fa-solid fa-heart text-xs ml-1"></i>
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default PetDetails;