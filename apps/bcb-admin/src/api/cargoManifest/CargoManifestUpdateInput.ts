import { VesselWhereUniqueInput } from "../vessel/VesselWhereUniqueInput";

export type CargoManifestUpdateInput = {
  cargoDescription?: string | null;
  cargoType?: string | null;
  manifestNumber?: string | null;
  portOfDischarge?: string | null;
  portOfLoading?: string | null;
  totalWeight?: number | null;
  vessel?: VesselWhereUniqueInput | null;
};
