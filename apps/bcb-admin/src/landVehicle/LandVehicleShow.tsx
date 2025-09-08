import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  TextField,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
} from "react-admin";

import { LANDVEHICLE_TITLE_FIELD } from "./LandVehicleTitle";

export const LandVehicleShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <TextField label="entryPoint" source="entryPoint" />
        <TextField label="entryTime" source="entryTime" />
        <TextField label="ID" source="id" />
        <TextField label="nationality" source="nationality" />
        <TextField label="ownerName" source="ownerName" />
        <TextField label="plateNumber" source="plateNumber" />
        <TextField label="status" source="status" />
        <DateField source="updatedAt" label="Updated At" />
        <TextField label="vehicleType" source="vehicleType" />
        <ReferenceManyField
          reference="GoodsDeclaration"
          target="landVehicleId"
          label="GoodsDeclarations"
        >
          <Datagrid rowClick="show" bulkActionButtons={false}>
            <DateField source="createdAt" label="Created At" />
            <TextField label="customsStatus" source="customsStatus" />
            <TextField label="declarationNumber" source="declarationNumber" />
            <TextField label="description" source="description" />
            <TextField label="ID" source="id" />
            <ReferenceField
              label="LandVehicle"
              source="landvehicle.id"
              reference="LandVehicle"
            >
              <TextField source={LANDVEHICLE_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="ownerName" source="ownerName" />
            <DateField source="updatedAt" label="Updated At" />
            <TextField label="value" source="value" />
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField
          reference="Person"
          target="landVehicleId"
          label="People"
        >
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
            <TextField label="visaStatus" source="visaStatus" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
