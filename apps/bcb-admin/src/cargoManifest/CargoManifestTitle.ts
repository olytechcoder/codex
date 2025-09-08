import { CargoManifest as TCargoManifest } from "../api/cargoManifest/CargoManifest";

export const CARGOMANIFEST_TITLE_FIELD = "cargoType";

export const CargoManifestTitle = (record: TCargoManifest): string => {
  return record.cargoType?.toString() || String(record.id);
};
