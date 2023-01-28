import React, { useEffect, useState } from "react";
import { GetSingleLoadRes } from "types";
import { Link, useParams } from "react-router-dom";

export const SingleLoadView = () => {
  const [loadInfo, setLoadInfo] = useState<GetSingleLoadRes | null>(null);

  const { singleLoadId } = useParams();

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3001/load/${singleLoadId}`);
      const data = await res.json();
      console.log(data);
      setLoadInfo(data);
    })();
  }, []);

  if (loadInfo === null) {
    return null;
  }

  return (
    <>
      <h2>{loadInfo.load.loadName}</h2>
      <p>Load Id: {loadInfo.load.id}</p>
      <p>Sender: {loadInfo.load.sender}</p>
      <p>Recipient: {loadInfo.load.recipient}</p>
      <p>Units: {loadInfo.load.units}</p>
      <p>Quantity: {loadInfo.load.quantity}</p>
      <p>Weight: {loadInfo.load.weight}</p>
      <p>Counted given loads: {loadInfo.givenCount}</p>
      <p>
        <Link to="/load">Go back to list</Link>
      </p>
    </>
  );
};
