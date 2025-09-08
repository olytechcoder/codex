import { CargoManifestCreateNestedManyWithoutVesselsInput } from "./CargoManifestCreateNestedManyWithoutVesselsInput";
import { VesselCrewCreateNestedManyWithoutVesselsInput } from "./VesselCrewCreateNestedManyWithoutVesselsInput";

export type VesselCreateInput = {
  arrivalTime?: Date | null;
  cargoManifests?: CargoManifestCreateNestedManyWithoutVesselsInput;
  departureTime?: Date | null;
  destinationPort?: string | null;
  name?: string | null;
  nationality?: string | null;
  portOfOrigin?: string | null;
  status?: string | null;
  typeField?: string | null;
  vesselCrews?: VesselCrewCreateNestedManyWithoutVesselsInput;
};
