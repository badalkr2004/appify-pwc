export type GarbageData = {
  _id: string;
  address: string;
  description: string;
  location_latitude: string;
  location_longitude: string;
  date_created: string;
  status: string;
  image: string | null;
  garbage_type: string;
};

export type ImageAnalysis = {
  analysis: {
    productTitle: string;
    treesSaved: number;
    benefitsOfRecycling: string;
    estimatedRecycledValue: number;
    creditPoints: number;
    waterSaved: number;
    typeOfRecycle: string;
  };
};
