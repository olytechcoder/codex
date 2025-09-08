import * as React from "react";
import { List, Datagrid, ListProps, TextField, DateField } from "react-admin";
import Pagination from "../Components/Pagination";

export const FlightList = (props: ListProps): React.ReactElement => {
  return (
    <List {...props} title={"Flights"} perPage={50} pagination={<Pagination />}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField label="airline" source="airline" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="destinationAirport" source="destinationAirport" />
        <TextField label="flightNumber" source="flightNumber" />
        <TextField label="ID" source="id" />
        <TextField label="originAirport" source="originAirport" />
        <TextField label="scheduledArrival" source="scheduledArrival" />
        <TextField label="scheduledDeparture" source="scheduledDeparture" />
        <TextField label="status" source="status" />
        <DateField source="updatedAt" label="Updated At" />{" "}
      </Datagrid>
    </List>
  );
};
