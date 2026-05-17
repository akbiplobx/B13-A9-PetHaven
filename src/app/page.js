import FeaturedPets from "@/components/FeaturedPets";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      
      <main className="container mx-auto px-4 md:px-8"> 
        <Hero></Hero>    
        <FeaturedPets></FeaturedPets>          
      </main>
    </>
  );
}