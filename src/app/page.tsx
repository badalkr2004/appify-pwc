import Image from "next/image";
import cover_image from "../../public/front-page/main-cover-image.jpg";

import { ServiceCard } from "@/components/landing/service-card";
import { HoverInfo } from "@/components/global/hoverInfo";
import { KnowYourGarbageValue } from "@/components/landing/know-your-garbage-value";
import know_your_garbage_value from "../../public/front-page/services/know-your-garbage-value.png";
import ProductCard from "@/components/global/product-card";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { productsList } from "../localDB";
import { services } from "../localDB";

export default function Home() {
  return (
    <div className="flex flex-col items-center ">
      <Image
        src={cover_image}
        alt="hero"
        width={600}
        height={400}
        className="w-5/6 max-w-[600px]"
      />
      <h1 className="text-4xl font-bold text-gray-800 text-center">
        Small Changes - Big Impact
      </h1>
      <p className="w-3/4 text-center mt-3">
        Your small step could lead to a bigger impact for the planets future
      </p>

      {/* services section */}
      <div className="flex flex-col items-center justify-center space-y-4 mt-8">
        <HoverInfo
          text="Our Services"
          description="These are the services provided by us."
        />
        <hr />
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg-grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              imageurl={service.image}
              points={service.points}
              redirecturl={service.redirecturl}
            />
          ))}
        </div>
      </div>
      <br />

      {/* know your garbage value section */}
      <KnowYourGarbageValue
        title="Know Your Garbage Value"
        description="Scan your trash to discover its credit points, value, and how disposing of it benefits the environment and sustainable development."
        imageurl={know_your_garbage_value.src}
        points={services[0].points}
      />

      {/* market section */}
      <div className="flex flex-col items-center justify-center border-t  p-7">
        <br />
        <HoverInfo
          text="Market Place"
          description="These are the products provided by us."
        />
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {productsList.slice(0, 3).map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              href="/market-place"
              image={product.image}
              price={product.price}
              category={product.category}
              InMarket={false}
            />
          ))}
        </div>
        <br />
        <Link href="/market-place">
          <Button>View More</Button>
        </Link>
      </div>
      <br />
      <br />
    </div>
  );
}
