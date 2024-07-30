import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import { useToast } from "@chakra-ui/react";

const EditMerchant = ({
  isVisible,
  toggleModal,
  merchantId,
  BASE_URL,
  token,
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
    const getMerchantData = async () => {
      try {
        if (!merchantId) {
          return;
        }

        const response = await axios.get(
          `${BASE_URL}/merchants/admin${merchantId}`
        );

        if (response.status === 200) {
          setMerchantData(response.data.data);
        }
      } catch (err) {
        console.log(`Error in getting merchant data: ${err}`);
        toast({
          title: "Error",
          description: `Error in getting merchant data`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
      }
    };

    getMerchantData();
  }, [merchantId]);

  const editHandler = async (e) => {
    e.preventDefault();
    try {
      setIsEditLoading(true);

      const response = await axios.put(
        `${BASE_URL}/admin/edit-merchant/${merchantId}`,
        merchantData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        toast({
          title: "Success",
          description: `Merchant saved successfully`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in saving merchant: ${err}`);
      toast({
        title: "Error",
        description: `Error in saving merchant data`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsEditLoading(false);
    }
  };

  return (
    <>
      <Modal
        title="Edit Merchant"
        open={isVisible}
        onCancel={toggleModal}
        footer={null}
      >
        <form onSubmit={editHandler}>
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
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button
                className="bg-teal-800 text-white py-2 px-4 rounded-md"
                type="submit"
                disabled={isEditLoading}
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
