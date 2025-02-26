import SustainableProducts from "@/components/landing/product";

import Image from "next/image";
import cover_image from "../../public/front-page/main-cover-image.jpg";
import { ServiceCard } from "@/components/landing/service-card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start ">
      <div className="p-7"></div>

      <Image src={cover_image} alt="hero" width={600} height={400} />
      <h1 className="text-4xl font-bold text-gray-800">
        Small Changes - Big Impact
      </h1>
      <p>
        Your small step could lead to a bigger impact for the planet's future
      </p>

      {/* services section */}
      <div className="flex flex-col items-center justify-center space-y-4 mt-8">
        <h2 className="text-xl font-bold">Our Services</h2>
        <div className="flex gap-2">
          <ServiceCard title="Sustainable Products" />
          <ServiceCard title="Sustainable Products" />
          <ServiceCard title="Sustainable Products" />
        </div>
      </div>

      <SustainableProducts />
    </div>
  );
}
