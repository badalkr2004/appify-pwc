"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import app_logo from "../../../public/app-logo.png"
import Image from "next/image"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Request a Door-Step Service",
    href: "/request-a-door-step-service",
    description:
      "Easily schedule a convenient slot for our professionals to dispose of your heavy and large items such as sofas, fridges, or TVs right from your doorstep.",
  },
  {
    title: "Know your Garbage Value",
    href: "/know-your-garbage-value",
    description:
      "Scan your trash to discover its credit points, value, and how disposing of it benefits the environment and sustainable development.",
  },
  {
    title: "Earn Credit Points",
    href: "/earn-credit-points",
    description:
      "Report scattered trash or garbage and earn credit points upon confirmation of the correct information. Get incentivized for helping keep our environment clean.",
  },
  {
    title: "Buy Recycled Products",
    href: "/market-place",
    description:
      "Browse and purchase a variety of recycled products, from paper cups to handbags, to contribute to a cleaner, greener environment.",
  },
]

export function NavigationMenuMain() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Image src={app_logo} alt="logo" width={70} height={50} />
                    
                    
                    <div className="mb-2 mt-4 text-lg font-medium">
                       Appify PWC
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      A app that helps you to manage your waste and recycle it.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="How it works" >
                This app helps you to dispose your large waste items.
              </ListItem>
              <ListItem href="/" title="Servies">
                Now get services like door step disposal service with some few clicks.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  className=""
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/market-place" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
             Market Place
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
