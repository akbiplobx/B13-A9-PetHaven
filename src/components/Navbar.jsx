"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import { ThemeSwitch } from "./ThemeSwitch";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = authClient.useSession();
  console.log("Session in Navbar:", session);
  
  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div className="border-b px-5 sticky top-0  backdrop-blur-md z-50">
      <nav className="flex justify-between items-center py-4 max-w-7xl mx-auto w-full">
        
        {/* Logo + Website Name */}
        <Link href="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="PetHaven Logo" 
            className="w-15 h-15 object-contain" 
          />
          <h3 className="font-black text-2xl tracking-tighter">
            Pet<span className="text-[#FFA600]">Haven</span>
          </h3>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-semibold ">
          <li><Link href="/" className="hover:text-[#FFA600] transition">Home</Link></li>
          <li><Link href="/allpets" className="hover:text-[#FFA600] transition">All Pets</Link></li>
          
          {/* Private Routes (Only show if logged in) */}
          {/* {session && (
            <>
              <li><Link href="/dashboard/my-requests" className="hover:text-[#FFA600] transition">My Requests</Link></li>
              <li><Link href="/dashboard/add-pet" className="hover:text-[#FFA600] transition">Add Pet</Link></li>
            </>
          )} */}
          
        </ul>
        <div>
 <ThemeSwitch></ThemeSwitch>
</div>

        {/* Auth Condition (Desktop Layout) */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <div className="relative">
              {/* Profile Dropdown Trigger */}
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <img 
                  src={session?.user?.image} 
                  alt="Avatar" 
                  className="w-10 h-10 rounded-full border-2 border-[#FFA600] p-0.5 object-cover cursor-pointer"
                />
                <span className="text-sm font-bold  hidden lg:block">{session.user.name}</span>
              </button>

              {/* Profile Dropdown Content */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-48 bg-white border border-slate-100 rounded-xl shadow-xl py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-slate-50">
                      <p className="text-xs text-slate-400 font-medium">Logged in as</p>
                      <p className="text-xs font-bold text-slate-800 truncate">{session.user.email}</p>
                    </div>

                    
                    <Link 
                      href="/profile" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition font-medium"
                    >
                      Profile
                    </Link>

                    <Link 
                      href="/dashboard" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition font-medium"
                    >
                      Dashboard
                    </Link>
                    <button 
                      onClick={() => { handleSignOut(); setIsDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition font-medium"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                href="/signin" 
                className="text-sm font-bold hover:text-[#FFA600] transition"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="px-6 py-2.5 text-sm font-bold text-white bg-[#FFA600] hover:bg-[#E09200] rounded-full transition shadow-md shadow-orange-100"
              >
                Sign Up
              </Link>
            </div>
          )}
          </div>

        

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-slate-700 focus:outline-none p-2"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu Content with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white border-t"
          >
            <div className="flex flex-col gap-3 p-5">
              <Link href="/" onClick={() => setIsOpen(false)} className="text-slate-700 font-semibold py-2 hover:text-[#FFA600]">Home</Link>
              <Link href="/allpets" onClick={() => setIsOpen(false)} className="text-slate-700 font-semibold py-2 hover:text-[#FFA600]">All Pets</Link>
              
              {session && (
                <>
                  <Link href="/dashboard/my-requests" onClick={() => setIsOpen(false)} className="text-slate-700 font-semibold py-2 hover:text-[#FFA600]">My Requests</Link>
                  <Link href="/dashboard/add-pet" onClick={() => setIsOpen(false)} className="text-slate-700 font-semibold py-2 hover:text-[#FFA600]">Add Pet</Link>
                  
                  
                  <Link href="/profile" onClick={() => setIsOpen(false)} className="text-[#FFA600] font-bold py-2">Profile</Link>
                  
                  <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-slate-700 font-semibold py-2 hover:text-[#FFA600]">Dashboard</Link>
                </>
              )}
              
              <div className="h-[1px] bg-slate-100 my-2"></div>

              {session ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl">
                    <img src={session.user.image} className="w-12 h-12 rounded-full border border-[#FFA600] object-cover" alt="" />
                    <div>
                      <p className="font-bold text-slate-800">{session.user.name}</p>
                      <p className="text-xs text-slate-500 truncate max-w-[180px]">{session.user.email}</p>
                    </div>
                  </div>
                  <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="w-full py-3 text-red-500 font-bold border border-red-100 rounded-xl hover:bg-red-50 transition">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-2">
                  <Link 
                    href="/signin" 
                    onClick={() => setIsOpen(false)} 
                    className="w-full text-center py-3 border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/signup" 
                    onClick={() => setIsOpen(false)} 
                    className="w-full text-center py-3 bg-[#FFA600] text-white rounded-xl font-bold shadow-lg shadow-orange-100"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;