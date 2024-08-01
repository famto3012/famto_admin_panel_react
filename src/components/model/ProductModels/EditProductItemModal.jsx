import { Modal } from "antd";
import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdCameraAlt } from "react-icons/md";

const EditProductItemModal = ({
  isVisible,
  handleCancel,
  BASE_URL,
  token,
  role,
}) => {
  const [addData, setAddData] = useState({
    name: "",
    price: "",
    availableQty: "",
    alertQty: "",
    minQty: "",
    maxQty: "",
    costPrice: "",
    sku: "",
    discount: "",
    boughtTogether: "",
    preparationTime: "",
    searchTag: "",
    description: "",
    longDescription: "",
    type: "",
    imageUrl: "",
  });

  const handleInputChange = (e) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };

  const signupAction = (e) => {
    e.preventDefault();
    console.log(addData);
  };

  const [agentFileEdit, setAgentFileEdit] = useState(null);
  const [agentPreviewURLEdit, setAgentPreviewURLEdit] = useState(null);

  const handleAgentImageChangeEdit = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAgentFileEdit(file);
    setAgentPreviewURLEdit(URL.createObjectURL(file));
  };

  return (
    <Modal
      onCancel={handleCancel}
      // onOk={showModalOkItemsEdit}
      width="60rem"
      closeIcon={null}
      footer={null}
      open={isVisible}
    >
      <form onSubmit={signupAction} className="max-h-[30rem] overflow-auto">
        <div className="flex justify-between">
          <b>Edit Category name</b>
          <button className="flex bg-red-100 rounded-md p-2 outline-none focus:outline-none">
            <RiDeleteBinLine className=" text-[18px] text-red-900 mr-1" />
            {""}Delete
          </button>
        </div>
        <div className="flex flex-col gap-4 mt-5">
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="name">
              Product Name
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={addData.name}
              id="name"
              name="name"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="price">
              Price
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={addData.price}
              id="price"
              name="price"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="availableQty">
              Available Quantity
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={addData.availableQty}
              id="availableQty"
              name="availableQty"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="alertQty">
              Alert Quantity
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={addData.alertQty}
              id="alertQty"
              name="alertQty"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500 " htmlFor="minQty">
              Minimum Quantity to Order
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={addData.minQty}
              id="minQty"
              name="minQty"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="maxQty">
              Maximum Quantity to Order
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={addData.maxQty}
              id="maxQty"
              name="maxQty"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="costPrice">
              Cost Price
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={addData.costPrice}
              id="costPrice"
              name="costPrice"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="sku">
              SKU
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={addData.sku}
              id="sku"
              name="sku"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex mt-5  gap-4">
            <label className="w-1/2 text-gray-500" htmlFor="discount">
              Discount
            </label>
            <select
              name="discount"
              id="discount"
              value={addData.discount}
              onChange={handleInputChange}
              className="border-2 border-gray-100 rounded p-2 focus:outline-none w-full"
            >
              <option value="select" hidden selected>
                Discount
              </option>
              <option value="Option 1">Option 1</option>
            </select>
          </div>
          <div className="flex mt-5  gap-4">
            <label className="w-1/2 text-gray-500" htmlFor="boughtTogether">
              Often bought together
            </label>
            <select
              name="boughtTogether"
              id="boughtTogether"
              value={addData.boughtTogether}
              onChange={handleInputChange}
              className="border-2 border-gray-100 rounded p-2 focus:outline-none w-full"
            >
              <option value="select" hidden selected>
                often bought Together
              </option>
              <option value="Option 1">Option 1</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="preparationTime">
              Preparation Time
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={addData.preparationTime}
              id="preparationTime"
              name="preparationTime"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="searchTag">
              Search Tag
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={addData.searchTag}
              id="searchTag"
              name="searchTag"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="description">
              Description
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={addData.description}
              id="description"
              name="description"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="longDescription">
              Long description
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={addData.longDescription}
              id="longDescription"
              name="longDescription"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="type">
              Veg/Non-veg
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 mr-3 focus:outline-none"
              type="radio"
              id="veg"
              value="veg"
              checked={addData.type === "veg"}
              name="type"
              onChange={handleInputChange}
            />
            Veg
            <input
              className="border-2 border-gray-100 rounded p-2 mr-3 ml-5 focus:outline-none"
              type="radio"
              id="non-veg"
              value="non-veg"
              checked={addData.type === "non-veg"}
              name="type"
              onChange={handleInputChange}
            />
            non-veg
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="preparationTime">
              Preparation Time
            </label>

            <div className=" flex items-center gap-[30px]">
              {!agentPreviewURLEdit && (
                <div className="bg-gray-400  mt-5 h-16 w-16 rounded-md" />
              )}
              {agentPreviewURLEdit && (
                <figure className=" mt-5 h-16 w-16 rounded-md relative">
                  <img
                    src={agentPreviewURLEdit}
                    alt="profile"
                    className="w-full rounded h-full object-cover "
                  />
                </figure>
              )}
              <input
                type="file"
                name="agentImageEdit"
                id="agentImageEdit"
                className="hidden"
                onChange={handleAgentImageChangeEdit}
              />
              <label htmlFor="agentImageEdit" className="cursor-pointer ">
                <MdCameraAlt
                  className=" bg-teal-800  text-[40px] text-white p-6 h-16 w-16 mt-5 rounded"
                  size={30}
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              className="bg-cyan-50 py-2 px-4 rounded-md"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-teal-700 text-white py-2 px-4 rounded-md focus:outline-none"
              type="submit"
              // onClick={showModalOkItemsEdit}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditProductItemModal;
