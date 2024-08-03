import { useToast } from "@chakra-ui/react";
import { Modal, Switch } from "antd";
import axios from "axios";
import React, { useState } from "react";

const AddNotificationModal = ({ isVisible, handleCancel, token, BASE_URL }) => {
  const toast = useToast();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formData, setFormData] = useState({
    event: "",
    description: "",
    admin: false,
    customer: false,
    driver: false,
    merchant: false,
    whatsapp: false,
    email: false,
    sms: false,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onChange = (name, checked) => {
    setFormData({ ...formData, [name]: checked });
  };

  const signupAction = async (e) => {
    e.preventDefault();
    try {
      setConfirmLoading(true);
      const addResponse = await axios.post(
        `${BASE_URL}/admin/notification/notification-setting`,
        formData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (addResponse === 201) {
        handleCancel();
        toast({
          title: "Created Notification",
          description: "Notification Created Successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/notification-settings");
      }
    } catch (err) {
      console.log(`Error in fetching data:${err}`);
      toast({
        title: "Error",
        description: "There was an error creating the banner.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setConfirmLoading(false);
    }
    console.log(formData);
  };

  return (
    <Modal
      title="Add Notification"
      open={isVisible}
      centered
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={signupAction}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <label htmlFor="event" className="w-1/3 text-gray-500">
              Event
            </label>
            <input
              type="text"
              id="event"
              name="event"
              value={formData.event}
              onChange={handleInputChange}
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
            />
          </div>
          <div className="flex items-center mt-4">
            <label htmlFor="description" className="text-gray-500 w-1/3">
              Description (This note will be shown in notification)
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="border-2 border-gray-300 rounded p-6 px-2 w-2/3 outline-none focus:outline-none"
            />
          </div>
        </div>
        <section className="flex gap-16">
          <div>
            <div className="flex items-center mt-9">
              <label className="text-gray-500">Admin</label>
              <Switch
                className="ml-28"
                onChange={(checked) => onChange("admin", checked)}
                name="admin"
              />
            </div>
            <div className="flex items-center mt-4">
              <label className="text-gray-500">Customer App</label>
              <Switch
                className="ml-16"
                onChange={(checked) => onChange("customer", checked)}
                name="customer"
              />
            </div>
            <div className="flex items-center mt-4">
              <label className="text-gray-500">Driver App</label>
              <Switch
                className="ml-[85px]"
                onChange={(checked) => onChange("driver", checked)}
                name="driver"
              />
            </div>
            <div className="flex items-center mt-4">
              <label className="text-gray-500">Merchant App</label>
              <Switch
                className="ml-16"
                onChange={(checked) => onChange("merchant", checked)}
                name="merchant"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center mt-9">
              <label className="text-gray-500">Whatsapp</label>
              <Switch
                className="ml-24"
                onChange={(checked) => onChange("whatsapp", checked)}
                name="whatsapp"
              />
            </div>
            <div className="flex items-center mt-4">
              <label className="text-gray-500">Email</label>
              <Switch
                className="ml-[125px]"
                onChange={(checked) => onChange("email", checked)}
                name="email"
              />
            </div>
            <div className="flex items-center mt-4">
              <label className="text-gray-500">SMS</label>
              <Switch
                className="ml-[130px]"
                onChange={(checked) => onChange("sms", checked)}
                name="sms"
              />
            </div>
          </div>
        </section>
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="bg-cyan-50 py-2 px-4 rounded-md"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-teal-700 text-white py-2 px-4 rounded-md"
            type="submit"
          >
            {confirmLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNotificationModal;
