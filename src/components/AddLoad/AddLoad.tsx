import React, { FormEvent, useState } from "react";
import { CreateLoadReq, LoadEntity, Units } from "types";
import { SpinnerLoading } from "../common/SpinnerLoading/SpinnerLoading";
import { Link, redirect, useNavigate } from "react-router-dom";
import { config } from "../../utils/config";
import { useAuthHeader } from "react-auth-kit";
import { fetchData } from "../../utils/fetchData";

export const AddLoad = () => {
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

  const navigate = useNavigate();
  const authToken = useAuthHeader();
  const [loading, setLoading] = useState<boolean>(false);
  const [resultInfo, setResultInfo] = useState<string | null>(null);

  const updateForm = (key: string, value: any) => {
    setForm((form) => ({
      ...form,
      [key]: value,
    }));
  };

  const sendForm = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const addLoadRes = fetchData(
        `${config.apiUrl}/load`,
        "POST",
        authToken(),
        form
      );

      const loadResData: LoadEntity = await addLoadRes;

      setLoading(false);
      setResultInfo(
        `${loadResData.loadName} added with ref: ${loadResData.referenceNumber}`
      );

      setTimeout(() => {
        navigate("/load");
      }, 4000);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <SpinnerLoading />;
  }

  if (resultInfo !== null) {
    return (
      <>
        <div className="good-box">
          <p>{resultInfo}</p>
          <p>
            <Link to="/load">Loads List</Link>
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <main className="hide-scrollbar">
        <header className="Header">
          <h2>Load Registration</h2>
        </header>

        <form className="box-size glass addForm" onSubmit={sendForm}>
          <label>
            Referenc number: (12 signs)
            <input
              required
              type="text"
              value={form.referenceNumber}
              onChange={(e) => updateForm("referenceNumber", e.target.value)}
              minLength={12}
            />
          </label>

          <label>
            Load Name:
            <input
              type="text"
              value={form.loadName}
              onChange={(e) => updateForm("loadName", e.target.value)}
            />
          </label>

          <label>
            Sender:
            <input
              type="text"
              value={form.sender}
              onChange={(e) => updateForm("sender", e.target.value)}
            />
          </label>

          <label>
            Recipient:
            <input
              type="text"
              value={form.recipient}
              onChange={(e) => updateForm("recipient", e.target.value)}
            />
          </label>

          <label>
            Forwarder:
            <input
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
              minLength={1}
            />
          </label>

          <label>
            Driver Id:
            <input
              value={form.driverId}
              onChange={(e) => updateForm("driverId", e.target.value)}
            />
          </label>

          <button type="submit">Add</button>
        </form>
      </main>
    </>
  );
};
