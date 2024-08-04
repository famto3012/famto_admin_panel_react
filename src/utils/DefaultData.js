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

export {
  itemTypes,
  allCustomerCSVDataHeading,
  allOrdersCSVDataHeading,
  orderBillCSVDatHeading,
};
