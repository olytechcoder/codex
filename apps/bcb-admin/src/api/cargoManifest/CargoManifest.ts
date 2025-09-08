import { Vessel } from "../vessel/Vessel";

export type CargoManifest = {
  cargoDescription: string | null;
  cargoType: string | null;
  createdAt: Date;
  id: string;
  manifestNumber: string | null;
  portOfDischarge: string | null;
  portOfLoading: string | null;
  totalWeight: number | null;
  updatedAt: Date;
  vessel?: Vessel | null;
};
