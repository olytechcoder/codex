import { Vessel as TVessel } from "../api/vessel/Vessel";

export const VESSEL_TITLE_FIELD = "name";

export const VesselTitle = (record: TVessel): string => {
  return record.name?.toString() || String(record.id);
};
