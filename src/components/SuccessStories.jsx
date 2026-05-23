import { Avatar, Card } from "@heroui/react";

export function SuccessStories() {
  const stories = [
    {
      name: "Afsana Mimi",
      role: "Adopted Bella (Cat)",
      img: "/images/a1.png",
      text: "Bella has completely changed our home! The adoption process on PetHaven was super smooth and transparent."
    },
    {
      name: "Tanvir Rahman",
      role: "Adopted Rocky (Dog)",
      img: "/images/a2.png",
      text: "Finding Rocky was a blessing. He is healthy, playful, and the listing details matched perfectly with reality."
    }
  ];

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950/40 transition-colors">
      <div className="max-w-7xl mx-auto px-5">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black tracking-tight mb-2 text-black">
            Happy Tails (Success Stories)
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            See how these lovely pets found their forever homes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <Card key={index} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800" shadow="sm">
              <div className="flex flex-col gap-4 p-6">
                <p className="italic text-slate-600 dark:text-slate-300">
                  "{story.text}"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar src={story.img} size="md" className="border border-[#FFA600]" />
                  <div>
                    <h4 className="font-bold text-sm text-black">
                      {story.name}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium">
                      {story.role}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}