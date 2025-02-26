
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
} & React.ComponentProps<typeof Card>;

export function KnowYourGarbageValue({ className, ...props }: CardProps) {
  const { title, description, imageurl, points = [] } = props;
  return (
    <div className="w-screen  flex flex-col items-center justify-center bg-slate-200">
      <div className=" md:flex p-8 gap-5">
        <Image
          src={imageurl}
          alt="hero"
          width={150}
          height={150}
        />
        <div>
          <h2 className="font-bold text-xl">{title}</h2>
          <p className="max-w-[500px]">{description}</p>
          <br />
          <Link href="/user/know-your-garbage-value" >
          <Button className="w-2/5">Scan Now!</Button>
          </Link>
        </div>
      </div>
      
    </div>
  );
}
