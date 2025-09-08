import { SortOrder } from "../../util/SortOrder";

export type VesselOrderByInput = {
  arrivalTime?: SortOrder;
  createdAt?: SortOrder;
  departureTime?: SortOrder;
  destinationPort?: SortOrder;
  id?: SortOrder;
  name?: SortOrder;
  nationality?: SortOrder;
  portOfOrigin?: SortOrder;
  status?: SortOrder;
  typeField?: SortOrder;
  updatedAt?: SortOrder;
};
