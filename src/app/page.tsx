import { NavigationMenuMain } from "@/components/landing/navbar";
import SustainableProducts from "@/components/landing/product";

import Image from "next/image";
import cover_image from "../../public/front-page/main-cover-image.jpg";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start ">
      <div className="p-7">
        <NavigationMenuMain />
      </div>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <Image src={cover_image} alt="hero" width={600} height={400} />
      <SustainableProducts />
    </div>
  );
}
