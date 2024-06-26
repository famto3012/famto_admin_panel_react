import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/SignUp";

import Success from "./success/Success";
import AddMerchant from "./pages/model/AddMerchant";
import EditMerchant from "./pages/model/EditMerchant";
import Sidebar from "./pages/sidebar/Sidebar";
import Merchant from "./pages/admin/merchant/Merchant";

import Verification from "./verify/Verification";
import MerchantDetails from "./pages/admin/merchant/MerchantDetails";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/success" element={<Success />} />     
        <Route path="/addmerchant" element={<AddMerchant />} />
        <Route path="/editmerchant" element={<EditMerchant />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/merchant" element={<Merchant />} />
    
        </Routes>

        <Route path="/verify" element={<Verification />} />
        <Route path="/merchantdetails" element={<MerchantDetails />} />
      </Routes>

    </BrowserRouter>

  )
}

export default App
