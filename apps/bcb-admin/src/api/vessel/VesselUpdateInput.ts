import { CargoManifestUpdateManyWithoutVesselsInput } from "./CargoManifestUpdateManyWithoutVesselsInput";
import { VesselCrewUpdateManyWithoutVesselsInput } from "./VesselCrewUpdateManyWithoutVesselsInput";

export type VesselUpdateInput = {
  arrivalTime?: Date | null;
  cargoManifests?: CargoManifestUpdateManyWithoutVesselsInput;
  departureTime?: Date | null;
  destinationPort?: string | null;
  name?: string | null;
  nationality?: string | null;
  portOfOrigin?: string | null;
  status?: string | null;
  typeField?: string | null;
  vesselCrews?: VesselCrewUpdateManyWithoutVesselsInput;
};
