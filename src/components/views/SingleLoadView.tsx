import React, { FormEvent, useEffect, useState } from "react";
import {
  CreateLoadReq,
  GetSingleDriverRes,
  GetSingleLoadRes,
  Units,
} from "types";
import { config } from "../../utils/config";
import { useAuthHeader } from "react-auth-kit";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SpinnerLoading } from "../common/SpinnerLoading/SpinnerLoading";
import { fetchData } from "../../utils/fetchData";

import { Popup } from "../common/Popup/Popup";

interface GetLoadResStatus {
  message: string;
  driver: CreateLoadReq;
}

export const SingleLoadView = () => {
  const { singleLoadId } = useParams();
  const authToken = useAuthHeader();
  const navigate = useNavigate();
  const [loadInfo, setLoadInfo] = useState<GetSingleLoadRes | undefined>(
    undefined
  );
  const [driverInfo, setDriverInfo] = useState<GetSingleDriverRes | undefined>(
    undefined
  );
  const [resultInfo, setResultInfo] = useState<string>();
  const [form, setForm] = useState<CreateLoadReq>({
    referenceNumber: "",
    loadName: "",
    sender: "",
    recipient: "",
    forwarder: "",
    units: Units.other,
    quantity: 0,
    weight: 0,
    count: 0,
    startDate: "",
    driverId: "",
  });
  const [isFormChanged, setIsFormChanged] = useState<boolean>(false);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  useEffect(() => {
    const getDataForLoad = async () => {
      try {
        const loadResUrl = `${config.apiUrl}/load/${singleLoadId}`;
        const driverResUrl = `${config.apiUrl}/driver/`;

        const loadRes = await fetchData(loadResUrl, "GET", `${authToken()}`);
        const loadResData: GetSingleLoadRes = loadRes;

        const driverRes = await fetchData(
          `${driverResUrl}${loadResData.load.driverId}`,
          "GET",
          `${authToken()}`
        );
        const driverResData: GetSingleDriverRes = driverRes;

        setLoadInfo(loadResData);
        setDriverInfo(driverResData);
        setForm({ ...loadResData.load });
      } catch (e) {
        setIsPopupVisible(true);
        <Popup
          isVisible={true}
          message={"Cant fetch load data"}
          onClose={() => setIsPopupVisible(false)}
        />;
      }
    };
    getDataForLoad();
  }, []);

  const updateForm = (key: string, value: any) => {
    setForm((form) => ({
      ...form,
      [key]: value,
    }));
    setIsFormChanged(true);
  };

  const sendForm = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const loadUpdateRes = fetchData(
        `${config.apiUrl}/load/${singleLoadId}`,
        "PUT",
        authToken(),
        form
      );

      const updatedLoad = await loadUpdateRes;

      setResultInfo(`${updatedLoad.message}`);
      setIsPopupVisible(true);
    } catch (e) {
      //popup shows bad message from sendForm > updateLoad.message
      setIsPopupVisible(true);

      setTimeout(() => {
        navigate("/load");
      }, 4000);
    }
  };

  if (!loadInfo) {
    return <SpinnerLoading />;
  }

  return (
    <>
      {isPopupVisible ? (
        <Popup
          isVisible={isPopupVisible}
          message={resultInfo}
          onClose={() => setIsPopupVisible(false)}
        />
      ) : (
        <main className="hide-scrollbar">
          <form className=" box-size glass addForm" onSubmit={sendForm}>
            <h2>Load info & edit form</h2>
            <p>Load Id: {loadInfo.load.id}</p>
            <p>
              Driver: {driverInfo?.driver.name ?? "not sign"}
              {driverInfo?.driver.lastName ?? "not sign"}
            </p>
            <p>Truck: {driverInfo?.driver.truckNumber ?? "not sign"}</p>
            <p>Trailer: {driverInfo?.driver.trailerNumber ?? "not sign"}</p>
            <label>
              Driver id:
              <select
                value={form.driverId}
                onChange={(e) => updateForm("loadingUnloading", e.target.value)}
              >
                <option>{form.driverId}</option>
              </select>
            </label>
            <br />
            <label>
              Sender:
              <input
                required
                type="text"
                value={form.sender}
                onChange={(e) => updateForm("sender", e.target.value)}
              />
            </label>
            <label>
              Recipient:
              <input
                required
                type="text"
                value={form.recipient}
                onChange={(e) => updateForm("recipient", e.target.value)}
              />
            </label>
            <label>
              Forwarder:
              <input
                required
                type="text"
                value={form.forwarder}
                onChange={(e) => updateForm("forwarder", e.target.value)}
              />
            </label>
            <label>
              Units:
              <input
                required
                type="text"
                value={form.units}
                onChange={(e) => updateForm("units", e.target.value)}
              />
            </label>
            <label>
              Quantity:
              <input
                required
                type="text"
                value={form.quantity}
                onChange={(e) => updateForm("quantity", e.target.value)}
              />
            </label>
            <label>
              Weight:
              <input
                required
                type="text"
                value={form.weight}
                onChange={(e) => updateForm("weight", e.target.value)}
              />
            </label>

            {isFormChanged ? (
              <button type="submit">Save</button>
            ) : (
              <button
                //Restore the initial data.
                onClick={() => {
                  setForm({ ...loadInfo.load });
                  setIsFormChanged(false);
                }}
              >
                Cancel
              </button>
            )}

            <p>
              <Link to="/load">Go back to list</Link>
            </p>
          </form>
        </main>
      )}
    </>
  );
};

//@TODO - Add a select option with the names of all drivers as a choice to assign to the load
