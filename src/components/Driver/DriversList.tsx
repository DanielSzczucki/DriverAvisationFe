import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DriverEntity, ListDriverRes, LoadEntity } from "types";
import { SpinnerLoading } from "../common/SpinnerLoading/SpinnerLoading";
import { DriversTable } from "./DriversTable";

import "./Table.css";

export const DriverList = () => {
  const [data, setData] = useState<ListDriverRes | null>(null);

  const refreshList = async () => {
    const res = await fetch("http://localhost:3001/driver");
    const data = await res.json();

    setData(data);
  };

  useEffect(() => {
    refreshList();
  }, []);

  if (data === null) {
    return <SpinnerLoading />;
  }

  return (
    <div className="box glass ">
      <h2>Drivers</h2>
      <DriversTable driversList={data?.driverList} loadsList={data.loadList} />
    </div>
  );
};
