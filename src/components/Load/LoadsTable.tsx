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

// let listLoad = [
//   {
//     id: "4c987283-8ab1-11ed-a9d0-770ddd2d",
//     referenceNumber: "RUS-2301-001",
//     loadName: "Poczta",
//     sender: "DPD POLAND",
//     recipient: "BRT ITALY",
//     units: "Pallets",
//     quantity: 66,
//     weight: 8650,
//   },
//   {
//     id: "4c987283-8ab1-11ed-a9d0-770ddd2d",
//     referenceNumber: "RUS-2301-001",
//     loadName: "Poczta",
//     sender: "DPD POLAND",
//     recipient: "BRT ITALY",
//     units: "Pallets",
//     quantity: 66,
//     weight: 8650,
//   },
//   {
//     id: "4c987283-8ab1-11ed-a9d0-770ddd2d",
//     referenceNumber: "RUS-2301-001",
//     loadName: "Poczta",
//     sender: "DPD POLAND",
//     recipient: "BRT ITALY",
//     units: "Pallets",
//     quantity: 66,
//     weight: 8650,
//   },
// ];
