import React, { useState } from "react";
import { AddDriver } from "./components/AddDriver/AddDriver";
import { Header } from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/auth";
import { SingleLoadView } from "./components/views/SingleLoadView";
import { LoadsList } from "./components/Load/LoadsList";
import { DriverList } from "./components/Driver/DriversList";
import { SingleDriverView } from "./components/views/SingleDriverView";
import { ErrorView } from "./components/views/ErrorView";
import { Login } from "./components/AdminLogin/Login";
import { AddAdmin } from "./components/AddAdmin/AddAdmin";
import { AddLoad } from "./components/AddLoad/AddLoad";

import "./App.css";

function App() {
  return (
    <div className="App-box">
      <Header />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AddDriver />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<AddAdmin />}></Route>

          <Route path="/driver" element={<DriverList />}></Route>
          <Route path="/driver/add" element={<AddDriver />}></Route>
          <Route
            path="/driver/:singleDriverId"
            element={<SingleDriverView />}
          ></Route>

          <Route path="/load" element={<LoadsList />}></Route>
          <Route
            path="/load/:singleLoadId"
            element={<SingleLoadView />}
          ></Route>
          <Route path="/load/add" element={<AddLoad />}></Route>

          <Route path="*" element={<ErrorView />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
