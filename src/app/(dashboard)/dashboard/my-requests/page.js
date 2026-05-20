export default function MyRequestsPage() {
 
  const requests = [
    { id: 1, petName: "Luna", breed: "Siamese Cat", status: "Pending", date: "2026-05-18", fee: "BDT 3500" },
    { id: 2, petName: "Milo", breed: "Pug", status: "Approved", date: "2026-05-15", fee: "BDT 5000" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black ">My Adoption Requests</h1>
        <p className="text-sm text-slate-500 font-medium">Track the status of your adoption applications.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase border-b border-slate-200">
                <th className="p-4">Pet Name</th>
                <th className="p-4">Breed</th>
                <th className="p-4">Request Date</th>
                <th className="p-4">Adoption Fee</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700 font-medium divide-y divide-slate-100">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-800">{req.petName}</td>
                  <td className="p-4 text-slate-500">{req.breed}</td>
                  <td className="p-4 text-slate-500">{req.date}</td>
                  <td className="p-4 font-bold">{req.fee}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      req.status === 'Approved' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}