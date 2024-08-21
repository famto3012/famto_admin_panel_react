import { useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const DeductMoneyModal = ({
  isVisible,
  onCancel,
  BASE_URL,
  token,
  customerId,
  onDeductMoney,
}) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleDeductMoney = async (e) => {
    e.preventDefault();
    try {
      if (amount <= 0 || isNaN(amount)) {
        toast({
          title: "Error",
          description: `Enter a valid amount`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });

        return;
      }

      setIsLoading(true);

      const response = await axios.patch(
        `${BASE_URL}/admin/customers/deduct-money-from-wallet/${customerId}`,
        { amount },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        onDeductMoney(response.data.data);
        onCancel();
        setAmount("");
        toast({
          title: "Success",
          description: `Amount deducted from wallet successfully`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: `Error while deducting money from wallet`,
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
      title="Deduct Money"
      open={isVisible}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <form onSubmit={handleDeductMoney}>
        <div className="flex items-center mt-10">
          <label htmlFor="amountdeduct" className="w-1/3 text-gray-500">
            Amount(₹)
          </label>
          <input
            type="text"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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

export default DeductMoneyModal;
