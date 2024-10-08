import { useToast } from "@chakra-ui/react";
import { Modal, Switch } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSoundContext } from "../../../context/SoundContext";

const EditNotificatioModal = ({
  isVisible,
  handleCancel,
  token,
  BASE_URL,
  onEditNewData,
  currentEdit,
}) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setDataLoading] = useState(false);
  const { setNewOrder, setOrderRejected, setScheduledOrder } =
    useSoundContext();
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
  useEffect(() => {
    console.log(currentEdit);
    if (!token) {
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const addResponse = await axios.get(
          `${BASE_URL}/admin/notification/notification-setting/${currentEdit}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (addResponse.status === 200) {
          console.log("data in response is", addResponse.data.data);
          setFormData(addResponse.data.data);
          console.log(addResponse.data.message);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentEdit) {
      fetchData();
    }
  }, [token, navigate, currentEdit, BASE_URL]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onChange = (name, checked) => {
    setFormData({ ...formData, [name]: checked });
  };
  const signupAction = async (e) => {
    e.preventDefault();
    try {
      setDataLoading(true);
      const editResponse = await axios.put(
        `${BASE_URL}/admin/notification/notification-setting/${currentEdit}`,
        formData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (editResponse.status === 200) {
        handleCancel();
        onEditNewData(editResponse.data.data);
        toast({
          title: "Success",
          description: "Notification Updated Successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        if (editResponse.data.data.event === "newOrderCreated") {
          setNewOrder(editResponse.data.data.title);
        } else if (editResponse.data.data.event === "orderRejected") {
          setOrderRejected(editResponse.data.data.title);
        } else if (editResponse.data.data.event === "scheduledOrderCreated") {
          setScheduledOrder(editResponse.data.data.title);
        }
      }
    } catch (err) {
      console.log(`Error in fetching data:${err}`);
      toast({
        title: "Error",
        description: "There was an error creating the banner.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setDataLoading(false);
    }
    console.log(formData);
  };

  return (
    <Modal
      title="Edit Notification"
      open={isVisible}
      centered
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={signupAction}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <label htmlFor="event" className="w-1/3 text-gray-500">
              Event<span className="text-red-500 ms-2">*</span>
            </label>
            <input
              type="text"
              id="event"
              name="event"
              placeholder={isLoading ? "Loading data..." : ""}
              value={formData.event}
              onChange={handleInputChange}
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
            />
          </div>
          <div className="flex items-center mt-4">
            <label htmlFor="description" className="text-gray-500 w-1/3">
              Description (This note will be shown in notification)<span className="text-red-500 ms-2">*</span>
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
                checked={formData.admin}
                onChange={(checked) => onChange("admin", checked)}
                name="admin"
              />
            </div>
            <div className="flex items-center mt-4">
              <label className="text-gray-500">Customer App</label>
              <Switch
                className="ml-16"
                checked={formData.customer}
                onChange={(checked) => onChange("customer", checked)}
                name="customer"
              />
            </div>
            <div className="flex items-center mt-4">
              <label className="text-gray-500">Driver App</label>
              <Switch
                className="ml-[85px]"
                checked={formData.driver}
                onChange={(checked) => onChange("driver", checked)}
                name="driver"
              />
            </div>
            <div className="flex items-center mt-4">
              <label className="text-gray-500">Merchant App</label>
              <Switch
                className="ml-16"
                checked={formData.merchant}
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
                checked={formData.whatsapp}
                onChange={(checked) => onChange("whatsapp", checked)}
                name="whatsapp"
              />
            </div>
            <div className="flex items-center mt-4">
              <label className="text-gray-500">Email</label>
              <Switch
                className="ml-[125px]"
                checked={formData.email}
                onChange={(checked) => onChange("email", checked)}
                name="email"
              />
            </div>
            <div className="flex items-center mt-4">
              <label className="text-gray-500">SMS</label>
              <Switch
                className="ml-[130px]"
                checked={formData.sms}
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
            {isDataLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditNotificatioModal;
