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
      <table className="table">
        <thead>
          <tr>
            <th> Driver name </th>
            <th> Reference </th>
            <th> Truck No.</th>
            <th> Trailer No. </th>
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
