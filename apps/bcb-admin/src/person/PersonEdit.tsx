import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { LandVehicleTitle } from "../landVehicle/LandVehicleTitle";

export const PersonEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
