import { useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import { useToast } from "@chakra-ui/react";

const AddMerchant = ({ isVisible, onCancel, BASE_URL, token }) => {
  const [merchantData, setMerchantData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleInputChange = (e) => {
    setMerchantData({ ...merchantData, [e.target.name]: e.target.value });
  };

  const addNewMerchant = async (e) => {
    e.preventDefault();
    console.log(merchantData);
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${BASE_URL}/merchants/admin/add-merchant`,
        merchantData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        onCancel();
        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in adding new merchant: ${err}`);

      if (err.response && err.response.data && err.response.data.errors) {
        const { errors } = err.response.data;
        setErrors({
          fullName: errors.fullName || "",
          email: errors.email || "",
          phoneNumber: errors.phoneNumber || "",
          password: errors.password || "",
          confirmPassword: errors.confirmPassword || "",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        title="Add Merchant"
        open={isVisible}
        centered
        width="600px"
        onCancel={onCancel}
        footer={null}
      >
        <form onSubmit={addNewMerchant}>
          <div className="flex flex-col gap-4 mt-6">
            {[
              { label: "Full Name", name: "fullName", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone Number", name: "phoneNumber", type: "text" },
              { label: "Password", name: "password", type: "password" },
              {
                label: "Confirm Password",
                name: "confirmPassword",
                type: "password",
              },
            ].map(({ label, name, type }) => (
              <div key={name} className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor={name}>
                  {label}
                </label>
                <div className="flex-1">
                  <input
                    className="w-full border-2 border-gray-300 rounded p-2 outline-none focus:outline-none"
                    type={type}
                    value={merchantData[name]}
                    name={name}
                    onChange={handleInputChange}
                  />
                  {errors[name] && (
                    <small className="text-red-500">{errors[name]}</small>
                  )}
                </div>
              </div>
            ))}
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-cyan-50 py-2 px-4 rounded-md"
                type="button"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className="bg-teal-800 text-white py-2 px-4 rounded-md"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Add Merchant"}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddMerchant;
