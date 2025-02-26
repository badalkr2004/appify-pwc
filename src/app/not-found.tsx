import { Button } from "@/components/ui/button";
import { Trash2, Recycle, ArrowLeft } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Animated Icons */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="animate-bounce delay-100">
            <Trash2 size={48} className="text-green-800" />
          </div>
          <div className="animate-bounce delay-200">
            <Recycle size={48} className="text-green-800" />
          </div>
          <div className="animate-bounce delay-300">
            <Trash2 size={48} className="text-green-800" />
          </div>
        </div>

        {/* Error Number */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-green-800">404</h1>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 rotate-12">
            <div className="bg-green-200 text-green-800 px-4 py-1 rounded-full text-sm font-medium">
              Page Not Found
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-800">
            Oops! Looks like this page got thrown in the wrong bin
          </h2>
          <p className="text-green-700 max-w-md mx-auto">
            Don't worry! Just like proper waste management, we'll help you get
            back on the right track to where you need to go.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Button
            variant="outline"
            className="bg-green-50 text-green-800 border-green-800 hover:bg-green-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <Link href="/">Go Back</Link>
          </Button>

          <Button className="bg-green-800 hover:bg-green-900 text-white">
            <Recycle className="mr-2 h-4 w-4" />
            <Link href="/">Return Home</Link>
          </Button>
        </div>

        {/* Bottom Decoration */}
        <div className="mt-12 text-green-800/20">
          <div className="flex justify-center gap-2">{"♻️".repeat(5)}</div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
