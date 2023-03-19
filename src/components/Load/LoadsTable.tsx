import React from "react";
import { LoadEntity } from "types";
import { LoadTableRow } from "./LoadTableRow";

interface Props {
  loads: LoadEntity[];
  onLoadsChange: () => void;
}

export const LoadsTable = (props: Props) => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th> Load name </th>
            <th> Reference </th>
            <th> Sender </th>
            <th> Recipient </th>
            <th> Units </th>
            <th> Quantity </th>
            <th> Weight </th>
          </tr>
        </thead>
        <tbody>
          {props.loads.map((load) => (
            <LoadTableRow
              load={load}
              key={load.id}
              onLoadChange={props.onLoadsChange}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
