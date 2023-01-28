import React from "react";

import "./App.css";
import { AddDriver } from "./components/AddDriver/AddDriver";
import { Header } from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import { SingleLoadView } from "./components/views/SingleLoadView";
import { LoadsList } from "./components/Load/LoadsList";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/load" element={<LoadsList />}></Route>
        <Route path="/load/:singleLoadId" element={<SingleLoadView />}></Route>
      </Routes>
    </>
  );
}

export default App;
