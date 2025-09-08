import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  TextField,
  ReferenceField,
} from "react-admin";
import { VESSEL_TITLE_FIELD } from "../vessel/VesselTitle";

export const VesselCrewShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
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
        <TextField label="visaStatus" source="visaStatus" />
      </SimpleShowLayout>
    </Show>
  );
};
