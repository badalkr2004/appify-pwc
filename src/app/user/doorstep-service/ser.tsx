"use client";
import { reportGarbage } from "@/actions/user";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Check, Loader2, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Location {
  lat: number;
  lng: number;
}

const DoorStepService = () => {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState<Location | null>(null);
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [phone, setPhone] = useState("");
  //   const [reportStatus, setReportStatus] = useState('pending');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Cloudinary configuration

  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

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
      setStep(2);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmitReport = async () => {
    try {
      const body = {
        location_latitude: String(location?.lat),
        location_longitude: String(location?.lng),
        garbage_type: "plastic",
        image: imageUrl,
        description: description,
        status: "pending",
      };

      await reportGarbage({
        description: body.description,
        locationLatitude: body.location_latitude,
        locationLongitude: body.location_longitude,
        garbageType: "plastic",
        image: body.image,
        status: "pending",
      });
      setStep(4);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
            Report Waste Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`mb-6 ${step !== 1 && "opacity-50"}`}>
            <h3 className="text-lg font-semibold mb-3"> Upload Photo</h3>
            <div className="space-y-4">
              <Input
                type="file"
                accept="image/*"
                className="w-full"
                onChange={handleImageUpload}
                disabled={step !== 1 || isUploading}
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

          <div className={`mb-6 ${step !== 2 && "opacity-50"}`}>
            <h3 className="text-lg font-semibold mb-3">
              Share Location (Optional)
            </h3>
            <div className="space-y-4">
              <Button
                onClick={handleLocationDetect}
                className="w-full flex items-center bg-green-600 hover:bg-green-800 justify-center gap-2"
                disabled={step !== 2}
              >
                <MapPin className="h-4 w-4" />
                Detect My Location
              </Button>
              {location && (
                <Alert>
                  <AlertTitle>Location Detected</AlertTitle>
                  <AlertDescription>
                    Coordinates: {location.lat.toFixed(4)},{" "}
                    {location.lng.toFixed(4)}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          <div className={`mb-6 ${step !== 2 && "opacity-50"}`}>
            <h3 className="text-lg font-semibold mb-3">Address</h3>
            <textarea
              className="w-full p-2 border rounded-md"
              rows={4}
              placeholder="Add Pickup Address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              disabled={step !== 2}
            />
          </div>
          <div className={`mb-6 ${step !== 2 && "opacity-50"}`}>
            <h3 className="text-lg font-semibold mb-3">Phone</h3>
            <Input
              className="w-full p-2 border rounded-md"
              placeholder="Phone number..."
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              disabled={step !== 2}
            />

            <Button
              onClick={handleSubmitReport}
              className="w-full mt-4 bg-green-600 hover:bg-green-800"
            >
              Submit Report
            </Button>
          </div>

          {step === 4 && (
            <Alert className="bg-green-50">
              <Check className="h-4 w-4 text-green-500" />
              <AlertTitle>Thank You!</AlertTitle>
              <AlertDescription>
                Your report has been submitted successfully. The waste
                management team will handle it soon. Your contribution helps
                keep our city clean!
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between px-2">
        {[1, 2, 3, 4].map((stepNumber) => (
          <div
            key={stepNumber}
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              stepNumber <= step ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            {stepNumber}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoorStepService;
