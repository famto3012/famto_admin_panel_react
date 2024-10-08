const itemTypes = [
  "Documents & Parcels",
  "Food & Groceries",
  "Clothing & Laundry",
  "Medical Supplies",
  "Personal Items",
  "Gifts & Flowers",
  "Electronics",
  "Household Items",
  "Books & Stationery",
  "Online Orders",
  "Pet Supplies",
  "Automotive Parts",
  "Others",
];

const orderStatusOption = [
  { value: "all", label: "All" },
  { value: "Pending", label: "Pending" },
  { value: "On-going", label: "On-going" },
  { value: "Completed", label: "Completed" },
  { value: "Cancelled", label: "Cancelled" },
];

const paymentModeOption = [
  { value: "all", label: "All" },
  { value: "Cash-on-delivery", label: "Cash on delivery" },
  { value: "Online-payment", label: "Online payment" },
  { value: "Famto-cash", label: "Famto cash" },
];

const deliveryModeOption = [
  { value: "all", label: "All" },
  { value: "Home Delivery", label: "Home Delivery" },
  { value: "Take Away", label: "Take Away" },
  { value: "Pick and Drop", label: "Pick and Drop" },
  { value: "Custom Order", label: "Custom Order" },
];

const serviceableOptions = [
  { value: "all", label: "All" },
  { value: "true", label: "Open" },
  { value: "false", label: "Closed" },
];

const agentStatusOptions = [
  { value: "all", label: "All" },
  { value: "Free", label: "Free" },
  { value: "Busy", label: "Busy" },
  { value: "Inactive", label: "Inactive" },
];

const agentVehicleOptions = [
  { value: "all", label: "All" },
  { value: "Bike", label: "Bike" },
  { value: "Scooter", label: "Scooter" },
];

const accountLogsOptions = [
  { value: "Agent", label: "Agent" },
  { value: "Merchant", label: "Merchant" },
  { value: "Customer", label: "Customer" },
];

const payoutPaymentStatus = [
  { value: "all", label: "All" },
  { value: "true", label: "Paid" },
  { value: "false", label: "Un-paid" },
];

export {
  itemTypes,
  orderStatusOption,
  paymentModeOption,
  deliveryModeOption,
  serviceableOptions,
  agentStatusOptions,
  agentVehicleOptions,
  accountLogsOptions,
  payoutPaymentStatus,
};
