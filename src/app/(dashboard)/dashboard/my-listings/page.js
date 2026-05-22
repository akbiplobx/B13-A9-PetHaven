"use client";

import { useEffect, useState } from "react";

export default function MyListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-listings`);
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyListings();
  }, []);

  if (loading) {
    return <div className="p-5 font-medium text-slate-500">Loading your pet listings...</div>;
  }

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black ">My Pet Listings</h1>
        <p className="text-sm text-slate-500 font-medium">Manage the pets you have posted for adoption.</p>
      </div>

      {listings.length === 0 ? (
        <div className="text-slate-500 font-medium p-5 border border-dashed border-slate-300 rounded-2xl text-center">
          No pets posted yet. Go to "Add Pet" to post one!
        </div>
      ) : (
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div 
              key={item._id} 
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between gap-4"
            >
            
              <div className="flex gap-4 items-center">
                
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.petName} 
                    className="w-20 h-20 object-cover rounded-xl border border-slate-100 flex-shrink-0"
                  />
                ) : (
                  <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-xs flex-shrink-0">
                    No Image
                  </div>
                )}
                
                <div className="space-y-0.5 min-w-0">
                 
                  <div className="flex flex-wrap gap-1">
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      item.gender === "Male" ? "bg-blue-50 text-blue-600" : "bg-pink-50 text-pink-600"
                    }`}>
                      {item.gender}
                    </span>
                    <span className="text-[9px] font-black bg-purple-50 text-purple-600 uppercase tracking-wider px-2 py-0.5 rounded-full truncate">
                      {item.species || "Pet"}
                    </span>
                  </div>
                  
                 
                  <h3 className="text-lg font-bold text-slate-800 leading-tight truncate">{item.petName}</h3>
                  
                 
                  <p className="text-xs text-slate-500 font-medium truncate">
                    {item.breed} • {item.age} {parseInt(item.age) > 1 ? "Years" : "Year/Month"}
                  </p>
                  
                 
                  <p className="text-xs font-bold text-[#FFA600] truncate">
                    BDT {item.adoptionFee} <span className="text-slate-400 font-normal ml-0.5">({item.location})</span>
                  </p>
                </div>
              </div>
              
              
              <div className="flex gap-2 border-t border-slate-100 pt-3 justify-end mt-auto">
                <button 
                  onClick={() => console.log("Edit ID:", item._id)} 
                  className="p-2 bg-slate-50 hover:bg-orange-50 text-slate-500 hover:text-[#FFA600] rounded-xl border border-slate-200 transition-colors"
                  title="Edit"
                >
                  <i className="fa-solid fa-pen-to-square text-sm"></i>
                </button>
                <button 
                  onClick={() => console.log("Delete ID:", item._id)} 
                  className="p-2 bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-xl border border-slate-200 transition-colors"
                  title="Delete"
                >
                  <i className="fa-solid fa-trash-can text-sm"></i>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}