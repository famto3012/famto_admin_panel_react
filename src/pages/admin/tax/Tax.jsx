import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { Switch, Modal } from "antd";
import GlobalSearch from "../../../components/GlobalSearch";

const Tax = () => {
  const [tax, setTax] = useState({
    tax: "",
    name: "",
    type: "",
    merchant: "",
    geofence: "",
  });

  const handleInputchange = (e) => {
    setTax({ ...tax, [e.target.name]: e.target.value });
  };
  const submitAction = (e) => {
    e.preventDefault();

    console.log(tax);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);

  const showModalEdit = () => {
    setIsModalVisibleEdit(true);
    f;
  };

  const handleOkEdit = () => {
    setIsModalVisibleEdit(false);
  };

  const handleCancelEdit = () => {
    setIsModalVisibleEdit(false);
  };

  const handleRadioChange = (event) => {
    setTax((tax) => ({
      ...tax,
      type: event.target.value,
    }));
  };

  return (
    <>
      <Sidebar />

      <div className="pl-[300px] w-full">
        <nav className="p-5">
          <GlobalSearch />
        </nav>
        <div className="flex justify-between mt-5 mx-5">
          <h1 className="font-bold">Tax</h1>
          <button
            onClick={showModal}
            className="bg-teal-700 text-white px-5 rounded-lg p-2"
          >
            <PlusOutlined /> Add Tax
          </button>
          <Modal
            title="Add Tax"
            open={isModalVisible}
            className="mt-24"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null} // Custom footer to include form buttons
          >
            <form onSubmit={submitAction}>
              <div className="flex flex-col  gap-4 justify-between">
                <div className="flex gap-4">
                  <label className="w-1/2 text-gray-500">Tax Name</label>
                  <input
                    type="text"
                    className="border-2 border-gray-300 rounded p-2 w-2/3"
                    name="tax"
                    value={tax.tax}
                    onChange={handleInputchange}
                  />
                </div>
                <div className="flex  gap-4">
                  <label className="w-1/2 text-gray-500">Name</label>
                  <input
                    type="text"
                    className="border-2 border-gray-300 rounded p-2 w-2/3"
                    name="name"
                    value={tax.name}
                    onChange={handleInputchange}
                  />
                </div>
                <div className="flex gap-4">
                  <label className="w-1/2 text-gray-500">Tax Type</label>

                  <input
                    type="radio"
                    className="border-2 ml-24 border-gray-300 rounded "
                    name="fixed"
                    value="fixed"
                    checked={tax.type === "fixed"}
                    onChange={handleRadioChange}
                  />
                  <label className="w-1/2 text-gray-500">Fixed Amount</label>
                  <input
                    type="radio"
                    className=" border-gray-300 rounded  "
                    name="percentage"
                    value="percentage"
                    checked={tax.type === "percentage"}
                    onChange={handleRadioChange}
                  />
                  <label className="w-1/2 text-gray-500">Percentage</label>
                </div>
                <div className="flex gap-4">
                  <label className="w-1/2 text-gray-500">geoFence</label>
                  <select
                    className="border-2 border-gray-300 rounded p-2 w-2/3"
                    name="geofence"
                    value={tax.geofence}
                    onChange={handleInputchange}
                  >
                    <option value="TVM">TVM</option>
                    <option value="PMG">PMG</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <label className="w-1/2 text-gray-500">
                    Assign to Merchant
                  </label>
                  <select
                    className="border-2 border-gray-300 rounded p-2 w-2/3"
                    name="merchant"
                    value={tax.merchant}
                    onChange={handleInputchange}
                  >
                    <option value="option 1">Option 1</option>
                    <option value="option 2">Option 2 </option>
                  </select>
                </div>
                <div className="flex justify-end  gap-4">
                  <button
                    className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
                    onClick={handleCancel}
                    type="submit"
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
                    onClick={handleOk}
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </Modal>
        </div>

        <p className="ms-5 mt-8 text-gray-500">
          Make sure that taxes aren't duplicated under the same name on the
          platform.
          <span className="text-red-700">
            {" "}
            Two taxes under the same name cannot coexist.
          </span>
        </p>
        <div className="w-full">
          <table className="bg-white mt-[45px] text-center w-full">
            <thead>
              <tr>
                {[
                  "Tax Id",
                  "Tax Name",
                  "Tax",
                  "Fixed/Percentage",
                  "Assign to Merchant",
                  "Geofence",
                  "Status",
                ].map((header) => (
                  <th
                    key={header}
                    className="  bg-teal-800 text-center h-[70px] text-white"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr key={tax.id}>
                <td className="py-5 px-4 border-b  border-gray-100 underline underline-offset-2">
                  {tax.id}
                </td>
                <td className="py-2 px-4 border-b border-gray-100">
                  {tax.tax}
                </td>
                <td className="py-2 px-4 border-b border-gray-100">
                  {tax.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-100">
                  {tax.type}
                </td>
                <td className="py-2 px-4 border-b border-gray-100">
                  {tax.merchant}
                </td>
                <td className="py-2 px-4 border-b border-gray-100">
                  {tax.geofence}
                </td>
                <td className="py-5 px-4 border-b flex gap-3 justify-end border-gray-100">
                  <Switch
                    className="text-teal-700 mt-2"
                    checked={tax.status}
                    onChange={() => handleToggle(tax.id)}
                  />
                  <div>
                    <button onClick={showModalEdit}>
                      <EditOutlined className="bg-gray-200 p-3 rounded-lg" />
                    </button>
                    <Modal
                       title="Edit Tax"
                      open={isModalVisibleEdit}
                      onOk={handleOkEdit}
                      className="mt-24"
                      onCancel={handleCancelEdit}
                      footer={null} // Custom footer to include form buttons
                    >
                      <form onSubmit={submitAction}>
                        <div className="flex flex-col  gap-4 justify-between">
                          <div className="flex gap-4">
                            <label className="w-1/2 text-gray-500">
                              Tax Name
                            </label>
                            <input
                              type="text"
                              className="border-2 border-gray-300 rounded p-2 w-2/3"
                              name="tax"
                              value={tax.tax}
                              onChange={handleInputchange}
                            />
                          </div>
                          <div className="flex  gap-4">
                            <label className="w-1/2 text-gray-500">Name</label>
                            <input
                              type="text"
                              className="border-2 border-gray-300 rounded p-2 w-2/3"
                              name="name"
                              value={tax.name}
                              onChange={handleInputchange}
                            />
                          </div>
                          <div className="flex gap-4">
                            <label className="w-1/2 text-gray-500">Tax</label>

                            <input
                              type="radio"
                              className="border-2 ml-24 border-gray-300 rounded "
                              name="fixed"
                              value="fixed"
                              checked={tax.type === "fixed"}
                              onChange={handleRadioChange}
                            />
                            <label className="w-1/2 text-gray-500">
                              Fixed Amount
                            </label>
                            <input
                              type="radio"
                              className=" border-gray-300 rounded  "
                              name="percentage"
                              value="percentage"
                              checked={tax.type === "percentage"}
                              onChange={handleRadioChange}
                            />
                            <label className="w-1/2 text-gray-500">
                              Percentage
                            </label>
                          </div>
                          <div className="flex gap-4">
                            <label className="w-1/2 text-gray-500">
                              geoFence
                            </label>
                            <select
                              className="border-2 border-gray-300 rounded p-2 w-2/3"
                              name="geofence"
                              value={tax.geofence}
                              onChange={handleInputchange}
                            >
                              <option value="TVM">TVM</option>
                              <option value="PMG">PMG</option>
                            </select>
                          </div>
                          <div className="flex gap-4">
                            <label className="w-1/2 text-gray-500">
                              Assign to Merchant
                            </label>
                            <select
                              className="border-2 border-gray-300 rounded p-2 w-2/3"
                              name="merchant"
                              value={tax.merchant}
                              onChange={handleInputchange}
                            >
                              <option value="option 1">Option 1</option>
                              <option value="option 2">Option 2 </option>
                            </select>
                          </div>
                          <div className="flex justify-end  gap-4">
                            <button
                              className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
                              onClick={handleCancelEdit}
                              type="submit"
                            >
                              Cancel
                            </button>
                            <button
                              className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
                              onClick={handleOkEdit}
                              type="submit"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </form>
                    </Modal>
                  </div>

                  <DeleteOutlined className="bg-gray-200 text-red-600 p-3 rounded-lg" />
                </td>
                <td className="border-b border-gray-300"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tax;
