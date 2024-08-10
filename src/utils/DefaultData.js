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

const allCustomerCSVDataHeading = [
  { label: "ID", key: "_id" },
  { label: "Name", key: "fullName" },
  { label: "Email", key: "email" },
  { label: "Phone Number", key: "phoneNumber" },
  { label: "Last Platform Used", key: "lastPlatformUsed" },
  { label: "Registration Date", key: "registrationDate" },
  { label: "Rating", key: "averageRating" },
];

const allOrdersCSVDataHeading = [
  { label: "Order ID", key: "_id" },
  { label: "Order Status", key: "orderStatus" },
  { label: "Merchant Name", key: "merchantName" },
  { label: "Customer Name", key: "customerName" },
  { label: "Delivery Mode", key: "deliveryMode" },
  { label: "Order Date", key: "orderDate" },
  { label: "Order Time", key: "orderTime" },
  { label: "Delivery Date", key: "deliveryDate " },
  { label: "Delivery Time", key: "deliveryTime" },
  { label: "Payment Method", key: "paymentMethod" },
  { label: "Delivery Option", key: "deliveryOption" },
  { label: "Amount", key: "amount" },
];

const orderBillCSVDatHeading = [
  { label: "Item Total", key: "itemTotal" },
  { label: "Delivery charges", key: "deliveryCharge" },
  { label: "Added Tip", key: "addedTip" },
  { label: "Discount", key: "discountedAmount" },
  { label: "Sub Total", key: "subTotal" },
  { label: "GST", key: "taxAmount" },
  { label: "Grand Total", key: "grandTotal" },
];

const agentPayoutCSVDataHeading = [
  { label: "Agent ID", key: "_id" },
  { label: "Name", key: "fullName" },
  { label: "Phone", key: "phoneNumber" },
  { label: "Worked Date", key: "workedDate" },
  { label: "Orders", key: "orders" },
  { label: "Cancelled orders", key: "cancelledOrders" },
  { label: "Total distance", key: "totalDistance" },
  { label: "Login Hours", key: "loginHours" },
  { label: "CIH", key: "cashInHand" },
  { label: "Total Earnings", key: "totalEarnings" },
  { label: "Status Approval", key: "paymentSettled" },
];

const allMerchantCSVDataHeading = [
  { label: "Merchant ID", key: "_id" },
  { label: "Merchant Name", key: "merchantName" },
  { label: "Phone Number", key: "phoneNumber" },
  { label: "Average Rating", key: "averageRating" },
  { label: "Approved", key: "isApproved" },
  { label: "Serviceable Today", key: "isServiceableToday" },
  { label: "Geofence", key: "geofence" },
];

export {
  itemTypes,
  allCustomerCSVDataHeading,
  allOrdersCSVDataHeading,
  orderBillCSVDatHeading,
  agentPayoutCSVDataHeading,
  allMerchantCSVDataHeading,
};
