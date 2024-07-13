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
import Notificationlog from "./pages/admin/notifications/Notificationlog";
import Agentapp from "./pages/admin/appcustomization/Agentapp";
import MerchantApp from "./pages/admin/appcustomization/MerchantApp";
import Referral from "./pages/admin/marketing/Referral";
import PromoCode from "./pages/admin/marketing/PromoCode";
import Discount from "./pages/admin/marketing/Discount";
import CustomerApp from "./pages/admin/apps/CustomerApp";
import Customers from "./pages/admin/customers/Customers";
import CustomerDetails from "./pages/admin/customers/CustomerDetails";
import Commissionlog from "./pages/admin/commission/Commissionlog";
import Subscriptioncustomer from "./pages/admin/commission/Subscriptioncustomer";
import CreateOrder from "./pages/admin/order/CreateOrder";
import Pricing from "./pages/admin/pricing/Pricing";
import DeliveryAgent from "./pages/admin/agents/DeliveryAgent";
import AgentDetails from "./pages/admin/agents/AgentDetails";

import OrderDetails from "./pages/admin/orders/OrderDetails";
import Orders from "./pages/admin/orders/Orders";
import Products from "./pages/products/Products";
import Geofence from "./pages/admin/geofence/Geofence";
import AddGeofence from "./pages/admin/geofence/AddGeofence";

import DeliveryManagement from "./pages/admin/delivery-management/DeliveryManagement";
import Radio from "./pages/admin/settings/Radio";
import Commission from "./pages/admin/manager/Commission";
import Sarath from "./pages/admin/settings/Sarath";
import HomePage from "./pages/admin/home/HomePage";
import MyForm from "./pages/admin/order/MyForm";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/success" element={<Success />} />
        <Route path="/all-merchants" element={<Merchant />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/add-manager" element={<AddManager />} />
        <Route path="/update-manager" element={<UpdateManager />} />
        <Route path="/all-tax" element={<Tax />} />
        <Route path="/account-logs" element={<AccountLogs />} />
        <Route path="/all-managers" element={<Managers />} />
        <Route path="/push-notification" element={<PushNotification />} />
        <Route path="/alert-notification" element={<AlertNotification />} />
        <Route path="/notification-settings" element={<NotificationSettings />} />
        <Route path="/loyality-point" element={<LoyalityPoint />} />
        <Route path="/ad-banner" element={<Adbanner/>} />
        <Route path="/agent-app" element={<Agentapp/>} />
        <Route path="/notification-log" element={<Notificationlog/>} />
        <Route path="/merchant-app" element={<MerchantApp/>} />
        <Route path="/promo-code" element={<PromoCode />} />
        <Route path="/referral" element={<Referral />} />
        <Route path="/discount" element={<Discount />} />
        <Route path="/customer-app" element={<CustomerApp />} />
        <Route path="/customers" element={<Customers/>} />
        <Route path="/customer-detail/:cusomerId" element={<CustomerDetails/>} />
        <Route path="/view-commission" element={<Commissionlog />} />
        <Route path="/view-subscription" element={<Subscriptioncustomer/>} />
        <Route path="/create-order" element={<CreateOrder />} />
        <Route path="/pricing" element={<Pricing/>} />
        <Route path="/commission" element={<Commission/>} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/all-agents" element={<DeliveryAgent />} />
        <Route path="/agent-details/:agentId" element={<AgentDetails />} />
        <Route path="/order-details/:orderId" element={<OrderDetails />} />
        <Route path="/all-orders" element= {<Orders />} />
        <Route path="/products" element= {<Products />} />
        <Route path="/geofence" element={<Geofence/>} />
        <Route path="/add-geofence" element={<AddGeofence/>} />
        <Route path="/delivery-management" element={<DeliveryManagement />} />
        <Route path="/my-form" element={<MyForm/>} />
        <Route
          path="/merchant-detail/:merchantId"
          element={<MerchantDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
