import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  DateField,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
} from "react-admin";

import { VESSEL_TITLE_FIELD } from "./VesselTitle";

export const VesselShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField label="arrivalTime" source="arrivalTime" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="departureTime" source="departureTime" />
        <TextField label="destinationPort" source="destinationPort" />
        <TextField label="ID" source="id" />
        <TextField label="name" source="name" />
        <TextField label="nationality" source="nationality" />
        <TextField label="portOfOrigin" source="portOfOrigin" />
        <TextField label="status" source="status" />
        <TextField label="type" source="typeField" />
        <DateField source="updatedAt" label="Updated At" />
        <ReferenceManyField
          reference="CargoManifest"
          target="vesselId"
          label="CargoManifests"
        >
          <Datagrid rowClick="show" bulkActionButtons={false}>
            <TextField label="cargoDescription" source="cargoDescription" />
            <TextField label="cargoType" source="cargoType" />
            <DateField source="createdAt" label="Created At" />
            <TextField label="ID" source="id" />
            <TextField label="manifestNumber" source="manifestNumber" />
            <TextField label="portOfDischarge" source="portOfDischarge" />
            <TextField label="portOfLoading" source="portOfLoading" />
            <TextField label="totalWeight" source="totalWeight" />
            <DateField source="updatedAt" label="Updated At" />
            <ReferenceField
              label="Vessel"
              source="vessel.id"
              reference="Vessel"
            >
              <TextField source={VESSEL_TITLE_FIELD} />
            </ReferenceField>
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField
          reference="VesselCrew"
          target="vesselId"
          label="VesselCrews"
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
            <ReferenceField
              label="Vessel"
              source="vessel.id"
              reference="Vessel"
            >
              <TextField source={VESSEL_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="visaStatus" source="visaStatus" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
