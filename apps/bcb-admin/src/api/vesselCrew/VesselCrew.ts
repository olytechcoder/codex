import { Vessel } from "../vessel/Vessel";

export type VesselCrew = {
  createdAt: Date;
  firstName: string | null;
  id: string;
  lastName: string | null;
  nationality: string | null;
  passportNumber: string | null;
  role: string | null;
  updatedAt: Date;
  vessel?: Vessel | null;
  visaStatus: string | null;
};
