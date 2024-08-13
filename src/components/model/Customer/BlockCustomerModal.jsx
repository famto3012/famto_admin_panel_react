import { Modal } from "antd";
import axios from "axios";
import { useState } from "react";

const BlockCustomerModal = ({
  isVisible,
  onCancel,
  BASE_URL,
  token,
  customerId,
}) => {
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const handleBlockCustomer = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await axios.patch(
        `${BASE_URL}/admin/customers/block-customer/${customerId}`,
        { reason },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer${token}` },
        }
      );
      if (response.status === 200) {
        setReason(response.data.message);
        console.log(response.data.message);
      }
      console.log(reason);
    } catch (err) {
      console.error(`Error in blocking customer: ${err}`);
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
      <form onSubmit={handleBlockCustomer}>
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
        <div className="flex justify-end gap-4 mt-16 mx-10">
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

export default BlockCustomerModal;
