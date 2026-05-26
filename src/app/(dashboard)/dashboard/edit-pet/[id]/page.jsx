"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Input, Button, TextArea, Spinner } from "@heroui/react";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from "react-toastify"; 
import { authClient } from '@/lib/auth-client'; 

export default function EditPet() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  const [formData, setFormData] = useState({
    petName: '',
    species: '',
    breed: '',
    age: '',
    location: '',
    adoptionFee: '',
    description: '',
    imageUrl: '',
    status: 'available'
  });

  useEffect(() => {
    if (!id) return;

    const fetchPetDetails = async () => {
      try {
        setLoading(true);

       
        const tokenObj = await authClient.token();
        const tokenData = tokenObj?.token || tokenObj?.data?.token || tokenObj;

        const headers = { 'Content-Type': 'application/json' };
        if (tokenData) {
          headers.authorization = `Bearer ${tokenData}`; 
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pet/${id}`, {
          method: 'GET',
          headers: headers
        });

        if (!res.ok) throw new Error("Backend server error");
        
        const data = await res.json();
        if (data) {
          setFormData({
            petName: data.petName || data.title || '',
            species: data.species || '',
            breed: data.breed || '',
            age: data.age || '',
            location: data.location || '',
            adoptionFee: data.adoptionFee || '',
            description: data.description || '',
            imageUrl: data.imageUrl || data.image || '',
            status: data.status || 'available'
          });
        }
      } catch (err) {
        console.error("Error loading pet details:", err);
        toast.error("❌ Failed to load pet details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      
      const tokenObj = await authClient.token();
      const tokenData = tokenObj?.token || tokenObj?.data?.token || tokenObj;

      const headers = { 'Content-Type': 'application/json' };
      if (tokenData) {
        headers.authorization = `Bearer ${tokenData}`; 
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pet/${id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success || data.result?.matchedCount > 0) {
        toast.success("🎉 Pet details updated successfully!");
        router.push('/dashboard/my-listings');
        router.refresh();
      } else {
        toast.warning("⚠️ No changes made. Check database collection.");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error(`❌ Request Failed! Please check if token is valid or server is running.`);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner label="Loading current pet details..." className="text-[#FFA600]" size="lg" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto text-slate-900 dark:text-white transition-colors duration-300">
      
      <button 
        onClick={() => router.back()} 
        className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white mb-6 transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} /> Back to Listings
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-black">Edit <span className="text-[#FFA600]">Pet Info</span></h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Change the fields below to update your pet's profile.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-slate-600 dark:text-slate-400">Pet Name</label>
              <Input name="petName" value={formData.petName} onChange={handleChange} variant="bordered" radius="xl" required />
            </div>
            <div>
              <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-slate-600 dark:text-slate-400">Species</label>
              <Input name="species" value={formData.species} onChange={handleChange} variant="bordered" radius="xl" required />
            </div>
            <div>
              <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-slate-600 dark:text-slate-400">Breed</label>
              <Input name="breed" value={formData.breed} onChange={handleChange} variant="bordered" radius="xl" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-slate-600 dark:text-slate-400">Age</label>
              <Input name="age" value={formData.age} onChange={handleChange} variant="bordered" radius="xl" required />
            </div>
            <div>
              <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-slate-600 dark:text-slate-400">Location</label>
              <Input name="location" value={formData.location} onChange={handleChange} variant="bordered" radius="xl" required />
            </div>
            <div>
              <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-slate-600 dark:text-slate-400">Adoption Fee (BDT)</label>
              <Input type="number" name="adoptionFee" value={formData.adoptionFee} onChange={handleChange} variant="bordered" radius="xl" required />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-slate-600 dark:text-slate-400">Image URL</label>
            <Input name="imageUrl" value={formData.imageUrl} onChange={handleChange} variant="bordered" radius="xl" />
          </div>

          <div>
            <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-slate-600 dark:text-slate-400">Status</label>
            <select 
              name="status"
              value={formData.status} 
              onChange={handleChange}
              className="w-full h-[44px] px-4 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 border-2 border-slate-200 dark:border-slate-800 rounded-xl font-medium focus:outline-none focus:border-[#FFA600] transition-all text-sm cursor-pointer"
            >
              <option value="available">Available </option>
              <option value="adopted">Adopted </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-slate-600 dark:text-slate-400">Description</label>
            <TextArea name="description" value={formData.description} onChange={handleChange} variant="bordered" radius="xl" minRows={4} />
          </div>

          <Button 
            type="submit" 
            isLoading={updating}
            className="w-full bg-[#FFA600] text-white font-black py-4 rounded-xl shadow-lg shadow-orange-500/10 text-sm cursor-pointer"
          >
            {!updating && <Save size={16} className="mr-1" />} Save & Update Changes
          </Button>
        </form>
      </motion.div>
    </div>
  );
}