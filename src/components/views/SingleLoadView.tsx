import React, { FormEvent, useEffect, useState } from "react";
import { CreateLoadReq, DriverEntity, GetSingleLoadRes, Units } from "types";
import { config } from "../../utils/config";
import { useAuthHeader } from "react-auth-kit";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SpinnerLoading } from "../common/SpinnerLoading/SpinnerLoading";
import { fetchData } from "../../utils/fetchData";

import { Popup } from "../common/Popup/Popup";

interface GetLoadResStatus {
  message: string;
  load: CreateLoadReq;
}

interface GetDriverResStatus {
  driverRouter: string;
  driverList: DriverEntity[];
}

export const SingleLoadView = () => {
  const { singleLoadId } = useParams();
  const authToken = useAuthHeader();
  const navigate = useNavigate();
  const [loadInfo, setLoadInfo] = useState<GetSingleLoadRes | undefined>(
    undefined
  );
  //take all data for option to assign driver to load
  const [allDriversData, setAllDriversData] = useState<DriverEntity[]>();
  //single driver info
  const [driverInfo, setDriverInfo] = useState<DriverEntity | undefined>(
    undefined
  );
  const [resultInfo, setResultInfo] = useState<string | undefined>(undefined);
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

  const getDataForLoad = async () => {
    try {
      //api ednpoints
      const loadResUrl = `${config.apiUrl}/load/${singleLoadId}`;
      const driversResUrl = `${config.apiUrl}/driver`;

      //take load data
      const loadRes = await fetchData(loadResUrl, "GET", `${authToken()}`);

      const loadResData: GetSingleLoadRes = loadRes;

      //set driver id from load
      const driverId = loadRes.load.driverId;

      setLoadInfo(loadResData);
      setForm({ ...loadResData.load });

      //take all drivers data
      const driversRes = await fetchData(
        driversResUrl,
        "GET",
        `${authToken()}`
      );
      //all drivers data
      const driversResData: GetDriverResStatus = driversRes;

      // find one driver if driverId exist in selected load
      if (driverId) {
        const foundDriver = driversResData.driverList.find(
          (driver) => driver.id === driverId
        );
        setDriverInfo(foundDriver);
      }
      setAllDriversData(driversResData.driverList);
    } catch (e) {
      setIsPopupVisible(true);

      return (
        <Popup
          isVisible={true}
          message={"Cant download all load data"}
          onClose={() => setIsPopupVisible(false)}
        />
      );
    }
  };

  useEffect(() => {
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

      const updatedLoad: GetLoadResStatus = await loadUpdateRes;

      setResultInfo(updatedLoad.message);

      setIsPopupVisible(true);
      setIsFormChanged(false);
      getDataForLoad();
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
      <Popup
        isVisible={isPopupVisible}
        message={resultInfo}
        onClose={() => setIsPopupVisible(false)}
      />

      <main className="hide-scrollbar">
        <header className="Header">
          <h2>Load info & edit form</h2>
        </header>

        <form className=" box-size glass addForm" onSubmit={sendForm}>
          <p>
            Load Id: <span>{loadInfo.load.id}</span>
          </p>

          {driverInfo ? (
            <div className="driverInfo">
              <p>
                Driver:{" "}
                <span>
                  {driverInfo?.name} {driverInfo?.lastName}
                </span>
              </p>
              <p>
                Truck: <span>{driverInfo?.truckNumber ?? "not sign"}</span>
              </p>
              <p>
                Trailer: <span> {driverInfo?.trailerNumber ?? "not sign"}</span>
              </p>
            </div>
          ) : null}

          <label className="loadLabel">
            Driver id:
            <select
              value={form.driverId}
              onChange={(e) => updateForm("driverId", e.target.value)}
            >
              <option>{form.driverId}</option>
              {allDriversData?.map((driver) => (
                <option
                  key={driver.id}
                  value={driver.id}
                >{`${driver.name} ${driver.lastName} ${driver.companyName}`}</option>
              ))}
            </select>
          </label>

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
            <select
              value={form.units}
              onChange={(e) => updateForm("units", e.target.value)}
            >
              <option>{Units[Units.other]}</option>
              <option>{Units[Units.pallets]}</option>
              <option>{Units[Units.pcs]}</option>
              <option>{Units[Units.ldm]}</option>
            </select>
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
    </>
  );
};

//@TODO - Add a select option with the names of all drivers as a choice to assign to the load
