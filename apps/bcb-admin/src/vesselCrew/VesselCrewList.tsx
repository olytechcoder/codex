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
import { VESSEL_TITLE_FIELD } from "../vessel/VesselTitle";

export const VesselCrewList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      title={"VesselCrews"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <DateField source="createdAt" label="Created At" />
        <TextField label="firstName" source="firstName" />
        <TextField label="ID" source="id" />
        <TextField label="lastName" source="lastName" />
        <TextField label="nationality" source="nationality" />
        <TextField label="passportNumber" source="passportNumber" />
        <TextField label="role" source="role" />
        <DateField source="updatedAt" label="Updated At" />
        <ReferenceField label="Vessel" source="vessel.id" reference="Vessel">
          <TextField source={VESSEL_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="visaStatus" source="visaStatus" />{" "}
      </Datagrid>
    </List>
  );
};
