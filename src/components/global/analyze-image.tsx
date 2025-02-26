"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { Trees, Droplet, DollarSign, Award } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Leaf } from "lucide-react";
import { ImageAnalysis } from "@/types";

export const formSchema = z.object({
  image: z.instanceof(File).refine((file) => file.size <= 5000000, {
    message: "Image must be less than 5MB.",
  }),
  weight: z
    .string()
    .min(1, { message: "select approximate weight of your waste" }),
  category: z.string().min(1, { message: "Please select a category." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." }),
});

export function ImageAnalysisForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<ImageAnalysis>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: "",
      category: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("category", values.category);
      formData.append("weight", values.weight);
      formData.append("description", values.description);
      const response = await fetch("/api/user/know-your-garbage-value", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to analyze image");
      }

      const resp = await response.json();

      setData(resp);
      setIsOpen(true);
    } catch (error) {
      console.error("Error analyzing image:", error);
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <div className="rounded-md shadow-md border p-7 min-w-[350px] max-w-[600px]">
      <h1 className="font-bold text-xl">Know your garbage value</h1>
      <br />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-green-500 rounded-lg cursor-pointer hover:bg-green-50 transition-colors duration-300"
                    >
                      {imagePreview ? (
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                          width={600}
                          height={400}
                        />
                      ) : (
                        <Upload className="w-8 h-8 text-green-500" />
                      )}
                    </label>
                    {imagePreview && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setImagePreview(null);
                          field.onChange(null);
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </FormControl>
                <FormDescription>
                  Upload an image for analysis (max 5MB).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Approximate Weight (kg)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                    className=""
                  />
                </FormControl>
                <FormDescription>
                  Enter the approximate weight in kilograms.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="plastic">Plastic</SelectItem>
                    <SelectItem value="electronic waste">
                      Electronic waste
                    </SelectItem>
                    <SelectItem value="organic waste">Organic Waste</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the most appropriate category for the image.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} className="" rows={4} />
                </FormControl>
                <FormDescription>
                  Provide a brief description of the image.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-green-500" disabled={isAnalyzing}>
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Submit and Analyze"
            )}
          </Button>
        </form>
      </Form>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-800 flex items-center">
              <Leaf className="mr-2 h-6 w-6 text-green-600" />
              Analyzed Data
            </DialogTitle>
          </DialogHeader>

          <div className="max-w-md h-fit bg-white rounded-lg shadow-lg border border-gray-200">
            {/* Card Header */}
            <div className="p-6 bg-gradient-to-r from-green-400 to-green-700 text-white rounded-t-lg">
              <h2 className="text-xl font-bold">
                {data?.analysis.productTitle}
              </h2>
              <span className="text-sm font-medium mt-1">
                {data?.analysis.typeOfRecycle}
              </span>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-6">
              {/* Trees Saved */}
              <div className="flex items-center space-x-3">
                <Trees className="text-3xl text-green-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Trees Saved</span>
                  <span className="text-lg font-semibold">
                    {data?.analysis.treesSaved}
                  </span>
                </div>
              </div>

              {/* Water Saved */}
              <div className="flex items-center space-x-3">
                <Droplet className="text-3xl text-blue-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Water Saved</span>
                  <span className="text-lg font-semibold">
                    {data?.analysis.waterSaved}
                  </span>
                </div>
              </div>

              {/* Recycling Benefits */}
              <div>
                <span className="text-sm font-medium">
                  Benefits of Recycling
                </span>
                <p className="text-gray-700 text-sm">
                  {data?.analysis.benefitsOfRecycling}
                </p>
              </div>

              {/* Estimated Recycled Value */}
              <div className="flex items-center space-x-3">
                <DollarSign className="text-3xl text-yellow-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    Estimated Recycled Value
                  </span>
                  <span className="text-lg font-semibold">
                    {data?.analysis.estimatedRecycledValue}
                  </span>
                </div>
              </div>

              {/* Credit Points */}
              <div className="flex items-center space-x-3">
                <Award className="text-3xl text-purple-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Credit Points</span>
                  <span className="text-lg font-semibold">
                    {data?.analysis.creditPoints}
                  </span>
                </div>
              </div>

              {/* Dispose Button */}
              <div className="mt-6">
                <Button className="w-full py-3  text-white rounded-md font-semibold">
                  <Link href="/user/doorstep-service">Dispose the item</Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
