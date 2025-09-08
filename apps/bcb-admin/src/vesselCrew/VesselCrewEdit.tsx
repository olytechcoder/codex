import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { VesselTitle } from "../vessel/VesselTitle";

export const VesselCrewEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="firstName" source="firstName" />
        <TextInput label="lastName" source="lastName" />
        <TextInput label="nationality" source="nationality" />
        <TextInput label="passportNumber" source="passportNumber" />
        <TextInput label="role" source="role" />
        <ReferenceInput source="vessel.id" reference="Vessel" label="Vessel">
          <SelectInput optionText={VesselTitle} />
        </ReferenceInput>
        <TextInput label="visaStatus" source="visaStatus" />
      </SimpleForm>
    </Edit>
  );
};
