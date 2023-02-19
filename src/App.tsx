import React from "react";

import "./App.css";
import { AddDriver } from "./components/AddDriver/AddDriver";
import { Header } from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import { SingleLoadView } from "./components/views/SingleLoadView";
import { LoadsList } from "./components/Load/LoadsList";
import { DriverList } from "./components/Driver/DriversList";
import { SingleDriverView } from "./components/views/SingleDriverView";
import { ErrorView } from "./components/views/ErrorView";

function App() {
  return (
    <div className="App-box">
      <Header />
      <Routes>
        <Route path="/" element={<AddDriver />}></Route>
        <Route path="/driver" element={<DriverList />}></Route>
        <Route path="/driver/add" element={<AddDriver />}></Route>
        <Route
          path="/driver/:singleDriverId"
          element={<SingleDriverView />}
        ></Route>

        <Route path="/load" element={<LoadsList />}></Route>

        <Route path="/load/:singleLoadId" element={<SingleLoadView />}></Route>

        <Route path="*" element={<ErrorView />} />
      </Routes>
    </div>
  );
}

export default App;
