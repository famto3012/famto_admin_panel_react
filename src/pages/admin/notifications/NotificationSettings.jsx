import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { BellOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal, Switch } from "antd";
import { SearchOutlined } from "@mui/icons-material";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";

const NotificationSettings = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);

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

  const [dummyData, setDummyData] = useState([
    {
      event: "Event1",
      description: "A new event has occurred",
      admin: false,
      customer: false,
      driver: false,
      merchant: false,
      whatsapp: false,
      email: false,
      sms: false,
    },
    {
      event: "Event2",
      description:
        "The description for testing the switch height from the top of the table when the description exceeds.",
      admin: false,
      customer: false,
      driver: false,
      merchant: false,
      whatsapp: false,
      email: false,
      sms: false,
    },
  ]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleConfirm = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signupAction = (e) => {
    e.preventDefault();
    console.log(formData);
    handleCancel();
  };

  const showModalEdit = () => {
    setIsModalVisibleEdit(true);
  };

  const handleConfirmEdit = () => {
    setIsModalVisibleEdit(false);
  };

  const handleCancelEdit = () => {
    setIsModalVisibleEdit(false);
  };

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const showModalDelete = () => {
    setIsShowModalDelete(true);
  };

  const showModalDeleteOk = () => {
    setIsShowModalDelete(false);
  };

  const showModalDeleteCancel = () => {
    setIsShowModalDelete(false);
  };

  return (
    <>
      <Sidebar />
      <div className="w-full h-screen pl-[300px] bg-gray-100">
        <div className="flex justify-end p-4 gap-10">
          <BellOutlined className="text-2xl text-gray-500" />
          <div className="relative">
            <input
              type="search"
              name="search"
              placeholder="Search"
              className="bg-white h-10 px-10 pr-10 rounded-full text-sm focus:outline-none mr-3"
            />
            <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
              <SearchOutlined className="text-xl text-gray-600" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mx-[30px] mt-[20px]">
          <h1 className="text-xl font-bold">Notification Settings</h1>
          <div>
            <button
              className="bg-teal-700 text-white rounded-md flex items-center space-x-1 p-4"
              onClick={showModal}
            >
              <PlusOutlined className="mr-3" /> Add Notification
            </button>
            <Modal
              title="Add Notification"
              open={isModalVisible}
              onOk={handleConfirm}
              className="mt-10 "
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
                    <label
                      htmlFor="description"
                      className="text-gray-500 w-1/3"
                    >
                      Description (This note will be shown in notification)
                    </label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="border-2 border-gray-300 rounded p-6 w-2/3 outline-none focus:outline-none"
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
                    onClick={handleConfirm}
                  >
                    Save
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full mt-[20px]">
            <thead>
              <tr>
                {[
                  "Events",
                  "Description",
                  "Admin",
                  "Customer App",
                  "Driver App",
                  "Merchant App",
                  "Whatsapp",
                  "Email",
                  "SMS",
                  "Status",
                ].map((header) => (
                  <th
                    key={header}
                    className="bg-teal-700 text-white py-[20px] border-r-2"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dummyData.map((item) => (
                <tr className="bg-white w-full" key={item.event}>
                  <td className="px-7 py-4">{item.event}</td>
                  <td className="items-left px-4 py-4">{item.description}</td>
                  <td className="px-6 py-4">
                    <Switch />
                  </td>
                  <td className="px-6 py-4">
                    <Switch />
                  </td>
                  <td className="px-6 py-4">
                    <Switch />
                  </td>
                  <td className="px-6 py-4">
                    <Switch />
                  </td>
                  <td className="px-6 py-4">
                    <Switch />
                  </td>
                  <td className="px-6 py-4">
                    <Switch />
                  </td>
                  <td className="px-6 py-4">
                    <Switch />
                  </td>
                  <td>
                    <div className="flex justify-center items-center gap-3">
                      <div>
                        <Switch />
                      </div>
                      <button onClick={showModalEdit}>
                        <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                      </button>
                      <Modal
                        title="Edit Notification"
                        open={isModalVisibleEdit}
                        onOk={handleConfirmEdit}
                        className="mt-10"
                        onCancel={handleCancelEdit}
                        footer={null}
                      >
                        <form onSubmit={signupAction}>
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center">
                              <label
                                htmlFor="event"
                                className="w-1/3 text-gray-500"
                              >
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
                              <label
                                htmlFor="description"
                                className="text-gray-500 w-1/3"
                              >
                                Description (This note will be shown in
                                notification)
                              </label>
                              <input
                                type="text"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="border-2 border-gray-300 rounded p-6 w-2/3 outline-none focus:outline-none"
                              />
                            </div>
                          </div>
                          <section className="flex gap-16">
                            <div>
                              <div className="flex items-center mt-9">
                                <label className="text-gray-500">Admin</label>
                                <Switch
                                  className="ml-28"
                                  onChange={(checked) =>
                                    onChange("admin", checked)
                                  }
                                  name="admin"
                                />
                              </div>
                              <div className="flex items-center mt-4">
                                <label className="text-gray-500">
                                  Customer App
                                </label>
                                <Switch
                                  className="ml-16"
                                  onChange={(checked) =>
                                    onChange("customer", checked)
                                  }
                                  name="customer"
                                />
                              </div>
                              <div className="flex items-center mt-4">
                                <label className="text-gray-500">
                                  Driver App
                                </label>
                                <Switch
                                  className="ml-[85px]"
                                  onChange={(checked) =>
                                    onChange("driver", checked)
                                  }
                                  name="driver"
                                />
                              </div>
                              <div className="flex items-center mt-4">
                                <label className="text-gray-500">
                                  Merchant App
                                </label>
                                <Switch
                                  className="ml-16"
                                  onChange={(checked) =>
                                    onChange("merchant", checked)
                                  }
                                  name="merchant"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center mt-9">
                                <label className="text-gray-500">
                                  Whatsapp
                                </label>
                                <Switch
                                  className="ml-24"
                                  onChange={(checked) =>
                                    onChange("whatsapp", checked)
                                  }
                                  name="whatsapp"
                                />
                              </div>
                              <div className="flex items-center mt-4">
                                <label className="text-gray-500">Email</label>
                                <Switch
                                  className="ml-[125px]"
                                  onChange={(checked) =>
                                    onChange("email", checked)
                                  }
                                  name="email"
                                />
                              </div>
                              <div className="flex items-center mt-4">
                                <label className="text-gray-500">SMS</label>
                                <Switch
                                  className="ml-[130px]"
                                  onChange={(checked) =>
                                    onChange("sms", checked)
                                  }
                                  name="sms"
                                />
                              </div>
                            </div>
                          </section>
                          <div className="flex justify-end gap-4 mt-6">
                            <button
                              className="bg-cyan-50 py-2 px-4 rounded-md"
                              type="button"
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </button>
                            <button
                              className="bg-teal-700 text-white py-2 px-4 rounded-md"
                              type="submit"
                              onClick={handleConfirmEdit}
                            >
                              Confirm
                            </button>
                          </div>
                        </form>
                      </Modal>
                      <button onClick={showModalDelete}>
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                      <Modal
                        onOk={showModalDeleteOk}
                        onCancel={showModalDeleteCancel}
                        footer={null}
                        open={isShowModalDelete}
                        centered
                      >
                        <p className="font-semibold text-[18px] mb-5">
                          Are you sure want to delete?
                        </p>
                        <div className="flex justify-end">
                          <button
                            className="bg-cyan-100 px-5 py-1 rounded-md font-semibold"
                            onClick={showModalDeleteCancel}
                          >
                            Cancel
                          </button>
                          <button className="bg-red-100 px-5 py-1 rounded-md ml-3 text-red-700">
                            {" "}
                            Delete
                          </button>
                        </div>
                      </Modal>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default NotificationSettings;
