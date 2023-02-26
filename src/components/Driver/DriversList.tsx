import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DriverEntity, ListDriverRes, LoadEntity } from "types";
import { SpinnerLoading } from "../common/SpinnerLoading/SpinnerLoading";
import { DriversTable } from "./DriversTable";
import { useSignIn } from "react-auth-kit";
import { useAuthHeader } from "react-auth-kit";
import "./Table.css";

export const DriverList = () => {
  const [driverData, setDriverData] = useState<ListDriverRes | null>(null);
  const authToken = useAuthHeader();

  const refreshList = async () => {
    const driverrRes = await fetch("http://localhost:3001/driver", {
      headers: {
        Authorization: `${authToken()}`,
        "Content-Type": "application/json",
      },
    });
    const driverDataRes = await driverrRes.json();
    console.log(driverDataRes);

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
      <div className="section-head">
        <h2>Drivers</h2>

        <p>
          <Link to="/driver/add">➕Add</Link>
        </p>
      </div>
      <div className="box glass ">
        <DriversTable
          driversList={driverData?.driverList}
          loadsList={driverData.loadList}
        />
      </div>
    </>
  );
};
