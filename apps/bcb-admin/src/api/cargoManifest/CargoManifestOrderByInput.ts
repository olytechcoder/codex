import { SortOrder } from "../../util/SortOrder";

export type CargoManifestOrderByInput = {
  cargoDescription?: SortOrder;
  cargoType?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  manifestNumber?: SortOrder;
  portOfDischarge?: SortOrder;
  portOfLoading?: SortOrder;
  totalWeight?: SortOrder;
  updatedAt?: SortOrder;
  vesselId?: SortOrder;
};
