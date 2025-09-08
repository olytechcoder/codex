import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  BooleanInput,
  TextInput,
} from "react-admin";

export const AlertNotificationEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <BooleanInput label="actionRequired" source="actionRequired" />
        <TextInput label="message" multiline source="message" />
        <TextInput label="module" source="moduleField" />
        <TextInput label="severity" source="severity" />
        <TextInput label="status" source="status" />
        <TextInput label="title" source="title" />
      </SimpleForm>
    </Edit>
  );
};
