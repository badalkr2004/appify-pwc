import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type CardProps = {
  title: string;
  description?: string;
  imageurl: string;
  points?: string[];
  redirecturl: string;
} & React.ComponentProps<typeof Card>;

export function ServiceCard({ className, ...props }: CardProps) {
  const { title, description, imageurl, points = [], redirecturl } = props;
  return (
    <Card className={cn("w-[380px] h-[600px]", className)} {...props}>
      <Image
        src={imageurl}
        alt="hero"
        width={600}
        height={400}
        className="h-2/4"
      />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description} </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {points.map((point, index) => (
            <div
              key={index}
              className="mb-2 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-green-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{point}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={redirecturl} className="w-full">
          <Button className="w-full">
            <Check /> Explore
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
