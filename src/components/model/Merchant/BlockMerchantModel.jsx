import { useToast } from "@chakra-ui/react";
import { Modal } from "antd";
import axios from "axios";
import { useState } from "react";

const BlockMerchantModel = ({
  isVisible,
  onCancel,
  BASE_URL,
  token,
  merchantId,
  onBlock,
}) => {
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const toast = useToast();

  const handleBlockMerchant = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (!reason) {
        toast({
          title: "Error",
          description: `Please provide a reason`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });

        return;
      }

      const response = await axios.put(
        `${BASE_URL}/merchants/admin/block-merchant/${merchantId}`,
        { reasonForBlocking: reason },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setReason("");
        onBlock();
        onCancel();
        toast({
          title: "Success",
          description: `Merchant blocked successfully`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: `An error occoured, Please try again later`,
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
      title="Reason for Blocking"
      open={isVisible}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <form onSubmit={handleBlockMerchant}>
        <div className="flex items-center mt-10">
          <label htmlFor="reason" className="w-1/3 text-gray-500">
            Reason
          </label>
          <input
            type="text"
            id="reason"
            name="reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
          />
        </div>
        <div className="flex justify-end gap-4 mt-5">
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
            {isLoading ? `Saving...` : `Save`}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BlockMerchantModel;
