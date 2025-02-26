import { NavigationMenuMain } from "@/components/landing/navbar";
import SustainableProducts from "@/components/landing/product";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import cover_image from "../../public/front-page/main-cover-image.jpg"


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start ">
      <div className="p-7">
      <NavigationMenuMain/>
      </div>
      <Image src={cover_image} alt="hero" width={600} height={400}/>
      <SustainableProducts/>
      
    </div>
  );
}
