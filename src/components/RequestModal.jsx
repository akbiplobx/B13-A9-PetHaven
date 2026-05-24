"use client";
import React, { useEffect, useState } from 'react';
import { Heart, Users, X } from 'lucide-react';

export default function RequestModal({ isOpen, onClose, pet }) {
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const petId = pet?._id || pet?.id;
  const petName = pet?.petName || pet?.title || "Pet";

  useEffect(() => {
    if (!isOpen || !petId) return;

    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/my-requests?petId=${petId}`);
        const data = await res.json();
        setAdoptionRequests(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setAdoptionRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [isOpen, petId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
      />
      
     
      <div className="bg-white dark:bg-slate-900 w-full max-w-[400px] rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 relative z-10 text-left animate-in fade-in zoom-in-95 duration-200">
        
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X size={18} />
        </button>

        
        <div className="flex gap-2 items-center text-slate-800 dark:text-white text-lg font-black pb-3 border-b border-slate-100 dark:border-slate-800/60">
          <Users size={20} className="text-rose-500" />
          <h2>Adoption Requests for {petName}</h2>
        </div>
        
        
        <div className="py-4 flex flex-col items-center justify-center text-center">
          {loading ? (
            <div className="py-6 flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-bold text-slate-400">Checking requests...</p>
            </div>
          ) : adoptionRequests.length === 0 ? (
            
            
            <div className="flex flex-col items-center justify-center py-6 space-y-3">
              <div className="text-slate-300 dark:text-slate-600">
                <Heart size={64} className="stroke-[1.5]" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-wide">
                No requests yet for {petName}
              </p>
            </div>

          ) : (
            
           
            <div className="w-full max-h-[280px] overflow-y-auto space-y-3 text-left pr-1">
              {adoptionRequests.map((req, index) => (
                <div key={req._id || index} className="p-4 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-800/20 hover:border-blue-500/10 transition-all">
                  <p className="text-sm font-extrabold text-slate-800 dark:text-white">{req.buyerName || "Unknown User"}</p>
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5">{req.buyerEmail || "No Email"}</p>
                  
                  <div className="flex justify-between items-center mt-2.5 text-[11px] font-bold text-slate-400">
                    <span>Date: {req.requestDate || "N/A"}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-black tracking-wider ${req.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' : req.status === 'Rejected' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'}`}>
                      {req.status || "Pending"}
                    </span>
                  </div>

                  {req.message && (
                    <p className="text-xs mt-3 leading-relaxed text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60 italic shadow-sm">
                      "{req.message}"
                    </p>
                  )}
                </div>
              ))}
            </div>

          )}
        </div>
      </div>
    </div>
  );
}