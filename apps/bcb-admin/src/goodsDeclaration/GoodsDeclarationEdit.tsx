import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  ReferenceInput,
  SelectInput,
  NumberInput,
} from "react-admin";

import { LandVehicleTitle } from "../landVehicle/LandVehicleTitle";

export const GoodsDeclarationEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="customsStatus" source="customsStatus" />
        <TextInput label="declarationNumber" source="declarationNumber" />
        <TextInput label="description" multiline source="description" />
        <ReferenceInput
          source="landVehicle.id"
          reference="LandVehicle"
          label="LandVehicle"
        >
          <SelectInput optionText={LandVehicleTitle} />
        </ReferenceInput>
        <TextInput label="ownerName" source="ownerName" />
        <NumberInput label="value" source="value" />
      </SimpleForm>
    </Edit>
  );
};
