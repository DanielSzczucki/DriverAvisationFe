import Reacr, { useEffect, useState } from "react";
import { LoadEntity } from "types";
import { SpinnerLoading } from "../common/SpinnerLoading/SpinnerLoading";
import { LoadsTable } from "./LoadsTable";
import { Link } from "react-router-dom";

export const LoadsList = () => {
  const [loadsList, setLoadsList] = useState<LoadEntity[] | null>(null);

  const refreshLoadsList = () => {
    (async () => {
      const res = await fetch("http://localhost:3001/load");
      const data = await res.json();

      setLoadsList(data.loadList);
    })();
  };

  useEffect(() => {
    refreshLoadsList();
  }, []);

  if (loadsList === null) {
    return <SpinnerLoading />;
  }

  return (
    <>
      <div className="section-head">
        <h2>Loads</h2>
        <p>
          <Link to="/load/add">➕Add</Link>
        </p>
      </div>
      <div className="box glass">
        <LoadsTable loads={loadsList} onLoadsChange={refreshLoadsList} />
      </div>
    </>
  );
};
