import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-gray-200 ">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          
          {/* 1. Brand Section (Requirement: Logo + Name + Social Links) */}
          <div className="space-y-5">
            <Link href="/" className="flex gap-2 items-center">
              <img 
    src="/logo.png" 
    alt="PetHaven Logo" 
    className="w-15 h-15 object-contain" 
  />
              <h2 className="text-2xl font-extrabold tracking-tight">
                Pet<span className="text-[#FFA600]">Haven</span>
              </h2>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500">
              Connecting beautiful pets with loving families. Find your perfect companion and give them a forever home today.
            </p>

            {/* Social Links (Requirement) */}
            <div className="flex items-center gap-4 text-slate-400">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 hover:bg-[#FFA600] hover:text-white transition-all duration-300 shadow-sm">
                <i className="fa-brands fa-facebook-f text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 hover:bg-[#FFA600] hover:text-white transition-all duration-300 shadow-sm">
                <i className="fa-brands fa-x-twitter text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 hover:bg-[#FFA600] hover:text-white transition-all duration-300 shadow-sm">
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 hover:bg-[#FFA600] hover:text-white transition-all duration-300 shadow-sm">
                <i className="fa-brands fa-linkedin-in text-sm"></i>
              </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-xs font-bold mb-6 uppercase tracking-widest">
              Browse
            </h3>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><Link href="/allpets" className="hover:text-[#FFA600] transition">All Available Pets</Link></li>
              <li><Link href="/#success-stories" className="hover:text-[#FFA600] transition">Success Stories</Link></li>
              <li><Link href="/#pet-care" className="hover:text-[#FFA600] transition">Pet Care Tips</Link></li>
            </ul>
          </div>

          {/* 3. Contact Information (Requirement) */}
          <div>
            <h3 className="text-xs font-bold  mb-6 uppercase tracking-widest">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mt-0.5 text-[#FFA600]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5A2.25 2.25 0 0 1 2.25 17.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5A2.25 2.25 0 0 0 2.25 6.75m19.5 0-8.25 6.75-8.25-6.75" />
                </svg>
                <span>support@pethaven.com</span>
              </li>
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mt-0.5 text-[#FFA600]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* 4. Legal Section */}
          <div>
            <h3 className="text-xs font-bold  mb-6 uppercase tracking-widest">
              Company
            </h3>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><Link href="/about" className="hover:text-[#FFA600] transition">About Us</Link></li>
              <li><Link href="/terms" className="hover:text-[#FFA600] transition">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-[#FFA600] transition">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom (Requirement: Copyright) */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-xs font-medium text-slate-400">
            © {currentYear} <span className="text-slate-800 font-bold">PetHaven</span>. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/terms" className="text-xs text-slate-400 hover:text-[#FFA600] transition">Terms</Link>
            <Link href="/privacy" className="text-xs text-slate-400 hover:text-[#FFA600] transition">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;