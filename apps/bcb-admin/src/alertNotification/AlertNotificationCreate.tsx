import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  BooleanInput,
  TextInput,
} from "react-admin";

export const AlertNotificationCreate = (
  props: CreateProps
): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <BooleanInput label="actionRequired" source="actionRequired" />
        <TextInput label="message" multiline source="message" />
        <TextInput label="module" source="moduleField" />
        <TextInput label="severity" source="severity" />
        <TextInput label="status" source="status" />
        <TextInput label="title" source="title" />
      </SimpleForm>
    </Create>
  );
};
