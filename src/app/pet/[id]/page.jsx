"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Spinner } from "@heroui/react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, DollarSign, Tag, Heart, Info } from 'lucide-react';

export default function PetDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    
    fetch(`http://localhost:5000/pet/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Pet not found");
        return res.json();
      })
      .then((data) => {
        setPet(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pet details:", err);
        setLoading(false);
      });
  }, [id]);

  
  const getImagePath = (imagePath) => {
    if (!imagePath) return 'https://placehold.co/800x600?text=No+Image';
    if (imagePath.startsWith('http')) return imagePath;
    const fileName = imagePath.split('/').pop();
    return `/images/${fileName}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-[#030712]">
        <Spinner label="Loading companion details..." className="text-[#FFA600]" size="lg" />
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50 dark:bg-[#030712] px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-md w-full">
          <div className="w-16 h-16 bg-rose-100 dark:bg-rose-950/40 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Info size={32} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Pet Not Found!</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">We couldn't find the pet you are looking for. It might have been adopted already.</p>
          <button onClick={() => router.push('/allpets')} className="w-full bg-[#FFA600] hover:bg-[#E09200] text-white font-bold py-3 rounded-xl transition-all shadow-md">
            Back to All Pets
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="py-12 min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Back Button */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-[#FFA600] dark:hover:text-[#FFA600] mb-8 transition-colors group"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          Go Back
        </button>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image Section */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm relative group"
            >
              <img 
                src={getImagePath(pet.imageUrl || pet.image)} 
                alt={pet.petName} 
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <span className={`absolute top-6 right-6 text-xs font-black px-4 py-1.5 rounded-full text-white tracking-wider uppercase shadow-md ${pet.status === 'adopted' ? 'bg-rose-500' : 'bg-emerald-500'}`}>
                {pet.status === 'adopted' ? 'Adopted' : 'Available for Adoption'}
              </span>
            </motion.div>
          </div>

          {/* Right Column: Information Section */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white dark:bg-slate-900 p-6 md:p-8 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-6"
            >
              {/* Pet Title & Badges */}
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs font-black text-[#FFA600] uppercase tracking-wider bg-orange-500/10 px-3 py-1 rounded-full flex items-center gap-1">
                    <Tag size={12} /> {pet.breed || pet.species}
                  </span>
                  <span className="text-xs font-black text-purple-500 uppercase tracking-wider bg-purple-500/10 px-3 py-1 rounded-full">
                    {pet.gender}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                  {pet.petName}
                </h1>
              </div>

              <hr className="border-slate-100 dark:border-slate-800" />

              {/* Grid Information Boxes */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Calendar size={14} className="text-blue-500" /> Age
                  </div>
                  <p className="text-base font-black text-slate-800 dark:text-slate-200">{pet.age}</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <MapPin size={14} className="text-rose-500" /> Location
                  </div>
                  <p className="text-base font-black text-slate-800 dark:text-slate-200 truncate">{pet.location}</p>
                </div>
              </div>

              {/* Adoption Fee Card */}
              <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 p-5 rounded-2xl border border-orange-500/20 flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Adoption Fee</h4>
                  <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5">BDT {pet.adoptionFee}</p>
                </div>
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-[#FFA600] shadow-sm border border-orange-500/10">
                  <DollarSign size={24} />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider">About {pet.petName}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {pet.description || "No specific description available for this wonderful pet. Contact us to learn more details about its health, vaccinations, and behavior."}
                </p>
              </div>

              {/* Action Adoption Button */}
              <div className="pt-4">
                <button 
                  disabled={pet.status === 'adopted'} 
                  onClick={() => router.push('/dashboard/my-requests')} 
                  className={`w-full py-4 rounded-2xl text-base font-black transition-all flex items-center justify-center gap-2 text-white ${
                    pet.status === 'adopted' 
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none' 
                      : 'bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 active:scale-[0.99]'
                  }`}
                >
                  <Heart size={20} fill={pet.status === 'adopted' ? 'none' : 'currentColor'} />
                  {pet.status === 'adopted' ? 'Already Adopted' : 'Proceed to Adopt'}
                </button>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </main>
  );
}