import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { LandVehicleTitle } from "../landVehicle/LandVehicleTitle";

export const PersonCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="firstName" source="firstName" />
        <TextInput label="idNumber" source="idNumber" />
        <ReferenceInput
          source="landVehicle.id"
          reference="LandVehicle"
          label="LandVehicle"
        >
          <SelectInput optionText={LandVehicleTitle} />
        </ReferenceInput>
        <TextInput label="lastName" source="lastName" />
        <TextInput label="nationality" source="nationality" />
        <TextInput label="passportNumber" source="passportNumber" />
        <TextInput label="visaStatus" source="visaStatus" />
      </SimpleForm>
    </Create>
  );
};
