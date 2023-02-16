import React, { FormEvent, useState } from "react";
import { CreateLoadReq, LoadEntity, Units } from "types";

export const AddLoad = () => {
  const [form, setForm] = useState<CreateLoadReq>({
    referenceNumber: "",
    loadName: "",
    sender: "",
    recipient: "",
    forwarder: "",
    units: Units.empty,
    quantity: 0,
    weight: 0,
    driverId: "",
    count: 0,
  });

  const updateForm = (key: string, value: any) => {
    setForm((form) => ({
      ...form,
      [key]: value,
    }));
  };

  const sendForm = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3001/load`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data: LoadEntity = await res.json();

    console.log(data);
  };

  return (
    <>
      <form onSubmit={sendForm}>
        <h2>Load Registration</h2>
        <br />
        <label>
          Referenc number: <br />
          <input
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
        <label>
          Units: <br />
          <select
            value={form.units}
            onChange={(e) => updateForm("units", e.target.value)}
          >
            <option>{Units[Units.empty]}</option>
            <option>{Units[Units.other]}</option>
            <option>{Units[Units.pallets]}</option>
            <option>{Units[Units.pcs]}</option>
          </select>
        </label>
        <br />
        <label>
          Quantity: <br />
          <input
            type="text"
            value={form.quantity}
            onChange={(e) => updateForm("quantity", e.target.value)}
          />
        </label>
        <br />
        <label>
          Weight: <br />
          <input
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
        <button type="submit">Register</button>
      </form>
    </>
  );
};
