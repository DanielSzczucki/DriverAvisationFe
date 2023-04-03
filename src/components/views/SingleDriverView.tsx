import React, { useEffect, useState } from "react";
import { GetSingleDriverRes, GetSingleLoadRes } from "types";
import { Link, useParams } from "react-router-dom";
import { useAuthHeader } from "react-auth-kit";
import { config } from "../../utils/config";
import { SpinnerLoading } from "../common/SpinnerLoading/SpinnerLoading";
import { ErrorView } from "./ErrorView";

import "./Views.css";

export const SingleDriverView = () => {
  const { singleDriverId } = useParams();
  const authToken = useAuthHeader();
  const [driverInfo, setDriverInfo] = useState<GetSingleDriverRes | null>(null);
  const [loadInfo, setLoadInfo] = useState<GetSingleLoadRes | null>(null);

  try {
    const getDataForDriver = async () => {
      const driverResUrl = `${config.apiUrl}/driver/${singleDriverId}`;
      const loadResUrl = `${config.apiUrl}/load/`;

      const driverRes = await fetch(driverResUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken()}`,
        },
      });

      const driverResData: GetSingleDriverRes = await driverRes.json();

      const loadRes = await fetch(
        `${loadResUrl}${driverResData.driver.loadId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Content_Type: "application/json",
            Authorization: `${authToken()}`,
          },
        }
      );

      const loadForDriver: GetSingleLoadRes = await loadRes.json();

      setDriverInfo(driverResData);
      setLoadInfo(loadForDriver);
    };

    useEffect(() => {
      getDataForDriver();
    }, []);
  } catch (e) {
    console.log(e);
    return <ErrorView />;
  }

  if (!driverInfo) {
    return <SpinnerLoading />;
  }

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

        <p>Load Name: {loadInfo?.load.loadName}</p>
        <p>Counted given loads: {loadInfo?.givenCount}</p>
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

//add new Load option
//@TODO - add math couting for pallets
