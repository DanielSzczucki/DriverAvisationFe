import React, { FormEvent, useState } from "react";
import { CreateLoadReq, LoadEntity, Units } from "types";
import { SpinnerLoading } from "../common/SpinnerLoading/SpinnerLoading";
import { Link } from "react-router-dom";

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
    driverId: "",
    count: 0,
  });

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
      const res = await fetch(`http://localhost:3001/load`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data: LoadEntity = await res.json();

      setLoading(false);
      setResultInfo(`${data.loadName} added with ref: ${data.referenceNumber}`);
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
            {" "}
            <Link to="/loads">Loads List</Link>{" "}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <main className="hide-scrollbar">
        <form className="box-size glass addForm" onSubmit={sendForm}>
          <h2>Load Registration</h2>
          <br />
          <label>
            Referenc number: <br />
            <input
              required
              type="text"
              value={form.referenceNumber}
              onChange={(e) => updateForm("referenceNumber", e.target.value)}
            />
          </label>
          <br />
          <label>
            Load Name:: <br />
            <input
              type="text"
              value={form.loadName}
              onChange={(e) => updateForm("loadName", e.target.value)}
            />
          </label>
          <br />
          <label>
            Sender: <br />
            <input
              type="text"
              value={form.sender}
              onChange={(e) => updateForm("sender", e.target.value)}
            />
          </label>
          <br />
          <label>
            Recipient: <br />
            <input
              type="text"
              value={form.recipient}
              onChange={(e) => updateForm("recipient", e.target.value)}
            />
          </label>
          <br />
          <label>
            Forwarder: <br />
            <input
              type="text"
              value={form.forwarder}
              onChange={(e) => updateForm("forwarder", e.target.value)}
            />
          </label>
          <br />
          <label className="loadLabel">
            Units: <br />
            <select
              value={form.units}
              onChange={(e) => updateForm("units", e.target.value)}
            >
              <option>{Units[Units.other]}</option>
              <option>{Units[Units.pallets]}</option>
              <option>{Units[Units.pcs]}</option>
            </select>
          </label>
          <br />
          <label>
            Quantity: <br />
            <input
              required
              type="text"
              value={form.quantity}
              onChange={(e) => updateForm("quantity", e.target.value)}
            />
          </label>
          <br />
          <label>
            Weight: <br />
            <input
              required
              type="text"
              value={form.weight}
              onChange={(e) => updateForm("weight", e.target.value)}
            />
          </label>
          <br />
          <label>
            Count: <br />
            <input
              type="text"
              value={form.count}
              onChange={(e) => updateForm("count", e.target.value)}
            />
          </label>
          <br />
          <label>
            Driver Id: <br />
            <input
              value={form.driverId}
              onChange={(e) => updateForm("driverId", e.target.value)}
            />
          </label>
          <br />

          <br />
          <button type="submit">Add</button>
        </form>
      </main>
    </>
  );
};
