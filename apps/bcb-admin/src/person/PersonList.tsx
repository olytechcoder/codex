import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  DateField,
  TextField,
  ReferenceField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { LANDVEHICLE_TITLE_FIELD } from "../landVehicle/LandVehicleTitle";

export const PersonList = (props: ListProps): React.ReactElement => {
  return (
    <List {...props} title={"People"} perPage={50} pagination={<Pagination />}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <DateField source="createdAt" label="Created At" />
        <TextField label="firstName" source="firstName" />
        <TextField label="ID" source="id" />
        <TextField label="idNumber" source="idNumber" />
        <ReferenceField
          label="LandVehicle"
          source="landvehicle.id"
          reference="LandVehicle"
        >
          <TextField source={LANDVEHICLE_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="lastName" source="lastName" />
        <TextField label="nationality" source="nationality" />
        <TextField label="passportNumber" source="passportNumber" />
        <DateField source="updatedAt" label="Updated At" />
        <TextField label="visaStatus" source="visaStatus" />{" "}
      </Datagrid>
    </List>
  );
};
