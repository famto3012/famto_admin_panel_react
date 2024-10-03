import { Modal } from "antd";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteMerchant = ({
  isVisible,
  onCancel,
  BASE_URL,
  token,
  merchantId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleDeleteMerchant = async () => {
    try {
      setIsLoading(true);

      const response = await axios.delete(
        `${BASE_URL}/merchants/admin/delete-merchant/${merchantId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        onCancel();
        navigate("/all-merchants");
        toast({
          title: "Success",
          description: `Merchant deleted successfully`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: `Error in deleting merchant`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Delete merchant"
      open={isVisible}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <>
        <p className="my-5 text-[16px] text-center">
          Are you sure to delete the merchant?
        </p>

        <div className="flex justify-end gap-4 mt-5">
          <button
            className="bg-cyan-100 text-black  py-2 px-4 rounded-md"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-md"
            onClick={handleDeleteMerchant}
          >
            {isLoading ? `Deleting...` : `Confirm`}
          </button>
        </div>
      </>
    </Modal>
  );
};

export default DeleteMerchant;
