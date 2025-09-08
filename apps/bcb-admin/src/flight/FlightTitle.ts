import { Flight as TFlight } from "../api/flight/Flight";

export const FLIGHT_TITLE_FIELD = "airline";

export const FlightTitle = (record: TFlight): string => {
  return record.airline?.toString() || String(record.id);
};
