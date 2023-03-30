import { DriverEntity, LoadEntity } from "types";
import { DriverTableRow } from "./DriverTableRow";

import "./Table.css";
import { useState } from "react";
import { config } from "../../utils/config";

interface Props {
  driversList: DriverEntity[];
  loadsList: LoadEntity[];
  onDelete: (id: string) => void;
}

export const DriversTable = (props: Props) => {
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const handleDelete = async () => {
    if (selectedId !== undefined) {
      props.onDelete(selectedId);
      setSelectedId(undefined);
      const driverRes = await fetch(`${config.apiUrl}/driver/${selectedId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const deletedDriverRes = await driverRes.json();
      console.log(deletedDriverRes);
    }
  };

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
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
