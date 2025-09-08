import { LandVehicle } from "../landVehicle/LandVehicle";

export type GoodsDeclaration = {
  createdAt: Date;
  customsStatus: string | null;
  declarationNumber: string | null;
  description: string | null;
  id: string;
  landVehicle?: LandVehicle | null;
  ownerName: string | null;
  updatedAt: Date;
  value: number | null;
};
