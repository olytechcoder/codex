import * as React from "react";
import { List, Datagrid, ListProps, TextField, DateField } from "react-admin";
import Pagination from "../Components/Pagination";

export const VesselList = (props: ListProps): React.ReactElement => {
  return (
    <List {...props} title={"Vessels"} perPage={50} pagination={<Pagination />}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField label="arrivalTime" source="arrivalTime" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="departureTime" source="departureTime" />
        <TextField label="destinationPort" source="destinationPort" />
        <TextField label="ID" source="id" />
        <TextField label="name" source="name" />
        <TextField label="nationality" source="nationality" />
        <TextField label="portOfOrigin" source="portOfOrigin" />
        <TextField label="status" source="status" />
        <TextField label="type" source="typeField" />
        <DateField source="updatedAt" label="Updated At" />{" "}
      </Datagrid>
    </List>
  );
};
