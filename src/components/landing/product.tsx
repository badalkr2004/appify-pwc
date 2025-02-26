"use client";
// or remove if you're not in a Next.js app with the app router

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Example style overrides (optional).
// You can also handle these classes in a separate stylesheet or use shadcn/ui's <ThemeProvider>.
export default function SustainableProducts() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      {/* Title & Intro */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-green-500">
          Sustainable Products
        </h1>
        <p className="mt-2 text-gray-300">
          Discover our range of eco-friendly products created from recycled
          materials
        </p>
      </header>

      {/* Cards Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Card 1 */}
        <Card className="bg-neutral-800 border border-neutral-700">
          <CardHeader>
            <CardTitle className="text-xl text-white">
              Recycled Furniture
            </CardTitle>
            <CardDescription className="text-sm text-gray-400">
              Stylish furniture crafted from recycled plastics and wood waste
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              variant="default"
              className="bg-green-600 hover:bg-green-700"
            >
              View Collection
            </Button>
          </CardFooter>
        </Card>

        {/* Card 2 */}
        <Card className="bg-neutral-800 border border-neutral-700">
          <CardHeader>
            <CardTitle className="text-xl text-white">
              Eco Decoratives
            </CardTitle>
            <CardDescription className="text-sm text-gray-400">
              Beautiful home accessories made from recycled materials
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              variant="default"
              className="bg-green-600 hover:bg-green-700"
            >
              View Collection
            </Button>
          </CardFooter>
        </Card>

        {/* Card 3 */}
        <Card className="bg-neutral-800 border border-neutral-700">
          <CardHeader>
            <CardTitle className="text-xl text-white">
              Daily Essentials
            </CardTitle>
            <CardDescription className="text-sm text-gray-400">
              Sustainable everyday items from $29
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              variant="default"
              className="bg-green-600 hover:bg-green-700"
            >
              View Collection
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Custom Solutions */}
      <div className="mt-12">
        <Card className="bg-neutral-800 border border-neutral-700 p-6">
          <CardContent>
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-semibold text-green-500">
                  Custom Solutions
                </h2>
                <p className="mt-1 text-gray-300">
                  Looking for personalized eco-friendly products for your
                  business? We create custom solutions tailored to your needs.
                </p>
                <ul className="mt-2 list-disc pl-5 text-gray-400 text-sm">
                  <li>100% Recycled Materials</li>
                  <li>1000+ Happy Customers</li>
                  <li>50+ Product Variants</li>
                  <li>24/7 Support</li>
                </ul>
              </div>
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700"
              >
                Contact for Custom Orders
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
