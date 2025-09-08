import { CargoManifest } from "../cargoManifest/CargoManifest";
import { VesselCrew } from "../vesselCrew/VesselCrew";

export type Vessel = {
  arrivalTime: Date | null;
  cargoManifests?: Array<CargoManifest>;
  createdAt: Date;
  departureTime: Date | null;
  destinationPort: string | null;
  id: string;
  name: string | null;
  nationality: string | null;
  portOfOrigin: string | null;
  status: string | null;
  typeField: string | null;
  updatedAt: Date;
  vesselCrews?: Array<VesselCrew>;
};
