import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GIFLoader from "./components/GIFLoader";
import AgentPayout from "./pages/admin/agents/AgentPayout";
import { UserContext } from "./context/UserContext";
import ForgotPassword from "./pages/auth/ForgotPassword";
import "./fonts.css";
import "./App.css";

const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const Signup = lazy(() => import("./pages/auth/SignUp"));
const Success = lazy(() => import("./pages/auth/Success"));
const Merchant = lazy(() => import("./pages/admin/merchant/AllMerchant"));
const Tax = lazy(() => import("./pages/admin/tax/Tax"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
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
const EditGeofence = lazy(() => import("./pages/admin/geofence/EditGeofence"));
const DeliveryManagement = lazy(() =>
  import("./pages/admin/delivery-management/DeliveryManagement")
);
const Commission = lazy(() => import("./pages/admin/commission/Commission"));
const HomePage = lazy(() => import("./pages/admin/home/HomePage"));

const playStoreLink = import.meta.env.VITE_APP_PLAYSTORE_LINK;
const appStoreLink = import.meta.env.VITE_APP_APPSTORE_LINK;

function App() {
  const { role } = useContext(UserContext);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsSmallScreen(window.innerWidth < 1080);
    };

    // Initial check
    checkScreenWidth();

    // Add event listener to check on window resize
    window.addEventListener("resize", checkScreenWidth);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  if (isSmallScreen) {
    return (
      <>
        <div>
          <figure
            className="w-full h-[50%] flex justify-center"
            style={{
              background: "linear-gradient(to bottom, #909090, #f0f0f0)",
            }}
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/famtowebsite.appspot.com/o/images%2Fhome-app.png?alt=media&token=dd07156a-19a0-4f36-98ab-53bbcf59531b"
              className=" h-[24rem] w-auto"
              alt="Famto app"
            />
          </figure>

          <form className="flex flex-col gap-[20px] items-center mx-8 md:mx-0">
            <p className="flex justify-center items-center text-center max-w-[100%] text-[20px] font-bold sm:text-[25px] md:text-[28px] lg:text-[30px] w-[80%] mt-5">
              For a better experience, Please download our app from Playstore /
              App Store.
            </p>
            <div className="mt-5 gap-2 ">
              <p className="flex justify-center text-[20px]">Download from</p>

              <div className="flex justify-center gap-3 mt-5 ">
                <a href="">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/famtowebsite.appspot.com/o/images%2Fplay-store.png?alt=media&token=c94ca732-53fa-4343-87c8-39f138fdf36f"
                    className=" md:border-gray-800 rounded-lg border-white h-12"
                  />
                </a>
                <a href="">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/famtowebsite.appspot.com/o/images%2Fapp-store.png?alt=media&token=0c68fe33-2a2e-42b7-9859-ee921a9e9cae"
                    className=" md:border-gray-800 rounded-lg border-white h-12"
                  />
                </a>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<GIFLoader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />

            {/* Auth Routes */}
            <Route path="/auth">
              <Route path="login" element={<LoginPage />} />
              <Route path="sign-up" element={<Signup />} />
              <Route path="success" element={<Success />} />
              <Route path="verify" element={<Verification />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
            </Route>
            <Route path="/all-orders" element={<Orders />} />
            <Route path="/order-details/:orderId" element={<OrderDetails />} />
            <Route path="/all-merchants" element={<Merchant />} />
            <Route
              path="/merchant-detail/:merchantId"
              element={<MerchantDetails />}
            />
            <Route path="/add-manager" element={<AddManager />} />
            {/* <Route path="/update-manager" element={<UpdateManager />} /> */}
            <Route
              path="/update-manager/:managerId"
              element={<UpdateManager />}
            />

            <Route
              path="/settings"
              element={role === "Admin" ? <Settings /> : <MerchantDetails />}
            />

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
              path="/customer-detail/:customerId"
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
            <Route path="/home" index element={<HomePage />} />
            <Route path="/all-agents" element={<DeliveryAgent />} />
            <Route path="/agent-details/:agentId" element={<AgentDetails />} />

            <Route path="/products" element={<Products />} />
            <Route path="/geofence" element={<Geofence />} />
            <Route path="/add-geofence" element={<AddGeofence />} />
            <Route path="/edit-geofence" element={<EditGeofence />} />
            <Route
              path="/delivery-management"
              element={<DeliveryManagement />}
            />
            <Route path="/agent-payout" element={<AgentPayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
