import Reacr, { useEffect, useState } from "react";
import { LoadEntity } from "types";
import { SpinnerLoading } from "../common/SpinnerLoading/SpinnerLoading";
import { LoadsTable } from "./LoadsTable";

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
      <div className="box glass">
        <h2>Loads</h2>
        <LoadsTable loads={loadsList} onLoadsChange={refreshLoadsList} />
      </div>
    </>
  );
};
