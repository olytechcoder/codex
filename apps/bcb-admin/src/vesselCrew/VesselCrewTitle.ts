import { VesselCrew as TVesselCrew } from "../api/vesselCrew/VesselCrew";

export const VESSELCREW_TITLE_FIELD = "firstName";

export const VesselCrewTitle = (record: TVesselCrew): string => {
  return record.firstName?.toString() || String(record.id);
};
