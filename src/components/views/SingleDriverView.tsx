import React, { useEffect, useState } from "react";
import { GetSingleDriverRes, GetSingleLoadRes, LoadEntity } from "types";
import { Link, useParams } from "react-router-dom";
import { useAuthHeader } from "react-auth-kit";
import { config } from "../../utils/config";
import { SpinnerLoading } from "../common/SpinnerLoading/SpinnerLoading";

import "./Views.css";
import { ErrorView } from "./ErrorView";
import { SingleLoadView } from "./SingleLoadView";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      (async () => {
        const driverResUrl = `${config.apiUrl}/driver/${singleDriverId}`;
        const loadResUrl = `${config.apiUrl}/load/`;

        const driverRes = await fetch(driverResUrl, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authToken()}`,
          },
        });

        const driverResData: GetSingleDriverRes = await driverRes.json();

        setDriverInfo(driverResData);
        const { referenceNumber } = driverResData.driver;

        if (referenceNumber) {
          const resData = await fetch(`${loadResUrl}`, {
            credentials: "include",
            headers: {
              Content_Type: "application/json",
              Authorization: `${authToken()}`,
            },
          });

          const { loadList }: { loadList: LoadEntity[] } = await resData.json();

          const loadForDriver = loadList.find(
            (load) => load.referenceNumber === referenceNumber
          );

          console.log(loadForDriver);

          setLoadInfo(loadForDriver);
        }

        //podczas dodawania sprawdz od razu czy sa takie łqdunki i przypisuje ten wlaściwy po numerze ref, natomiast później mozna to edytować - przypisać inny ładunek

        setIsLoading(false);
      })();
    } catch (e) {
      setIsLoading(false);
      setError(true);
      console.error(e);
    }
  }, [singleDriverId]);

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
        <p>Load Name: {loadInfo?.loadName ?? "not sign"}</p>
        <p>Counted given loads: {loadInfo?.count ?? "not sign"}</p>
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
