"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Spinner, Input } from "@heroui/react"; 
import { motion } from "framer-motion"; 

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  
  const filteredPets = pets.filter((pet) =>
    (pet.petName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

    const getImagePath = (imagePath) => {
    if (!imagePath) return 'https://placehold.co/600x400?text=No+Image';
    const fileName = imagePath.split('/').pop(); 
    return `/images/${fileName}`; 
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Spinner label="Loading pets..." className="text-[#FFA600]" size="lg" />
        </div>
      </div>
    );
  }

  return (
    <section className="py-16  min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header content and Search input */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <h2 className="text-3xl md:text-4xl font-black ">
            Explore All <span className="text-[#FFA600]">Pets</span>
          </h2>

          <div className="w-full md:max-w-xs">
            <Input
              type="text"
              placeholder="Search by name..."
              variant="bordered"
              radius="xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white shadow-sm font-medium focus-within:!border-[#FFA600]"
            />
          </div>
        </div>

        {/* Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <motion.div 
                key={pet.id}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                whileHover={{ y: -8 }} 
                transition={{ duration: 0.4 }}
                className="rounded-3xl shadow-md overflow-hidden border border-slate-100 flex flex-col hover:shadow-xl transition-shadow cursor-pointer"
              >
                {/* Image Section */}
                <div className="bg-orange-50 h-52 relative overflow-hidden">
                  <img 
                    src={getImagePath(pet.imageUrl)} 
                    alt={pet.petName} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => { 
                      e.target.src = 'https://placehold.co/600x400?text=No+Image'; 
                    }}
                  />
                </div>

                {/* Info Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black text-[#FFA600] uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full">
                      {pet.breed || pet.species}
                    </span>
                    <span className="text-amber-500 font-bold text-sm flex items-center gap-1">
                      BDT {pet.adoptionFee}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold  mb-1">
                    {pet.petName} ({pet.gender})
                  </h3>
                  
                  <p className="text-slate-500 text-sm mb-1 font-medium">
                    <strong>Age:</strong> {pet.age} | <strong>Location:</strong> {pet.location}
                  </p>
                  
                  <p className="text-slate-400 text-xs mb-4 line-clamp-2">
                    {pet.description}
                  </p>
                  
                  {/* Action Button */}
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <Link href={`/pet/${pet.id}`} className="block w-full">
                      <button className="w-full bg-[#FFA600] hover:bg-[#E09200] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md shadow-orange-100">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            // Not Found View
            <div className="col-span-full text-center py-20">
              <p className="text-slate-400 text-xl font-medium italic">
                No furry friends found matching "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllPets;