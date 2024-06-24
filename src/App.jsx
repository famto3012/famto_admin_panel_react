import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./loginPage/LoginPage";
import Signup from "./signup/SignUp";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
