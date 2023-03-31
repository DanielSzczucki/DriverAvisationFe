import React, { useEffect, useState } from "react";
import {
  DriverEntity,
  GetSingleDriverRes,
  GetSingleLoadRes,
  LoadEntity,
} from "types";
import { Link, useParams } from "react-router-dom";
import { useAuthHeader } from "react-auth-kit";
import { config } from "../../utils/config";
import { SpinnerLoading } from "../common/SpinnerLoading/SpinnerLoading";

import "./Views.css";

interface ResData {
  loadRouter: string;
  loadList: GetSingleLoadRes[];
  driverList: GetSingleDriverRes[];
}

export const SingleDriverView = () => {
  const { singleDriverId } = useParams();
  const authToken = useAuthHeader();
  const [driverInfo, setDriverInfo] = useState<GetSingleDriverRes | null>(null);
  const [loadInfo, setLoadInfo] = useState<LoadEntity | undefined>(undefined);

  const getDriverData = async () => {
    const driverResUrl = `${config.apiUrl}/driver/${singleDriverId}`;

    const driverRes = await fetch(driverResUrl, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authToken()}`,
      },
    });

    const driverResData: GetSingleDriverRes = await driverRes.json();

    setDriverInfo(driverResData);
  };

  const getLoadData = async (loadId: string) => {
    const loadResUrl = `${config.apiUrl}/load/`;

    if (loadId) {
      const resData = await fetch(`${loadResUrl}${loadId}`, {
        credentials: "include",
        headers: {
          Content_Type: "application/json",
        },
      });

      const loadForDriver = await resData.json();
      setLoadInfo(loadForDriver);
    }
  };

  useEffect(() => {
    getDriverData();
  }, [singleDriverId]);

  useEffect(() => {
    if (driverInfo) {
      getLoadData(driverInfo.driver.loadId);
    }
  }, [driverInfo]);

  return (
    <>
      <div className="glass views">
        <h2>{driverInfo?.driver.name}</h2>
        <p>
          Driver: {driverInfo?.driver.name} {driverInfo?.driver.lastName}
        </p>
        <p>Driver Id: {driverInfo?.driver.id}</p>
        <p>Ref: {driverInfo?.driver.referenceNumber}</p>
        <p>Company: {driverInfo?.driver.companyName}</p>
        <p>Phone: {driverInfo?.driver.phoneNumber}</p>
        <p>Truck: {driverInfo?.driver.truckNumber}</p>
        <p>Trailer: {driverInfo?.driver.trailerNumber}</p>
        <p>Load Name: {loadInfo?.loadName}</p>
        <p>Counted given loads: {loadInfo?.count}</p>
        <form>
          <label>
            <input type="text" />
          </label>
        </form>
        <p>
          <Link to="/driver">Go back to list</Link>
        </p>
      </div>
    </>
  );
};

//@TODO - add delete option
//add new Load option
//@TODO - add math couting for pallets
