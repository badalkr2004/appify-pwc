import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeartIcon, PlusIcon } from "lucide-react";
import { CustomDrawer } from "./custom-drawer";

type productCardProps = {
  name: string;
  href: string;
  image: string;
  price: string;
  category: string;
  InMarket: boolean;
};

export default function ProductCard({ ...product }: productCardProps) {
  return (
    <div className="w-[300px] group  space-y-4 border-2 p-2 rounded-md bg-white">
      <figure className="group-hover:opacity-90">
        <Image
          className="w-full rounded-lg aspect-square"
          src={product.image}
          width={300}
          height={500}
          alt={product.name}
          objectFit="cover"
        />
      </figure>
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-bold">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </div>
        <p className="text-lg font-semibold">{product.price}</p>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" size="icon" className="flex-shrink-0">
          <HeartIcon className="size-4" />
        </Button>

        {product.InMarket ? (
          <CustomDrawer productName={product.name} productCategory={product.category} productImage={product.image} productPrice={product.price}/>
        ) : (
          <Link href="/market-place" className="w-full">
            <Button variant="outline" className="w-full bg-slate-200 cursor-pointer">
              <PlusIcon className="size-4 me-1" /> Buy Now
            </Button>{" "}
          </Link>
        )}
      </div>
    </div>
  );
}
