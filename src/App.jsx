import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Addresscomponent from "./components/model/Addresscomponent";


const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const Signup = lazy(() => import("./pages/auth/SignUp"));
const Success = lazy(() => import("./pages/auth/Success"));
const Merchant = lazy(() => import("./pages/admin/merchant/AllMerchant"));
const Tax = lazy(() => import("./pages/admin/tax/Tax"));
const Verification = lazy(() => import("./pages/auth/Verification"));
const MerchantDetails = lazy(() =>
  import("./pages/admin/merchant/MerchantDetails")
);
const Settings = lazy(() => import("./pages/admin/settings/Settings"));
const AddManager = lazy(() => import("./pages/admin/manager/AddManager"));
const UpdateManager = lazy(() => import("./pages/admin/manager/UpdateManager"));
const AccountLogs = lazy(() => import("./pages/admin/manager/AccountLogs"));
const Managers = lazy(() => import("./pages/admin/manager/Managers"));
const PushNotification = lazy(() =>
  import("./pages/admin/notifications/PushNotification")
);
const AlertNotification = lazy(() =>
  import("./pages/admin/notifications/AlertNotification")
);
const NotificationSettings = lazy(() =>
  import("./pages/admin/notifications/NotificationSettings")
);
const LoyalityPoint = lazy(() =>
  import("./pages/admin/marketing/LoyalityPoint")
);
const Adbanner = lazy(() => import("./pages/admin/marketing/Adbanner"));
const Notificationlog = lazy(() =>
  import("./pages/admin/notifications/Notificationlog")
);
const Agentapp = lazy(() => import("./pages/admin/appcustomization/Agentapp"));
const MerchantApp = lazy(() =>
  import("./pages/admin/appcustomization/MerchantApp")
);
const Referral = lazy(() => import("./pages/admin/marketing/Referral"));
const PromoCode = lazy(() => import("./pages/admin/marketing/PromoCode"));
const Discount = lazy(() => import("./pages/admin/marketing/Discount"));
const CustomerApp = lazy(() => import("./pages/admin/apps/CustomerApp"));
const Customers = lazy(() => import("./pages/admin/customers/Customers"));
const CustomerDetails = lazy(() =>
  import("./pages/admin/customers/CustomerDetails")
);
const Commissionlog = lazy(() =>
  import("./pages/admin/commission/Commissionlog")
);
const Subscriptioncustomer = lazy(() =>
  import("./pages/admin/commission/Subscriptioncustomer")
);
const CreateOrder = lazy(() => import("./pages/admin/order/CreateOrder"));
const Pricing = lazy(() => import("./pages/admin/pricing/Pricing"));
const DeliveryAgent = lazy(() => import("./pages/admin/agents/DeliveryAgent"));
const AgentDetails = lazy(() => import("./pages/admin/agents/AgentDetails"));
const OrderDetails = lazy(() => import("./pages/admin/order/OrderDetails"));
const Orders = lazy(() => import("./pages/admin/order/Orders"));
const Products = lazy(() => import("./pages/admin/products/Products"));
const Geofence = lazy(() => import("./pages/admin/geofence/Geofence"));
const AddGeofence = lazy(() => import("./pages/admin/geofence/AddGeofence"));
const DeliveryManagement = lazy(() =>
  import("./pages/admin/delivery-management/DeliveryManagement")
);
const Commission = lazy(() => import("./pages/admin/manager/Commission"));
const HomePage = lazy(() => import("./pages/admin/home/HomePage"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Auth Routes */}
            <Route path="/auth">
              <Route path="login" element={<LoginPage />} />
              <Route path="sign-up" element={<Signup />} />
              <Route path="success" element={<Success />} />
              <Route path="verify" element={<Verification />} />
            </Route>

            <Route path="/all-orders" element={<Orders />} />
            <Route path="/order-details/:orderId" element={<OrderDetails />} />
            <Route path="/all-merchants" element={<Merchant />} />
            <Route
              path="/merchant-detail/:merchantId"
              element={<MerchantDetails />}
            />
            <Route path="/add-manager" element={<AddManager />} />
            <Route path="/update-manager" element={<UpdateManager />} />

            <Route path="/settings" element={<Settings />} />

            <Route path="/all-tax" element={<Tax />} />
            <Route path="/account-logs" element={<AccountLogs />} />
            <Route path="/all-managers" element={<Managers />} />
            <Route path="/push-notification" element={<PushNotification />} />
            <Route path="/alert-notification" element={<AlertNotification />} />
            <Route
              path="/notification-settings"
              element={<NotificationSettings />}
            />
            <Route path="/loyality-point" element={<LoyalityPoint />} />
            <Route path="/ad-banner" element={<Adbanner />} />
            <Route path="/agent-app" element={<Agentapp />} />
            <Route path="/notification-log" element={<Notificationlog />} />
            <Route path="/merchant-app" element={<MerchantApp />} />
            <Route path="/promo-code" element={<PromoCode />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/discount" element={<Discount />} />
            <Route path="/customer-app" element={<CustomerApp />} />
            <Route path="/customers" element={<Customers />} />
             <Route
              path="/customer-detail/:cusomerId"
              element={<CustomerDetails />}
            />
            <Route path="/view-commission" element={<Commissionlog />} />
            <Route
              path="/view-subscription"
              element={<Subscriptioncustomer />}
            />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/commission" element={<Commission />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/all-agents" element={<DeliveryAgent />} />
            <Route path="/agent-details/:agentId" element={<AgentDetails />} />

            <Route path="/products" element={<Products />} />
            <Route path="/geofence" element={<Geofence />} />
            <Route path="/add-geofence" element={<AddGeofence />} />
            <Route
              path="/delivery-management"
              element={<DeliveryManagement />}
            />
          
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
