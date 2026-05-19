import Link from "next/link";
// npm i react-icons
import { FaPlusCircle, FaList, FaHistory, FaHome } from "react-icons/fa";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      
      
      <div className="w-full md:w-64 bg-slate-800 text-white p-5 space-y-6">
        <div className="text-2xl font-bold text-center border-b border-gray-700 pb-4">
          Pet Adoption
          <span className="block text-xs text-emerald-400 mt-1">User Dashboard</span>
        </div>
        
       
        <nav className="flex flex-col space-y-2">
          <Link 
            href="/dashboard/my-requests" 
            className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-slate-700"
          >
            <FaHistory /> My Requests
          </Link>
          
          <Link 
            href="/dashboard/add-pet" 
            className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-slate-700"
          >
            <FaPlusCircle /> Add Pet
          </Link>
          
          <Link 
            href="/dashboard/my-listings" 
            className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-slate-700"
          >
            <FaList /> My Listings
          </Link>
          
          <div className="border-t border-gray-700 my-4 pt-4"></div>
          
          <Link 
            href="/" 
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <FaHome /> Back to Home
          </Link>
        </nav>
      </div>

      
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
       
        {children}
      </div>
      
    </div>
  );
}