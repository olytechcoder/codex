import { BooleanNullableFilter } from "../../util/BooleanNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type AlertNotificationWhereInput = {
  actionRequired?: BooleanNullableFilter;
  id?: StringFilter;
  message?: StringNullableFilter;
  moduleField?: StringNullableFilter;
  severity?: StringNullableFilter;
  status?: StringNullableFilter;
  title?: StringNullableFilter;
};
