import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

import { VesselTitle } from "../vessel/VesselTitle";

export const CargoManifestCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput
          label="cargoDescription"
          multiline
          source="cargoDescription"
        />
        <TextInput label="cargoType" source="cargoType" />
        <TextInput label="manifestNumber" source="manifestNumber" />
        <TextInput label="portOfDischarge" source="portOfDischarge" />
        <TextInput label="portOfLoading" source="portOfLoading" />
        <NumberInput label="totalWeight" source="totalWeight" />
        <ReferenceInput source="vessel.id" reference="Vessel" label="Vessel">
          <SelectInput optionText={VesselTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
