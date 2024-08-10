import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import { useToast } from "@chakra-ui/react";

const EditMerchant = ({
  isVisible,
  onCancel,
  BASE_URL,
  token,
  data,
  merchantId,
}) => {
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

  const [isEditLoading, setIsEditLoading] = useState(false);

  const toast = useToast();

  const handleInputChange = (e) => {
    setMerchantData({ ...merchantData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setMerchantData(data);
  }, [data, merchantId]);

  const handleEditMerchant = async (e) => {
    e.preventDefault();
    try {
      setIsEditLoading(true);

      const response = await axios.put(
        `${BASE_URL}/merchants/admin/edit-merchant/${merchantId}`,
        merchantData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        onCancel();
        toast({
          title: "Success",
          description: `Merchant saved successfully`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in saving merchant: ${err}`);

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
      setIsEditLoading(false);
    }
  };

  return (
    <>
      <Modal
        title="Edit Merchant"
        open={isVisible}
        onCancel={onCancel}
        footer={null}
        centered
      >
        <form onSubmit={handleEditMerchant}>
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
              >
                {isEditLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditMerchant;
