import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import Signup from "./pages/auth/SignUp";

import Success from "./pages/auth/Success";
import AddMerchant from "./components/model/AddMerchant";
import EditMerchant from "./components/model/EditMerchant";
import Merchant from "./pages/admin/merchant/Merchant";

import Verification from "./pages/auth/Verification";
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
        <Route path="/all-merchants" element={<Merchant />} />

        <Route path="/verify" element={<Verification />} />
        <Route
          path="/merchant-detail/:merchantId"
          element={<MerchantDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
