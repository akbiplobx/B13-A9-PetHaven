import { Button, Card } from "@heroui/react";

export function PetCareTips() {
  const tips = [
    { 
      title: "Balanced Nutrition", 
      desc: "Always feed age-appropriate, high-quality food and keep fresh water accessible 24/7." 
    },
    { 
      title: "Regular Vet Visits", 
      desc: "Ensure timely vaccinations, deworming, and yearly checkups to keep them disease-free." 
    },
    { 
      title: "Exercise & Play", 
      desc: "Spend at least 30 mins daily playing or walking to keep their mental and physical health sharp." 
    }
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-5">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black tracking-tight mb-2 text-black">
          Essential Pet Care Tips
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Be the best pet parent with these fundamental practices.
        </p>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tips.map((tip, index) => (
          <Card 
            key={index} 
            className="border-t-4 border-t-[#FFA600] bg-white dark:bg-slate-900 border-x-transparent border-b-transparent dark:border-x-slate-800/50 dark:border-b-slate-800/50" 
            shadow="sm"
          >
            <div className="p-6 flex flex-col justify-between h-full gap-4">
              <div>
                <h3 className="text-lg font-bold mb-2 text-black">
                  {tip.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {tip.desc}
                </p>
              </div>
              
              <Button 
                size="sm" 
                variant="light" 
                className="text-[#FFA600] font-bold self-start p-0 min-w-0 bg-transparent"
              >
                Read More →
              </Button>
            </div>
          </Card>
        ))}
      </div>

    </section>
  );
}