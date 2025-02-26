import SustainableProducts from "@/components/landing/product";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import cover_image from "../../public/front-page/main-cover-image.jpg"
import { ServiceCard } from "@/components/landing/service-card";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start text-center ">
      
      <Image src={cover_image} alt="hero" width={600} height={400}/>
      <h1 className="text-2xl md:text-4xl font-bold mt-4">Small Impact - Big Impact</h1>
      <p>Every small step can lead to a positive change for our planet's future...</p>

      {/* services section */}
      <div className="flex flex-col items-center justify-center mt-8">
        <h2 className="text-2xl font-bold">Our Services</h2>
        <div className="flex flex-col md:flex-row items-center justify-center mt-4">
          <ServiceCard className="mr-4" title="Request a door-step service" 
          // description="Now request a door-step service by just a few clicks whereever you want to dispose your large and heavy trash, just sit back and relax. our professionals will do that job for you." 
          />
          
        </div>

      <br /><br /><br />
      <SustainableProducts/>
    </div>
  </div>
  );
}
