import React from "react";

import "./App.css";
import { AddDriver } from "./components/AddDriver/AddDriver";
import { Header } from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import { SingleLoadView } from "./components/views/SingleLoadView";
import { LoadsList } from "./components/Load/LoadsList";
import { DriverList } from "./components/Driver/DriversList";
import { SingleDriverView } from "./components/views/SingleDriverView";
import { RequireAuth } from "react-auth-kit";
import { ErrorView } from "./components/views/ErrorView";
import { Login } from "./components/AdminLogin/Login";

function App() {
  return (
    <div className="App-box">
      <Header />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/driver/add" element={<AddDriver />}></Route>

        <Route
          path="/driver"
          element={
            <RequireAuth loginPath="/">
              <DriverList />
            </RequireAuth>
          }
        ></Route>

        <Route
          path="/driver/:singleDriverId"
          element={
            <RequireAuth loginPath="/">
              <SingleDriverView />
            </RequireAuth>
          }
        ></Route>

        <Route
          path="/load"
          element={
            <RequireAuth loginPath="/">
              <LoadsList />
            </RequireAuth>
          }
        ></Route>

        <Route
          path="/load/:singleLoadId"
          element={
            <RequireAuth loginPath="/">
              <SingleLoadView />
            </RequireAuth>
          }
        ></Route>

        <Route path="*" element={<ErrorView />} />
      </Routes>
    </div>
  );
}

export default App;
