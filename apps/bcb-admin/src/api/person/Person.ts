import { LandVehicle } from "../landVehicle/LandVehicle";

export type Person = {
  createdAt: Date;
  firstName: string | null;
  id: string;
  idNumber: string | null;
  landVehicle?: LandVehicle | null;
  lastName: string | null;
  nationality: string | null;
  passportNumber: string | null;
  updatedAt: Date;
  visaStatus: string | null;
};
