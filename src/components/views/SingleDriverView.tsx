import React, { FormEvent, useEffect, useState } from "react";
import { CreateDriverReq, GetSingleDriverRes, GetSingleLoadRes } from "types";
import { Link, useParams } from "react-router-dom";
import { useAuthHeader } from "react-auth-kit";
import { config } from "../../utils/config";
import { SpinnerLoading } from "../common/SpinnerLoading/SpinnerLoading";
import { fetchData } from "../../utils/fetchData";
import { ErrorView } from "./ErrorView";

import "./Views.css";

interface GetDriverResStatus {
  message: string;
  driver: CreateDriverReq;
}

export const SingleDriverView = () => {
  const { singleDriverId } = useParams();
  const authToken = useAuthHeader();
  const [driverInfo, setDriverInfo] = useState<GetSingleDriverRes | null>(null);
  const [loadInfo, setLoadInfo] = useState<GetSingleLoadRes | null>(null);
  const [resultInfo, setResultInfo] = useState<string>();
  const [form, setForm] = useState<CreateDriverReq>({
    name: "",
    lastName: "",
    companyName: "",
    phoneNumber: 0,
    referenceNumber: "",
    truckNumber: "",
    trailerNumber: "",
    loadingUnloading: "",
    loadId: "",
  });

  const updateForm = (key: string, value: any) => {
    setForm((form) => ({
      ...form,
      [key]: value,
    }));
  };

  try {
    const getDataForDriver = async () => {
      const driverResUrl = `${config.apiUrl}/driver/${singleDriverId}`;
      const loadResUrl = `${config.apiUrl}/load/`;

      const driverRes = fetchData(driverResUrl, "GET", authToken());
      const driverResData: GetDriverResStatus = await driverRes;

      const loadRes = fetchData(
        `${loadResUrl}${driverResData.driver.loadId}`,
        "GET",
        authToken()
      );

      const loadForDriver: GetSingleLoadRes = await loadRes;

      setDriverInfo(driverResData);
      setForm({ ...driverResData.driver });
      setResultInfo(driverResData.message);
      setLoadInfo(loadForDriver);
    };

    useEffect(() => {
      getDataForDriver();
    }, []);
  } catch (e) {
    console.log(e);
    return <ErrorView />;
  }

  const sendForm = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const driverUpdateRes = fetchData(
        `${config.apiUrl}/driver/${singleDriverId}`,
        "PUT",
        authToken(),
        form
      );

      const updatedDriver = await driverUpdateRes;
      console.log(updatedDriver);

      setResultInfo(`${updatedDriver.message}`);
      console.log(resultInfo);
    } catch (e) {
      console.log(e);
      return <ErrorView />;
    }
  };

  if (!driverInfo) {
    return <SpinnerLoading />;
  }

  return (
    <>
      <main className="hide-scrollbar">
        <form className="box-size glass addForm" onSubmit={sendForm}>
          <h2>Driver info & edit form</h2>

          <p>
            Driver:{" "}
            <span>
              {driverInfo?.driver.name} {driverInfo?.driver.lastName}
            </span>
          </p>

          <p>
            Driver Id: <span>{driverInfo.driver.id}</span>
          </p>
          <p>
            Load Name: <span>{loadInfo?.load.loadName}</span>
          </p>
          <p>
            Counted given loads: <span>{loadInfo?.givenCount}</span>
          </p>
          <label>
            Reference number:
            <input
              type="text"
              value={form.referenceNumber}
              onChange={(e) => updateForm("referenceNumber", e.target.value)}
            />
          </label>
          <label>
            Company name:
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => updateForm("companyName", e.target.value)}
            />
          </label>
          <label>
            Phone number:
            <input
              type="text"
              value={form.phoneNumber}
              onChange={(e) => updateForm("phoneNumber", e.target.value)}
            />
          </label>
          <label>
            Truck number:
            <input
              type="text"
              value={form.truckNumber}
              onChange={(e) => updateForm("truckNumber", e.target.value)}
            />
          </label>
          <label>
            Trailer number:
            <input
              type="text"
              value={form.trailerNumber}
              onChange={(e) => updateForm("trailerNumber", e.target.value)}
            />
          </label>
          <button type="submit">Save</button>
          <p>
            <Link to="/driver">Go back to list</Link>
          </p>
        </form>
      </main>
    </>
  );
};

//add new Load option
//@TODO - add math couting for pallets
