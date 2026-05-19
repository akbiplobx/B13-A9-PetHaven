import { Card } from "@heroui/react";
import { FaHeart, FaHome, FaSmile } from "react-icons/fa";

export function WhyAdopt() {
  const reasons = [
    {
      icon: <FaHeart className="text-red-500 text-3xl" />,
      title: "Save a Life",
      desc: "Millions of animals need a home every year. Adopting gives them a second chance at life."
    },
    {
      icon: <FaHome className="text-blue-500 text-3xl" />,
      title: "Stop Pet Mills",
      desc: "By adopting, you say NO to cruel breeding practices and support animal welfare."
    },
    {
      icon: <FaSmile className="text-amber-500 text-3xl" />,
      title: "Unconditional Love",
      desc: "Rescued pets are incredibly grateful and bring immense joy and loyalty to your family."
    }
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-5">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black tracking-tight mb-2 text-slate-800 dark:text-white">
          Why Adopt Pets?
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Choosing adoption changes world for a furry friend.
        </p>
      </div>

      {/* Reasons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reasons.map((item, index) => (
          <Card key={index} className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900" shadow="sm">
            
            {/* CardBody এর পরিবর্তে সাধারণ div এবং প্রোপার্টি ব্যবহার করা হয়েছে */}
            <div className="p-6 flex flex-col items-center text-center gap-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-full">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>

          </Card>
        ))}
      </div>

    </section>
  );
}