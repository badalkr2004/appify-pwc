"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type customDrawerProps = {
  productName: string;
  productPrice: string;
  productCategory: string;
  productImage: string;
};

export function CustomDrawer({ ...product }: customDrawerProps) {
  const [Quantity, setQuantity] = React.useState(1);

  function onClick(adjustment: number) {
    setQuantity(Math.max(1, Math.min(20, Quantity + adjustment)));
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          Buy Now
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <div className="flex gap-4">
            <Image src={product.productImage} width={100} height={100} alt="" />
            <DrawerHeader>
              <DrawerTitle>{product.productName}</DrawerTitle>
              <DrawerDescription>{product.productCategory}</DrawerDescription>
            </DrawerHeader>
          </div>
          <div className="p-4 pb-0">
            <h3>Quantity</h3>
            <br />
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-1)}
              >
                <Minus />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {Quantity}
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(1)}
              >
                <Plus />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <Button>Purchase</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
