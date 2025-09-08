import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  TextField,
  ReferenceField,
} from "react-admin";
import { LANDVEHICLE_TITLE_FIELD } from "../landVehicle/LandVehicleTitle";

export const PersonShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
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
      </SimpleShowLayout>
    </Show>
  );
};
