import { SortOrder } from "../../util/SortOrder";

export type SecurityCheckOrderByInput = {
  checkTime?: SortOrder;
  cleared?: SortOrder;
  createdAt?: SortOrder;
  documentVerified?: SortOrder;
  flightId?: SortOrder;
  id?: SortOrder;
  luggageScanResult?: SortOrder;
  officerName?: SortOrder;
  passengerId?: SortOrder;
  updatedAt?: SortOrder;
};
