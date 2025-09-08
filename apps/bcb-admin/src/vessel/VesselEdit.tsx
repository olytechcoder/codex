import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  DateTimeInput,
  ReferenceArrayInput,
  SelectArrayInput,
  TextInput,
} from "react-admin";

import { CargoManifestTitle } from "../cargoManifest/CargoManifestTitle";
import { VesselCrewTitle } from "../vesselCrew/VesselCrewTitle";

export const VesselEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <DateTimeInput label="arrivalTime" source="arrivalTime" />
        <ReferenceArrayInput source="cargoManifests" reference="CargoManifest">
          <SelectArrayInput
            optionText={CargoManifestTitle}
            parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
            format={(value: any) => value && value.map((v: any) => v.id)}
          />
        </ReferenceArrayInput>
        <DateTimeInput label="departureTime" source="departureTime" />
        <TextInput label="destinationPort" source="destinationPort" />
        <TextInput label="name" source="name" />
        <TextInput label="nationality" source="nationality" />
        <TextInput label="portOfOrigin" source="portOfOrigin" />
        <TextInput label="status" source="status" />
        <TextInput label="type" source="typeField" />
        <ReferenceArrayInput source="vesselCrews" reference="VesselCrew">
          <SelectArrayInput
            optionText={VesselCrewTitle}
            parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
            format={(value: any) => value && value.map((v: any) => v.id)}
          />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  );
};
