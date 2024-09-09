import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const NewCustomer = ({ toggleNewCustomerForm, onAddCustomer }) => {
  const [newCustomer, setNewCustomer] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [showButtons, setShowButtons] = useState(true);

  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleSubmit = (e) => {
    if (
      !newCustomer.fullName ||
      !newCustomer.email ||
      !newCustomer.phoneNumber
    ) {
      toast({
        title: "Error",
        description: "Please fill up all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      return;
    }

    e.preventDefault();
    onAddCustomer(newCustomer);
    setShowButtons(false);
  };

  return (
    <div className="flex">
      <label className="w-1/3"></label>
      <div className="mt-6 p-6 bg-gray-200 rounded-lg shadow-lg w-1/2">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-gray-500">
            <p>
              <span className="text-black font-[600]">NB:</span> Customers will
              be added only after creating invoice.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-center">
              <label className="w-1/3 text-md font-medium mt-2">Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Name"
                className="w-2/3 px-3 py-2 bg-white rounded focus:outline-none outline-none"
                value={newCustomer.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/3 text-md font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-2/3 px-3 py-2 bg-white rounded focus:outline-none outline-none"
                value={newCustomer.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/3 text-md font-medium">Phone</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone number"
                className="w-2/3 px-3 py-2 bg-white rounded focus:outline-none outline-none"
                value={newCustomer.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {showButtons && (
            <div className="flex justify-between mt-5 gap-3">
              <button
                type="button"
                className="bg-cyan-100 px-4 py-2 w-1/2"
                onClick={toggleNewCustomerForm}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-teal-700 text-white px-4 py-2 rounded w-1/2"
              >
                Add Customer
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewCustomer;
