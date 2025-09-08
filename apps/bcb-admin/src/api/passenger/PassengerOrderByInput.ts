import { SortOrder } from "../../util/SortOrder";

export type PassengerOrderByInput = {
  boardingPassId?: SortOrder;
  createdAt?: SortOrder;
  firstName?: SortOrder;
  flightId?: SortOrder;
  id?: SortOrder;
  lastName?: SortOrder;
  nationality?: SortOrder;
  passportNumber?: SortOrder;
  seatNumber?: SortOrder;
  updatedAt?: SortOrder;
  visaStatus?: SortOrder;
};
