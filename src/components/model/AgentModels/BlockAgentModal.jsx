import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Modal } from "antd";
import axios from "axios";

const BlockAgentModal = ({
  isVisible,
  onCancel,
  BASE_URL,
  token,
  agentId,
  onBlock,
}) => {
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleBlockAgent = async (e) => {
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

      const response = await axios.patch(
        `${BASE_URL}/admin/agents/block-agent/${agentId}`,
        { reason },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setReason("");
        onCancel();
        onBlock();
        toast({
          title: "Success",
          description: `Agent blocked successfully`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: `Error while blocking agent ${err}`,
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
      centered
      width="500px"
      open={isVisible}
      onCancel={onCancel}
      footer={null}
    >
      <div className="flex mt-5 gap-4">
        <label className="w-1/3 mt-2" htmlFor="reason">
          Reason
        </label>
        <input
          className="border-2 border-gray-100 rounded p-2 w-full  focus:outline-none"
          type="text"
          value={reason}
          id="reason"
          name="reason"
          onChange={(e) => setReason(e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-4 mt-5">
        <button className="bg-cyan-50 py-2 px-4 rounded-md" type="button">
          Cancel
        </button>
        <button
          className="bg-teal-700 text-white py-2 px-4 rounded-md focus:outline-none"
          type="submit"
          onClick={handleBlockAgent}
        >
          {isLoading ? `Saving...` : `Save`}
        </button>
      </div>
    </Modal>
  );
};

export default BlockAgentModal;
