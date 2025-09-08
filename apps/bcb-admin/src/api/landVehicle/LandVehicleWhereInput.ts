import { StringNullableFilter } from "../../util/StringNullableFilter";
import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { GoodsDeclarationListRelationFilter } from "../goodsDeclaration/GoodsDeclarationListRelationFilter";
import { StringFilter } from "../../util/StringFilter";
import { PersonListRelationFilter } from "../person/PersonListRelationFilter";

export type LandVehicleWhereInput = {
  entryPoint?: StringNullableFilter;
  entryTime?: DateTimeNullableFilter;
  goodsDeclarations?: GoodsDeclarationListRelationFilter;
  id?: StringFilter;
  nationality?: StringNullableFilter;
  ownerName?: StringNullableFilter;
  people?: PersonListRelationFilter;
  plateNumber?: StringNullableFilter;
  status?: StringNullableFilter;
  vehicleType?: StringNullableFilter;
};
