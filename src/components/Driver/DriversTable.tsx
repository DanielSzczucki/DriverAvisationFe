import { DriverEntity, LoadEntity } from "types";
import { DriverTableRow } from "./DriverTableRow";

import "./Table.css";

interface Props {
  driversList: DriverEntity[];
  loadsList: LoadEntity[];
  onDelete: (id: string | undefined) => Promise<void>;
}

export const DriversTable = (props: Props) => {
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
            <th> Options </th>
          </tr>
        </thead>
        <tbody>
          {props.driversList.map((driver) => (
            <DriverTableRow
              driver={driver}
              key={driver.id}
              loadsList={props.loadsList}
              onDelete={props.onDelete}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
