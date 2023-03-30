import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DriverEntity, ListDriverRes, LoadEntity } from "types";
import { SpinnerLoading } from "../common/SpinnerLoading/SpinnerLoading";
import { DriversTable } from "./DriversTable";
import { useAuthHeader } from "react-auth-kit";
import { config } from "../../utils/config";

import "./Table.css";
import { Button } from "../common/Button/Button";

export const DriverList = () => {
  const [driverData, setDriverData] = useState<ListDriverRes | null>(null);
  undefined;
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
          <Link to="/driver/add">➕Add</Link>
        </p>
      </header>
      <section className="box glass ">
        <DriversTable
          driversList={driverData?.driverList}
          loadsList={driverData.loadList}
          onDelete={() => {}}
        />
      </section>
    </>
  );
};
