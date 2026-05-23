"use client";
import React, { useEffect, useState } from 'react';
import { Eye, FileText, Spinner } from 'lucide-react';

export default function MyRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  const userEmail = "akbiplob24@gmail.com"; 

  
  useEffect(() => {
    fetch(`http://localhost:5000/my-requests?email=${userEmail}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load requests");
        return res.json();
      })
      .then((data) => {
        setRequests(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  
  const totalRequests = requests.length;
  const pendingCount = requests.filter(r => r.status?.toLowerCase() === 'pending').length;
  const approvedCount = requests.filter(r => r.status?.toLowerCase() === 'approved').length;
  const rejectedCount = requests.filter(r => r.status?.toLowerCase() === 'rejected').length;

  
  const getStatusBadge = (status = 'Pending') => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === 'approved') return 'bg-emerald-50 text-emerald-600 border border-emerald-200/60';
    if (lowerStatus === 'rejected') return 'bg-rose-50 text-rose-600 border border-rose-200/60';
    return 'bg-amber-50 text-amber-600 border border-amber-200/60';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#FFA600]"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 text-slate-900 dark:text-white">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full w-max mb-2">
          <FileText size={14} /> My Dashboard
        </div>
        <h1 className="text-3xl font-black tracking-tight">
          My <span className="text-rose-500">Adoption Requests</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Track the status of all your adoption requests here.
        </p>
      </div>

      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-xs text-center space-y-1">
          <p className="text-2xl md:text-3xl font-black ">{totalRequests}</p>
          <p className="text-xs md:text-sm font-bold  ">Total</p>
        </div>
        <div className="p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-xs text-center space-y-1">
          <p className="text-2xl md:text-3xl font-black text-amber-500">{pendingCount}</p>
          <p className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400">Pending</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-xs text-center space-y-1">
          <p className="text-2xl md:text-3xl font-black text-emerald-500">{approvedCount}</p>
          <p className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400">Approved</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-xs text-center space-y-1">
          <p className="text-2xl md:text-3xl font-black text-rose-500">{rejectedCount}</p>
          <p className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400">Rejected</p>
        </div>
      </div>

    
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase border-b border-slate-100 dark:border-slate-800">
                <th className="p-4 md:p-5">Pet Name</th>
                <th className="p-4 md:p-5">Request Date</th>
                <th className="p-4 md:p-5">Pickup Date</th>
                <th className="p-4 md:p-5">Status</th>
                <th className="p-4 md:p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700 dark:text-slate-300 font-medium divide-y divide-slate-100 dark:divide-slate-800/60">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-400 font-medium">
                    You haven't made any adoption requests yet.
                  </td>
                </tr>
              ) : (
                requests.map((req) => {
                  const currentStatus = req.status || 'Pending';
                  return (
                    <tr key={req._id || req.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 md:p-5 font-bold text-slate-800 dark:text-slate-200">{req.petName}</td>
                      <td className="p-4 md:p-5 text-slate-500 dark:text-slate-400 text-xs md:text-sm">{req.requestDate || req.date}</td>
                      <td className="p-4 md:p-5 text-slate-500 dark:text-slate-400 text-xs md:text-sm">{req.pickupDate}</td>
                      <td className="p-4 md:p-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${getStatusBadge(currentStatus)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            currentStatus.toLowerCase() === 'approved' ? 'bg-emerald-500' : currentStatus.toLowerCase() === 'rejected' ? 'bg-rose-500' : 'bg-amber-500'
                          }`} />
                          {currentStatus}
                        </span>
                      </td>
                      <td className="p-4 md:p-5 text-right">
                        <button className="inline-flex items-center gap-1.5 py-1.5 px-3 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200">
                          <Eye size={13} /> View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}