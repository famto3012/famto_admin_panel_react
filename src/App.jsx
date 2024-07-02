import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import Signup from "./pages/auth/SignUp";

import Success from "./pages/auth/Success";
import AddMerchant from "./components/model/MerchantModels/AddMerchant";
import EditMerchant from "./components/model/MerchantModels/EditMerchant";
import Merchant from "./pages/admin/merchant/AllMerchant";
import Tax from "./pages/admin/tax/Tax";
import Verification from "./pages/auth/Verification";
import MerchantDetails from "./pages/admin/merchant/MerchantDetails";
import Settings from "./pages/admin/settings/Settings";
import Rating from "./components/model/MerchantModels/Rating";
import AddManager from "./pages/admin/manager/AddManager";
import UpdateManager from "./pages/admin/manager/UpdateManager";
import AccountLogs from "./pages/admin/manager/AccountLogs";
import Managers from "./pages/admin/manager/Managers";
import PushNotification from "./pages/admin/notifications/PushNotification";
import AlertNotification from "./pages/admin/notifications/AlertNotification";
import NotificationSettings from "./pages/admin/notifications/NotificationSettings";
import LoyalityPoint from "./pages/admin/marketing/LoyalityPoint";
import Adbanner from "./pages/admin/marketing/Adbanner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/success" element={<Success />} />
        <Route path="/all-merchants" element={<Merchant />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/add-manager" element={<AddManager />} />
        <Route path="/update-manager" element={<UpdateManager />} />
        <Route path="/all-tax" element={<Tax />} />
        <Route path="/account-logs" element={<AccountLogs />} />
        <Route path="/all-managers" element={<Managers />} />
        <Route path="/push-notification" element={< PushNotification />} />
        <Route path="/alert-notification" element={<AlertNotification />} />
        <Route path="/notification-settings" element={<NotificationSettings />} />
        <Route path="/loyality-point" element={<LoyalityPoint />} />
        <Route path="/ad-banner" element={<Adbanner/>} />
        <Route
          path="/merchant-detail/:merchantId"
          element={<MerchantDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
