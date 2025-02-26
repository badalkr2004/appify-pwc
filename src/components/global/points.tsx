import { creditPoints } from "@/actions/user";
import { Coins } from "lucide-react";
import React from "react";

const Points = async () => {
  const points = await creditPoints();

  return (
    <div className="flex items-center p-2 bg-green-100 rounded-md cursor-pointer">
      <Coins className=" text-2xl mr-2" />
      <span className="text-base font-semibold">{points.data} Points</span>
    </div>
  );
};

export default Points;
