export function HowItWorks() {
  const steps = [
    { 
      step: "01", 
      title: "Search", 
      desc: "Browse through our verified listings to find your ideal pet comrade." 
    },
    { 
      step: "02", 
      title: "Connect", 
      desc: "Submit an adoption request and communicate directly with the owner." 
    },
    { 
      step: "03", 
      title: "Adopt", 
      desc: "Complete the easy paperwork and bring your new family member home." 
    }
  ];

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950/40 transition-colors">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* সেকশন হেডার */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black tracking-tight mb-2 text-black">
            How PetHaven Works
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Your journey to adopting a pet made simple in just three steps.
          </p>
        </div>

        {/* স্টেপস গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4">
              <span className="text-5xl font-black text-orange-200 dark:text-slate-800 mb-2">
                {item.step}
              </span>
              <h3 className="text-xl font-bold mb-2 text-black">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}