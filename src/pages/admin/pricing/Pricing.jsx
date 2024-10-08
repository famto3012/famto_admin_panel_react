import React from "react";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import CustomerPricing from "../../../components/PricingComponents/CustomerPricing";
import AgentPricing from "../../../components/PricingComponents/AgentPricing";
import MerchantPricing from "../../../components/PricingComponents/MerchantPricing";

const Pricing = () => {
  return (
    <>
      <Sidebar />
      <div className="w-full h-screen pl-[300px] bg-gray-100">
        <nav className="p-5">
          <GlobalSearch />
        </nav>
        <h1 className="mx-9  text-xl font-bold">Pricing</h1>
        <AgentPricing />
        {/* <MerchantPricing /> */}
        <CustomerPricing />
      </div>
    </>
  );
};

export default Pricing;
