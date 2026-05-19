export default function AddPetPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-800">Add a Pet for Adoption</h1>
        <p className="text-sm text-slate-500 font-medium">Fill in the details to find a loving home for a furry friend.</p>
      </div>

      <form className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Pet Name *</label>
            <input type="text" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl font-medium text-sm focus:outline-none focus:border-[#FFA600]" placeholder="e.g. Buddy" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Breed / Species *</label>
            <input type="text" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl font-medium text-sm focus:outline-none focus:border-[#FFA600]" placeholder="e.g. Persian Cat" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Age *</label>
            <input type="text" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl font-medium text-sm focus:outline-none focus:border-[#FFA600]" placeholder="e.g. 2 years" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Gender *</label>
            <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl font-medium text-sm focus:outline-none focus:border-[#FFA600] bg-white">
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Adoption Fee (BDT) *</label>
            <input type="number" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl font-medium text-sm focus:outline-none focus:border-[#FFA600]" placeholder="e.g. 1500" required />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Location *</label>
          <input type="text" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl font-medium text-sm focus:outline-none focus:border-[#FFA600]" placeholder="e.g. Dhaka, Bangladesh" required />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Description *</label>
          <textarea rows="3" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl font-medium text-sm focus:outline-none focus:border-[#FFA600]" placeholder="Tell us something about the pet's behavior and health..." required></textarea>
        </div>

        <button type="submit" className="w-full bg-[#FFA600] hover:bg-[#E09200] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all">
          Submit Listing
        </button>
      </form>
    </div>
  );
}