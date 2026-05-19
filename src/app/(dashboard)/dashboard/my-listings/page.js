export default function MyListingsPage() {
  
  const listings = [
    { id: 1, petName: "Luna", breed: "Siamese Cat", fee: "BDT 3500", status: "Active" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-800">My Pet Listings</h1>
        <p className="text-sm text-slate-500 font-medium">Manage the pets you have posted for adoption.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listings.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
            <div>
              <span className="text-[10px] font-black bg-green-50 text-green-600 uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                {item.status}
              </span>
              <h3 className="text-lg font-bold text-slate-800 mt-1">{item.petName}</h3>
              <p className="text-xs text-slate-400 font-medium">{item.breed} • {item.fee}</p>
            </div>
            
            <div className="flex gap-2">
              <button className="p-2 bg-slate-50 hover:bg-orange-50 text-slate-500 hover:text-[#FFA600] rounded-xl border border-slate-200 transition-colors">
                <i className="fa-solid fa-pen-to-square text-sm"></i>
              </button>
              <button className="p-2 bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-xl border border-slate-200 transition-colors">
                <i className="fa-solid fa-trash-can text-sm"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}