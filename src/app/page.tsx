import SustainableProducts from "@/components/landing/product";

import Image from "next/image";
import cover_image from "../../public/front-page/main-cover-image.jpg";
import door_step_service from "../../public/front-page/services/door-step service.jpg";
import earn_credit_points from "../../public/front-page/services/earn-credit-points.jpg";
import { ServiceCard } from "@/components/landing/service-card";
import { HoverInfo } from "@/components/global/hoverInfo";
import { KnowYourGarbageValue } from "@/components/landing/know-your-garbage-value";
import know_your_garbage_value from "../../public/front-page/services/know-your-garbage-value.jpg";

export default function Home() {
  const services = [
    {
      title: "Door Step Service",
      description:
        "Easily schedule a convenient slot for our professionals to dispose of your heavy and large items such as sofas, fridges, or TVs right from your doorstep.",
      image: door_step_service.src,
      points: [
        "Hassle-free booking for large item disposal.",
        "Professional service at your doorstep.",
        "Convenient slots tailored to your schedule.",
      ],
    },
    {
      title: "Earn Credit Points",
      description:
        "Report scattered trash or garbage and earn credit points upon confirmation of the correct information. Get incentivized for helping keep our environment clean.",
      image: earn_credit_points.src,
      points: [
        "Report scattered trash for credit points.",
        "Earn incentives for verified reports.",
        "Contribute to a cleaner, greener community.",
      ],
    },
  ];
  return (
    <div className="flex flex-col items-center ">
      <Image
        src={cover_image}
        alt="hero"
        width={600}
        height={400}
        className="w-5/6 max-w-[600px]"
      />
      <h1 className="text-4xl font-bold text-gray-800">
        Small Changes - Big Impact
      </h1>
      <p className="w-3/4 text-center mt-3">
        Your small step could lead to a bigger impact for the planet's future
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
            />
          ))}
        </div>
      </div>
      <br />

      {/* know your garbage value section */}
      <KnowYourGarbageValue
        title="Know Your Garbage Value"
        description=""
        imageurl={know_your_garbage_value.src}
        points={services[0].points}
      />

      {/* market section */}
      <div className="flex flex-col items-center justify-center space-y-4 mt-8">
        <h2 className="text-xl font-bold">Market Place</h2>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg-grid-cols-3">
          {/* <ServiceCard title="Sustainable Products" description="new description" imageurl={door_step_service.src} points= {servicesPoints[0] }  />
          <ServiceCard title="Sustainable Products" description="new description" imageurl={door_step_service.src} points= {servicesPoints[0]} />
          <ServiceCard title="Sustainable Products" description="new description" imageurl={door_step_service.src} points= {servicesPoints[0]} /> */}
        </div>
      </div>

      <SustainableProducts />
    </div>
  );
}
