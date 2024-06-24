import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./loginPage/LoginPage";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
