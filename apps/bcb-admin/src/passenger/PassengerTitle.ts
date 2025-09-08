import { Passenger as TPassenger } from "../api/passenger/Passenger";

export const PASSENGER_TITLE_FIELD = "firstName";

export const PassengerTitle = (record: TPassenger): string => {
  return record.firstName?.toString() || String(record.id);
};
