import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import ABM from "./Components/ABM/ABM";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/abm" element={<ABM />} />
      </Routes>
    </div>
  );
}

export default App;
