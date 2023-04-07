import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DriverEntity, ListDriverRes, LoadEntity } from "types";
import { SpinnerLoading } from "../common/SpinnerLoading/SpinnerLoading";
import { DriversTable } from "./DriversTable";
import { useAuthHeader } from "react-auth-kit";
import { config } from "../../utils/config";
import { Popup } from "../common/Popup/Popup";
import { fetchData } from "../../utils/fetchData";

import "./Table.css";

interface smsResponse {
  message: string;
}

export const DriverList = () => {
  const [driverData, setDriverData] = useState<ListDriverRes | null>(null);
  const authToken = useAuthHeader();

  const refreshList = async () => {
    const driverrRes = await fetch(`${config.apiUrl}/driver`, {
      credentials: "include",
      headers: {
        Authorization: `${authToken()}`,
        "Content-Type": "application/json",
      },
    });
    const driverDataRes = await driverrRes.json();

    setDriverData(driverDataRes);
  };

  const handleDriverDelete = async (id: string | undefined) => {
    const confirmMessage = "Are you realy want to delete this Driver?";

    if (window.confirm(confirmMessage) && id !== undefined) {
      const driverRes = await fetch(`${config.apiUrl}/driver/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `${authToken()}`,
          "Content-Type": "application/json",
        },
      });

      const deletedDriverRes = await driverRes.json();
      refreshList();
      return deletedDriverRes;
    }
  };
  //send sms to driver with dock nr
  const handleDockSend = async (
    id: string | undefined,
    dockNumber: number | undefined
  ) => {
    const messageWithDock: string = `SimpleCargoApp: Please, go to Dock No:${dockNumber}`;

    console.log(dockNumber);
    console.log(id);
    console.log(messageWithDock);

    const res = await fetch(`${config.apiUrl}/driver/sms/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `${authToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: messageWithDock }),
    });
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    refreshList();
  }, []);

  if (driverData === null) {
    return <SpinnerLoading />;
  }

  return (
    <>
      <header className="section-head">
        <h2>Drivers</h2>

        <p>
          <Link to="/driver/add">+Add</Link>
        </p>
      </header>
      <section className="box glass ">
        <DriversTable
          driversList={driverData?.driverList}
          loadsList={driverData.loadList}
          onDelete={handleDriverDelete}
          onDockSend={handleDockSend}
        />
      </section>
    </>
  );
};
