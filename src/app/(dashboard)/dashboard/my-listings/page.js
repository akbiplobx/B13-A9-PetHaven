"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from "@heroui/react";
import { motion } from "framer-motion";
import { Eye, Edit3, Users, Trash2, Plus, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

import RequestModal from '@/components/RequestModal';

export default function MyListings() {
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePet, setActivePet] = useState(null); 

  // রিকোয়েস্ট ডাটা ফেচ করার ফাংশন
  const fetchListings = useCallback(() => {
    setLoading(true);
    fetch('http://localhost:5000/my-listings', { cache: 'no-store' }) 
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch listings");
        return res.json();
      })
      .then((data) => {
        setListings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching my listings:", err);
        setListings([]); 
        setLoading(false); 
      });
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  // Approve অ্যাকশন হ্যান্ডেলার
  const handleApprove = async () => {
    if (!activePet) return;
    try {
      const id = activePet._id || activePet.id;
      console.log("Approving request for pet ID:", id);
      
      // লোকাল স্টেট আপডেট (status 'approved' করে দেওয়া হচ্ছে)
      setListings(prev => prev.map(item => 
        (item._id || item.id) === id ? { ...item, status: 'approved' } : item
      ));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  // Reject অ্যাকশন হ্যান্ডেলার
  const handleReject = async () => {
    if (!activePet) return;
    try {
      const id = activePet._id || activePet.id;
      console.log("Rejecting request for pet ID:", id);
      
      // লোকাল স্টেট আপডেট (status 'rejected' করে দেওয়া হচ্ছে)
      setListings(prev => prev.map(item => 
        (item._id || item.id) === id ? { ...item, status: 'rejected' } : item
      ));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const totalListings = listings.length;
  const availableCount = listings.filter(pet => pet.status !== 'Adopted' && pet.status !== 'adopted').length;
  const adoptedCount = listings.filter(pet => pet.status === 'Adopted' || pet.status === 'adopted').length;

  const getImagePath = (imagePath) => {
    if (!imagePath) {
      return 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop';
    }
    if (imagePath.startsWith('http') || imagePath.startsWith('data:image')) return imagePath;
    const fileName = imagePath.split('/').pop();
    return `/images/${fileName}`;
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this pet listing?")) {
      try {
        const res = await fetch(`http://localhost:5000/pet/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setListings(listings.filter(item => (item._id || item.id) !== id));
        } else {
          alert("Could not delete from backend.");
        }
      } catch (error) {
        console.error("Error deleting pet:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner label="Loading your listings..." className="text-[#FFA600]" size="lg" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 bg-transparent text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full w-max mb-2">
            <LayoutDashboard size={14} /> My Dashboard
          </div>
          <h1 className="text-3xl font-black tracking-tight">
            My <span className="text-rose-500">Listings</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Manage your pet listings and adoption requests.
          </p>
        </div>
        
        <Link href="/dashboard/add-pet">
          <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold px-5 py-3 rounded-2xl shadow-lg shadow-rose-500/20 active:scale-[0.98] transition-all text-sm w-full sm:w-auto">
            <Plus size={18} /> Add New Pet
          </button>
        </Link>
      </div>

      {/* Analytics Counter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm text-center space-y-1">
          <p className="text-3xl font-black text-rose-500">{totalListings}</p>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Total Listings</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm text-center space-y-1">
          <p className="text-3xl font-black text-emerald-500">{availableCount}</p>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Available</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm text-center space-y-1">
          <p className="text-3xl font-black text-blue-500">{adoptedCount}</p>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Adopted</p>
        </div>
      </div>

      {/* Listings Grid */}
      {listings.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80">
          <p className="text-slate-400 font-medium">No listings found. Start by adding a pet!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((pet) => {
            const petId = pet._id || pet.id;
            const currentStatus = (pet.status || 'available').toLowerCase();
            const isAdopted = currentStatus === 'adopted' || currentStatus === 'approved';

            return (
              <motion.div
                key={petId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm flex flex-col group hover:shadow-md transition-all duration-300"
              >
                {/* Image Holder */}
                <div className="h-48 bg-slate-100 dark:bg-slate-950 relative overflow-hidden">
                  <img
                    src={getImagePath(pet.imageUrl || pet.image)}
                    alt={pet.petName || "Pet"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop';
                    }}
                  />
                  <span className={`absolute top-4 right-4 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full text-white shadow-sm ${isAdopted ? 'bg-rose-500' : 'bg-emerald-500'}`}>
                    {isAdopted ? 'Adopted' : 'Available'}
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-xl font-extrabold tracking-tight truncate pr-2">
                        {pet.petName || pet.title || "Unnamed Pet"}
                      </h3>
                      <span className="text-rose-500 font-extrabold text-base whitespace-nowrap">
                        BDT {pet.adoptionFee || "0"}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {pet.breed || pet.species || "Companion"} • {pet.age || "Age N/A"}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => router.push(`/pet/${petId}`)}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Eye size={14} /> View
                      </button>
                      
                      <button 
                        onClick={() => router.push(`/dashboard/edit-pet/${petId}`)}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 text-amber-500 hover:text-amber-600 transition-colors"
                      >
                        <Edit3 size={14} /> Edit
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      
                      <button 
                        onClick={() => {
                          const requestWithUserData = {
                            ...pet,
                            userName: pet.userName || "Sabbir Rahman",   
                            email: pet.email || "sabbir@example.com",
                            pickupDate: pet.pickupDate || "28 May, 2026",
                            status: pet.status || "pending"              
                          };
                          setActivePet(requestWithUserData);    
                          setIsModalOpen(true);  
                        }}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 border border-blue-500/20 rounded-xl text-xs font-bold bg-blue-500/5 hover:bg-blue-500/10 text-blue-500 transition-colors"
                      >
                        <Users size={14} /> Requests
                      </button>
                      <button 
                        onClick={() => handleDelete(petId)}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 border border-rose-500/20 rounded-xl text-xs font-bold bg-rose-500/5 hover:bg-rose-500/10 text-rose-500 transition-colors"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      )}
      
      
      {isModalOpen && activePet && (
        <RequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          requestData={activePet}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}