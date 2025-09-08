import { SortOrder } from "../../util/SortOrder";

export type LandVehicleOrderByInput = {
  createdAt?: SortOrder;
  entryPoint?: SortOrder;
  entryTime?: SortOrder;
  id?: SortOrder;
  nationality?: SortOrder;
  ownerName?: SortOrder;
  plateNumber?: SortOrder;
  status?: SortOrder;
  updatedAt?: SortOrder;
  vehicleType?: SortOrder;
};
