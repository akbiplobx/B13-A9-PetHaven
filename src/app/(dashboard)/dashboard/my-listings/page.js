"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from "@heroui/react";
import { motion } from "framer-motion";
import { Eye, Edit3, Users, Trash2, Plus, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { toast } from "react-toastify"; 

import RequestModal from '@/components/RequestModal';
import { authClient } from '@/lib/auth-client'; 

export default function MyListings() {
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePet, setActivePet] = useState(null); 

 
  const getAuthHeaders = async () => {
    const tokenObj = await authClient.token();
    const tokenData = tokenObj?.token || tokenObj?.data?.token || tokenObj;
    
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (tokenData) {
      headers.authorization = `Bearer ${tokenData}`;
    }
    return headers;
  };


  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch('${process.env.NEXT_PUBLIC_SERVER_URL}/my-listings', { 
        method: 'GET',
        headers: headers,
        cache: 'no-store' 
      });

      if (!res.ok) throw new Error("Failed to fetch listings");
      
      const data = await res.json();
      setListings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching my listings:", err);
      setListings([]); 
    } finally {
      setLoading(false); 
    }
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

 
  const handleApprove = async () => {
    if (!activePet) return;
    try {
      const id = activePet._id || activePet.id;
      console.log("Approving request for pet ID:", id);
      
      const headers = await getAuthHeaders();
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/change-status/${id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ status: 'Approved' })
      });

      const data = await res.json();

      if (data.success) {
        setListings(prev => prev.map(item => 
          (item._id || item.id) === id ? { ...item, status: 'approved' } : item
        ));
        setIsModalOpen(false);
        toast.success("Adoption request approved successfully! 🎉");
      } else {
        toast.error(data.message || "Failed to approve request.");
      }
    } catch (error) {
      console.error("Error approving request:", error);
      toast.error("Server error approving request.");
    }
  };

  
  const handleReject = async () => {
    if (!activePet) return;
    try {
      const id = activePet._id || activePet.id;
      console.log("Rejecting request for pet ID:", id);
      
      const headers = await getAuthHeaders();
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/change-status/${id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ status: 'Rejected' })
      });

      const data = await res.json();

      if (data.success) {
        setListings(prev => prev.map(item => 
          (item._id || item.id) === id ? { ...item, status: 'rejected' } : item
        ));
        setIsModalOpen(false);
        toast.warn("Adoption request rejected.");
      } else {
        toast.error(data.message || "Failed to reject request.");
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.error("Server error rejecting request.");
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

  const confirmDeleteToast = (id, petName) => {
    toast.info(
      <div className="flex flex-col gap-2 p-1">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Are you sure you want to delete <span className="text-[#FFA600]">"{petName}"</span>?
        </p>
        <div className="flex justify-end gap-2 mt-2">
          <button 
            onClick={() => toast.dismiss()} 
            className="px-3 py-1.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:opacity-80 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              toast.dismiss();
              proceedToDelete(id);
            }} 
            className="px-3 py-1.5 text-xs font-bold bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-all shadow-sm"
          >
            Yes, Delete
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

 
  const proceedToDelete = async (id) => {
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pet/${id}`, { 
        method: 'DELETE',
        headers: headers
      });
      
      if (res.ok) {
        setListings(listings.filter(item => (item._id || item.id) !== id));
        toast.success("Pet listing deleted successfully! 🗑️");
      } else {
        toast.error("Unauthorized or could not delete from backend.");
      }
    } catch (error) {
      console.error("Error deleting pet:", error);
      toast.error("Something went wrong connecting to server.");
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
          <div className="flex items-center gap-2 text-xs font-bold text-[#FFA600] bg-rose-500/10 px-3 py-1 rounded-full w-max mb-2">
            <LayoutDashboard size={14} /> My Dashboard
          </div>
          <h1 className="text-3xl font-black tracking-tight">
            My <span className="text-[#FFA600]">Listings</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Manage your pet listings and adoption requests.
          </p>
        </div>
        
        <Link href="/dashboard/add-pet">
          <button className="flex items-center justify-center gap-2 bg-[#FFA600] text-white font-bold px-5 py-3 rounded-2xl shadow-lg shadow-rose-500/20 active:scale-[0.98] transition-all text-sm w-full sm:w-auto cursor-pointer">
            <Plus size={18} /> Add New Pet
          </button>
        </Link>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm text-center space-y-1">
          <p className="text-3xl font-black text-[#FFA600]">{totalListings}</p>
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

      {/* Grid */}
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

                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-xl font-extrabold tracking-tight truncate pr-2">
                        {pet.petName || pet.title || "Unnamed Pet"}
                      </h3>
                      <span className="text-[#FFA600] font-extrabold text-base whitespace-nowrap">
                        BDT {pet.adoptionFee || "0"}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {pet.breed || pet.species || "Companion"} • {pet.age || "Age N/A"}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => router.push(`/pet/${petId}`)}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 text-green-600 transition-colors cursor-pointer"
                      >
                        <Eye size={14} /> View
                      </button>
                      
                      <button 
                        onClick={() => router.push(`/dashboard/edit-pet/${petId}`)}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 text-amber-500 hover:text-amber-600 transition-colors cursor-pointer"
                      >
                        <Edit3 size={14} /> Edit
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => {
                          const requestWithUserData = {
                            ...pet,
                            userName: pet.userName || pet.buyerName || "Sabbir Rahman",   
                            email: pet.email || pet.buyerEmail || "sabbir@example.com",
                            pickupDate: pet.pickupDate || "28 May, 2026",
                            status: pet.status || "pending"              
                          };
                          setActivePet(requestWithUserData);    
                          setIsModalOpen(true);  
                        }}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 border border-blue-500/20 rounded-xl text-xs font-bold bg-blue-500/5 hover:bg-blue-500/10 text-blue-500 transition-colors cursor-pointer"
                      >
                        <Users size={14} /> Requests
                      </button>
                      
                      <button 
                        onClick={() => confirmDeleteToast(petId, pet.petName || pet.title || "this pet")}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 border border-rose-500/20 rounded-xl text-xs font-bold bg-rose-500/5 hover:bg-rose-500/10 text-[#FF0000] transition-colors cursor-pointer"
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