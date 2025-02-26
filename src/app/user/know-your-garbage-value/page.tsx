import { ImageAnalysisForm } from "@/components/global/analyze-image";
import { Trees, Droplet, DollarSign, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const product = {
  title :"product title",
  category : "recycled"

}

const KnowYourGarbageValue = () => {
  return (
    <div className="flex justify-center gap-4 ">
      <ImageAnalysisForm />
      
    <div className="max-w-md h-fit bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Card Header */}
      <div className="p-6 bg-gradient-to-r from-green-400 to-green-700 text-white rounded-t-lg">
        <h2 className="text-xl font-bold">{product.title}</h2>
        <span className="text-sm font-medium mt-1">{product.category}</span>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-6">
        {/* Trees Saved */}
        <div className="flex items-center space-x-3">
          <Trees className="text-3xl text-green-500" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Trees Saved</span>
            <span className="text-lg font-semibold">5 Trees</span>
          </div>
        </div>

        {/* Water Saved */}
        <div className="flex items-center space-x-3">
          <Droplet className="text-3xl text-blue-500" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Water Saved</span>
            <span className="text-lg font-semibold">1000 Liters</span>
          </div>
        </div>

        {/* Recycling Benefits */}
        <div>
          <span className="text-sm font-medium">Benefits of Recycling</span>
          <p className="text-gray-700 text-sm">
            Recycling helps conserve resources, reduce pollution, and minimize waste. By reusing materials like paper, plastic, and metal, we can lower our carbon footprint and preserve the environment for future generations.
          </p>
        </div>

        {/* Estimated Recycled Value */}
        <div className="flex items-center space-x-3">
          <DollarSign className="text-3xl text-yellow-500" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Estimated Recycled Value</span>
            <span className="text-lg font-semibold">$12.50</span>
          </div>
        </div>

        {/* Credit Points */}
        <div className="flex items-center space-x-3">
          <Award className="text-3xl text-purple-500" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Credit Points</span>
            <span className="text-lg font-semibold">50 Points</span>
          </div>
        </div>

        {/* Dispose Button */}
        <div className="mt-6">
          <Button
            className="w-full py-3  text-white rounded-md font-semibold"
            
          >
            Dispose the item
          </Button>
        </div>
      </div>
    </div>
    </div>
 

  );
};

export default KnowYourGarbageValue;
