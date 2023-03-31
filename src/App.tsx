import React, { useState } from "react";
import { AddDriver } from "./components/AddDriver/AddDriver";
import { Header } from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import { SingleLoadView } from "./components/views/SingleLoadView";
import { LoadsList } from "./components/Load/LoadsList";
import { DriverList } from "./components/Driver/DriversList";
import { SingleDriverView } from "./components/views/SingleDriverView";
import { ErrorView } from "./components/views/ErrorView";
import { Login } from "./components/AdminLogin/Login";
import { AddAdmin } from "./components/AddAdmin/AddAdmin";
import { AddLoad } from "./components/AddLoad/AddLoad";

import "./App.css";
import { useIsAuthenticated } from "react-auth-kit";

function App() {
  const isAuth = useIsAuthenticated();

  return (
    <div className="App-box">
      <Header />

      <Routes>
        <Route path="/" element={<AddDriver />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<AddAdmin />}></Route>
        <Route
          path="/driver"
          element={isAuth() ? <DriverList /> : null}
        ></Route>
        <Route path="/driver/add" element={<AddDriver />}></Route>
        <Route
          path="/driver/:singleDriverId"
          element={<SingleDriverView />}
        ></Route>
        <Route path="/load" element={isAuth() ? <LoadsList /> : null}></Route>
        <Route path="/load/:singleLoadId" element={<SingleLoadView />}></Route>
        <Route path="/load/add" element={<AddLoad />}></Route>
        <Route path="*" element={<ErrorView />} />
      </Routes>
    </div>
  );
}

export default App;
