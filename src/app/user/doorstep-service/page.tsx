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

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const formSchema = z.object({
  image: z.string().url({ message: "Please upload an image." }),

  approxWeight: z.string().min(1, { message: "please enter approx. weight" }),
  address: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." }),
  phone: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." }),
  latitude: z.string().min(1, { message: "Please enter latitude" }),
  longitude: z.string().min(1, { message: "Please enter longitude" }),
});

export default function ImageAnalysisForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadError, setUploadError] = useState<string | null>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      approxWeight: "",
      address: "",
      image: "",
      phone: "",
      latitude: "",
      longitude: "",
    },
  });
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadError(null);

      // Create form data for upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Upload Photo</h3>
          <div className="space-y-4">
            <Input
              type="file"
              accept="image/*"
              className="w-full"
              onChange={handleImageUpload}
              disabled={isUploading}
            />
            {isUploading && (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading...
              </div>
            )}
            {uploadError && (
              <Alert variant="destructive">
                <AlertTitle>Upload Error</AlertTitle>
                <AlertDescription>{uploadError}</AlertDescription>
              </Alert>
            )}
            {imageUrl && (
              <div className="mt-4 relative w-full h-64">
                <Image
                  src={imageUrl}
                  alt="Waste preview"
                  className="rounded-lg object-contain w-full h-full"
                  width={400}
                  height={600}
                />
              </div>
            )}
          </div>
        </div>
        <FormField
          control={form.control}
          name="approxWeight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Approximate Weight (kg)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="border-green-500 focus:ring-green-500"
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="border-green-500 focus:ring-green-500"
                />
              </FormControl>
              <FormDescription>Please provideb your address</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact No.</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="border-green-500 focus:ring-green-500"
                />
              </FormControl>
              <FormDescription>Provide a contact number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700 transition-colors duration-300"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
