import React from "react";
import { DriverEntity, LoadEntity } from "types";
import { DriverTableRow } from "./DriverTableRow";

import "./Table.css";
import { Link } from "react-router-dom";

interface Props {
  driversList: DriverEntity[];
  loadsList: LoadEntity[];
}

export const DriversTable = (props: Props) => {
  console.log(props);
  return (
    <>
      <table className="Table">
        <thead>
          <tr>
            <th> Driver name </th>
            <th> Last name</th>
            <th> Reference </th>
            <th> Company </th>
            <th> Truck No.</th>
            <th> Trailer No. </th>
            <th> Statusg </th>
            <th> Load id </th>
          </tr>
        </thead>
        <tbody>
          {props.driversList.map((driver) => (
            <DriverTableRow
              driver={driver}
              key={driver.id}
              loadsList={props.loadsList}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
