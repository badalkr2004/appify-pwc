import paper_cup from  "../public/market-place/paper-cup.jpg";
import hand_bag from "../public/market-place/hand-bag.jpg";
import packing_box from "../public/market-place/packing-box.jpg";

import door_step_service from "../public/front-page/services/door-step service.jpg";
import earn_credit_points from "../public/front-page/services/earn-credit-points.jpg";

export const services = [
    {
      title: "Door Step Service",
      description:
        "Easily schedule a convenient slot for our professionals to dispose of your heavy and large items such as sofas, fridges, or TVs right from your doorstep.",
      image: door_step_service.src,
      points: [
        "Hassle-free booking for large item disposal.",
        "Professional service at your doorstep.",
        "Convenient slots tailored to your schedule.",
      ],
      redirecturl :"/user/doorstep-service"
    },
    {
      title: "Earn Credit Points",
      description:
        "Report scattered trash or garbage and earn credit points upon confirmation of the correct information. Get incentivized for helping keep our environment clean.",
      image: earn_credit_points.src,
      points: [
        "Report scattered trash for credit points.",
        "Earn incentives for verified reports.",
        "Contribute to a cleaner, greener community.",
      ],
      redirecturl : "/user/report-location"
    },
  ];

  export const productsList = [
    {
      name: "Paper Cup",
      image: paper_cup.src,
      price: "15",
      category: "Recycled Paper",
    },
    {
      name: "Hand Bag",
      image: hand_bag.src,
      price: "69",
      category: "Recycled Plastic",
    },
    {
      name: "Packing Box",
      image: packing_box.src,
      price: "35",
      category: "Recycled Paper",
    },
    {
      name: "Paper Cup",
      image: paper_cup.src,
      price: "15",
      category: "Recycled Paper",
    },
    {
      name: "Hand Bag",
      image: hand_bag.src,
      price: "69",
      category: "Recycled Plastic",
    },
    {
      name: "Packing Box",
      image: packing_box.src,
      price: "35",
      category: "Recycled Paper",
    },
    {
      name: "Paper Cup",
      image: paper_cup.src,
      price: "15",
      category: "Recycled Paper",
    },
    {
      name: "Hand Bag",
      image: hand_bag.src,
      price: "69",
      category: "Recycled Plastic",
    },
    {
      name: "Packing Box",
      image: packing_box.src,
      price: "35",
      category: "Recycled Paper",
    },
    
  ];