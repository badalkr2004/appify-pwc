import { BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import cover_image from "../../../public/front-page/main-cover-image.jpg"

const points = ["Your call has been confirmed.","You have a new message!","Your subscription is expiring soon!"]

type CardProps = React.ComponentProps<typeof Card>
type ServiceCardProps = CardProps & {
  title: string
  description: string
}

export function ServiceCard({ className, ...props}: CardProps) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
        <Image src={cover_image} alt="hero" width={600} height={400}/>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        {/* <CardDescription>{props.description} </CardDescription> */}
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {points.map((point, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {point}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check /> Explore
        </Button>
      </CardFooter>
    </Card>
  )
}
