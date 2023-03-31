import Reacr, { useEffect, useState } from "react";
import { LoadEntity } from "types";
import { SpinnerLoading } from "../common/SpinnerLoading/SpinnerLoading";
import { LoadsTable } from "./LoadsTable";
import { Link } from "react-router-dom";
import { useAuthHeader } from "react-auth-kit";
import { config } from "../../utils/config";

export const LoadsList = () => {
  const [loadsList, setLoadsList] = useState<LoadEntity[] | null>(null);
  const authToken = useAuthHeader();

  const refreshLoadsList = () => {
    (async () => {
      const res = await fetch(`${config.apiUrl}/load`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken()}`,
        },
      });
      const data = await res.json();
      //data contains token

      setLoadsList(data.loadList);
    })();
  };

  const handleLoadDelete = async (id: string | undefined) => {
    window.alert("Are you realy want to delete this Load?");
    if (id !== undefined) {
      const loadRes = await fetch(`${config.apiUrl}/load/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const deletedLoadRes = await loadRes.json();
      console.log(deletedLoadRes);
      refreshLoadsList();
    }
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
          <Link to="/load/add">+Add</Link>
        </p>
      </div>
      <div className="box glass">
        <LoadsTable
          loads={loadsList}
          onLoadsChange={refreshLoadsList}
          onDelete={handleLoadDelete}
        />
      </div>
    </>
  );
};
