import { SortOrder } from "../../util/SortOrder";

export type PersonOrderByInput = {
  createdAt?: SortOrder;
  firstName?: SortOrder;
  id?: SortOrder;
  idNumber?: SortOrder;
  landVehicleId?: SortOrder;
  lastName?: SortOrder;
  nationality?: SortOrder;
  passportNumber?: SortOrder;
  updatedAt?: SortOrder;
  visaStatus?: SortOrder;
};
