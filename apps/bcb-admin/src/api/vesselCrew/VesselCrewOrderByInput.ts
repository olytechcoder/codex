import { SortOrder } from "../../util/SortOrder";

export type VesselCrewOrderByInput = {
  createdAt?: SortOrder;
  firstName?: SortOrder;
  id?: SortOrder;
  lastName?: SortOrder;
  nationality?: SortOrder;
  passportNumber?: SortOrder;
  role?: SortOrder;
  updatedAt?: SortOrder;
  vesselId?: SortOrder;
  visaStatus?: SortOrder;
};
