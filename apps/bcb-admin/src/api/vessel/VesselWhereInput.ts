import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { CargoManifestListRelationFilter } from "../cargoManifest/CargoManifestListRelationFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { VesselCrewListRelationFilter } from "../vesselCrew/VesselCrewListRelationFilter";

export type VesselWhereInput = {
  arrivalTime?: DateTimeNullableFilter;
  cargoManifests?: CargoManifestListRelationFilter;
  departureTime?: DateTimeNullableFilter;
  destinationPort?: StringNullableFilter;
  id?: StringFilter;
  name?: StringNullableFilter;
  nationality?: StringNullableFilter;
  portOfOrigin?: StringNullableFilter;
  status?: StringNullableFilter;
  typeField?: StringNullableFilter;
  vesselCrews?: VesselCrewListRelationFilter;
};
