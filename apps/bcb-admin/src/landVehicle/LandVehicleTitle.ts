import { LandVehicle as TLandVehicle } from "../api/landVehicle/LandVehicle";

export const LANDVEHICLE_TITLE_FIELD = "ownerName";

export const LandVehicleTitle = (record: TLandVehicle): string => {
  return record.ownerName?.toString() || String(record.id);
};
