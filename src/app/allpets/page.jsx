"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';
import { Spinner, Input } from "@heroui/react"; 
import { motion } from "framer-motion"; 

const AllPets = () => {
  const router = useRouter();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("All Species");
  const [sortBy, setSortBy] = useState("default");

  
  const fetchPetsFromDatabase = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        search: searchTerm,
        species: selectedSpecies,
        sort: sortBy
      });

      const res = await fetch(`http://localhost:5000/pets?${queryParams.toString()}`);
      const data = await res.json();
      setPets(data);
    } catch (err) {
      console.error("Database fetching error:", err);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchPetsFromDatabase();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, selectedSpecies, sortBy]);

  
  const getImagePath = (imagePath) => {
    if (!imagePath) return 'https://placehold.co/600x400?text=No+Image';
    if (imagePath.startsWith('http')) return imagePath; 
    const fileName = imagePath.split('/').pop(); 
    return `/images/${fileName}`; 
  };

  return (
    <section className="py-16 min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        
        
        <div className="mb-6">
          <span className="text-xs font-bold text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
            All Available Pets
          </span>
          <h2 className="text-3xl md:text-5xl font-black mt-3">
            Browse <span className="text-[#FFA600]">All Pets</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-400 text-sm mt-2 font-medium">{pets.length} pets available for adoption</p>
        </div>

        {/* 🔍 Filter & Search Bar Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm mb-12 transition-colors duration-300">
          
  {/* Search Input */}
  <div className="flex flex-col justify-end">
    <label className="block font-black text-xs text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
      Search by name
    </label>
    <Input
      type="text"
      placeholder="Search pets..."
      variant="bordered"
      radius="xl"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full "
      classNames={{
        inputWrapper: "border-2 hover:border-slate-300 focus-within:!border-[#FFA600] dark:border-slate-800 dark:hover:border-slate-700 transition-all h-[44px]",
        input: "font-medium text-sm"
      }}
    />
  </div>

  {/* Filter by Species */}
  <div>
    <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
      Filter by species
    </label>
    <div className="relative">
      <select 
        value={selectedSpecies}
        onChange={(e) => setSelectedSpecies(e.target.value)}
        className="w-full h-[44px] px-4 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 border-2 border-slate-200 dark:border-slate-800 rounded-xl font-medium focus:outline-none focus:border-[#FFA600] dark:focus:border-[#FFA600] transition-all cursor-pointer appearance-none text-sm"
      >
        <option value="All Species" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">All Species</option>
        <option value="Dog" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Dog</option>
        <option value="Cat" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Cat</option>
        <option value="Bird" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Bird</option>
        <option value="Rabbit" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Rabbit</option>
        <option value="Turtle" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Turtle</option>
        <option value="Guinea Pig" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Guinea Pig</option>
      </select>
      {/* Custom Dropdown Arrow Icon */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 dark:text-slate-400">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  </div>

  {/* Sort Options */}
  <div>
    <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
      Sort by fee
    </label>
    <div className="relative">
      <select 
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full h-[44px] px-4 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 border-2 border-slate-200 dark:border-slate-800 rounded-xl font-medium focus:outline-none focus:border-[#FFA600] dark:focus:border-[#FFA600] transition-all cursor-pointer appearance-none text-sm"
      >
        <option value="default" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Default</option>
        <option value="lowToHigh" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Price: Low to High</option>
        <option value="highToLow" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Price: High to Low</option>
      </select>
      {/* Custom Dropdown Arrow Icon */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 dark:text-slate-400">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  </div>

</div>

        {/* Grid System / Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <Spinner label="Fetching from database..." className="text-[#FFA600]" size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pets.length > 0 ? (
              pets.map((pet) => {
                
                const petId = pet._id || pet.id;
                
                return (
                  <motion.div 
                    key={petId} 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    whileHover={{ y: -8 }} 
                    transition={{ duration: 0.4 }}
                    onClick={() => router.push(`/pet/${petId}`)} // 👈 কার্ডে ক্লিক করলে সেফ আইডি দিয়ে যাবে
                    className="rounded-3xl shadow-md overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 flex flex-col hover:shadow-xl transition-all cursor-pointer"
                  >
                    {/* Image Section */}
                    <div className="bg-slate-100 dark:bg-slate-800 h-52 relative overflow-hidden">
                      <img 
                        src={getImagePath(pet.imageUrl)} 
                        alt={pet.petName} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        onError={(e) => { 
                          e.target.src = 'https://placehold.co/600x400?text=No+Image'; 
                        }}
                      />
                      <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full text-white ${pet.status === 'adopted' ? 'bg-rose-500/90' : 'bg-emerald-500/90'}`}>
                        {pet.status === 'adopted' ? 'Adopted' : 'Available'}
                      </span>
                    </div>

                    {/* Info Content Section */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-black text-[#FFA600] uppercase tracking-wider bg-orange-500/10 dark:bg-orange-50/10 px-3 py-1 rounded-full">
                          {pet.breed || pet.species}
                        </span>
                        <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">
                          BDT {pet.adoptionFee}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-1 ">
                        {pet.petName} ({pet.gender})
                      </h3>
                      
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-1 font-medium">
                        <strong className="text-slate-800 dark:text-slate-400">Age:</strong> {pet.age} | <strong className="text-slate-800 dark:text-slate-400">Location:</strong> {pet.location}
                      </p>
                      
                      <p className="text-slate-500 dark:text-slate-400 text-xs mb-4 line-clamp-2">
                        {pet.description}
                      </p>
                      
                      {/* Action Buttons */}
                      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-2" onClick={(e) => e.stopPropagation()}>
                        
                        {/* View Details Button */}
                        <Link href={`/pet/${petId}`} className="flex-1">
                          <button className="w-full bg-[#FFA600] hover:bg-[#E09200] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm捷">
                            View Details
                          </button>
                        </Link>
                        
                        {/* Adopt Now Button */}
                        <button 
                          disabled={pet.status === 'adopted'} 
                          onClick={() => router.push('/dashboard/my-requests')} 
                          className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-bold transition-all text-white ${
                            pet.status === 'adopted' 
                              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none' 
                              : 'bg-emerald-500 hover:bg-emerald-600 shadow-md shadow-emerald-500/20'
                          }`}
                        >
                          {pet.status === 'adopted' ? 'Adopted' : 'Adopt Now'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              /* Not Found View */
              <div className="col-span-full text-center py-20">
                <p className="text-slate-500 dark:text-slate-400 text-xl font-medium italic">
                  No furry friends found matching your criteria.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllPets;