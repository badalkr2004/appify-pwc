import { CalendarIcon } from "lucide-react"
 
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Image from 'next/image'
import app_logo from "../../../public/app-logo.png"

type hoverInfoProps = {
    text : string
    description : string
}
 
export function HoverInfo({...props}: hoverInfoProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="text-xl font-bold underline">{props.text}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
            <Image src={app_logo} alt="logo" width={70} height={50} />
          
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{props.text}</h4>
            <p className="text-sm">
              {props.description}
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}