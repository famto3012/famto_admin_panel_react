import React, { useContext, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import {
  DeleteOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { Switch, Modal } from "antd";
import AddCategoriesModal from "../../../components/model/ProductModels/AddCategoriesModal";
import { UserContext } from "../../../context/UserContext";
import EditCategoriesModal from "../../../components/model/ProductModels/EditCategoriesModal";
import EditProductItemModal from "../../../components/model/ProductModels/EditProductItemModal";
import AddProductItemModal from "../../../components/model/ProductModels/AddProductItemModal";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Products = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    alerts: "",
    variant: "",
  });
  const { token, role } = useContext(UserContext);
  const [selectedCategory, setSelectedCategory] = useState("");

  // UseStates for Show Modals

  const [isFormVisible, setFormVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleCategory, setIsModalVisibleCategory] = useState(false);
  const [isModalVisibleChange, setIsModalVisibleChange] = useState(false);
  const [isModalVisibleItems, setIsModalVisibleItems] = useState(false);
  const [isModalVisibleItemsEdit, setIsModalVisibleItemsEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isShowModalDeleteCustomer, setIsShowModalDeleteCustomer] =
    useState(false);

  const shakes = ["sharjah", "karikk", "shamam"];
  const categories = [
    "Most Popular",
    "Chef’s Special",
    "Punjabi Food",
    "Shakes",
    "Extras",
  ];
  const [variants, setVariants] = useState([
    { name: "Small", price: 10 },
    { name: "Medium", price: 10 },
  ]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
  };

  const categoryChange = () => {
    console.log(`Selected Category: ${selectedCategory}`);
  };

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const addVariant = () => {
    setVariants([...variants, { name: "", price: "" }]);
  };

  const removeVariant = (index) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };

  const handleChangeVariant = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showModalCategory = () => {
    setIsModalVisibleCategory(true);
  };

  const showModalChange = () => {
    setIsModalVisibleChange(true);
  };

  const showModalItems = () => {
    setIsModalVisibleItems(true);
  };

  const showModalItemsEdit = () => {
    setIsModalVisibleItemsEdit(true);
  };

  const showModalDelete = () => {
    setIsShowModalDelete(true);
  };

  const ShowModalDeleteCustomer = () => {
    setIsShowModalDeleteCustomer(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisibleCategory(false);
    setIsModalVisibleItemsEdit(false);
    setIsModalVisibleItems(false);
    setIsShowModalDeleteCustomer(false);
    setIsShowModalDeleteCustomer(false);
    setIsModalVisibleChange(false);
  };

  return (
    <>
      <Sidebar />
      <div className="pl-[300px] bg-gray-100">
        <nav className="p-5">
          <GlobalSearch />
        </nav>
        <div className="flex justify-between bg-white p-5 mx-5 rounded-md">
          <select
            name="name"
            value="merchant"
            className="bg-blue-50 p-2 rounded focus:outline-none outline-none"
          >
            <option value="option 1">Merchant Name</option>
          </select>
          <div>
            <input
              type="search"
              name="search"
              className="bg-gray-100 relative p-2 rounded-2xl"
              placeholder="Search records"
            />
            <SearchOutlined className="absolute -ml-7 mt-3" />
          </div>
        </div>
        <div className="flex">
          <div className="w-1/5 bg-white rounded-md m-5 mr-0">
            <div className="border-b-2 ">
              <h1 className="font-semibold pb-5 p-8 text-[18px]">Categories</h1>
            </div>
            {categories.map((category) => (
              <ul className="px-10 py-3">{category}</ul>
            ))}
            <div>
              <PlusOutlined
                className="rounded-full bg-teal-800 text-white p-3 ml-[40%] mt-24"
                onClick={showModal}
              />
              <button className="text-gray-500 ml-[20%]">
                {" "}
                Add Categories
              </button>

              <AddCategoriesModal
                isVisible={isModalVisible}
                handleCancel={handleCancel}
                token={token}
                BASE_URL={BASE_URL}
                role={role}
              />
            </div>
          </div>
          <div className="w-4/5 bg-white rounded-md m-5 ml-2">
            <div className="border-b-2 flex justify-between p-5">
              <h1 className="font-semibold flex ml-3 items-center text-[18px]">
                Shakes
              </h1>
              <div className="flex gap-5 items-center">
                Disabled <Switch /> Enable
                <button
                  className="bg-blue-50 p-2 flex items-center px-5 rounded-lg"
                  onClick={showModalCategory}
                >
                  <MdOutlineModeEdit className="text-xl mr-1" /> Edit
                </button>
                <EditCategoriesModal
                  isVisible={isModalVisibleCategory}
                  handleCancel={handleCancel}
                  token={token}
                  role={role}
                  BASE_URL={BASE_URL}
                />
                <button
                  className="bg-red-100 p-2 flex items-center rounded-lg px-3"
                  onClick={showModalDelete}
                >
                  <RiDeleteBin6Line className="text-xl mr-1 text-red-700" />{" "}
                  Delete
                </button>
                <Modal
                  onCancel={handleCancel}
                  footer={null}
                  open={isShowModalDelete}
                  centered
                >
                  <form>
                    <p className="font-bold text-[20px] mb-5">
                      Are you sure want to delete?
                    </p>
                    <div className="flex justify-end">
                      <button
                        className="bg-zinc-200 p-2 rounded-md font-semibold"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                      <button className="bg-red-100 p-2 rounded-md ml-3 px-2 text-red-700">
                        {" "}
                        Delete
                      </button>
                    </div>
                  </form>
                </Modal>
              </div>
            </div>
            <div className="flex">
              <div className=" border border-gray-200 w-1/3">
                {shakes.map((shake) => (
                  <ul className="px-10 py-3">{shake}</ul>
                ))}
                <div className="grid justify-center">
                  <PlusOutlined
                    className="rounded-full bg-teal-800 text-white p-3 ml-[40%] mt-24"
                    onClick={showModalItems}
                  />
                  <p className="text-gray-500"> Add Items</p>

                  <AddProductItemModal
                    isVisible={isModalVisibleItems}
                    handleCancel={handleCancel}
                    BASE_URL={BASE_URL}
                    token={token}
                    role={role}
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="p-5 flex justify-between">
                  <div className="flex w-2/3 gap-3">
                    <img src="shake.svg" />
                    <div>
                      <p className="font-semibold">Ice Nutella Shake</p>
                      <p className="text-teal-800 font-bold">₹ 12.00</p>
                    </div>
                  </div>
                  <div>
                    <button
                      className="bg-yellow-50 p-3 font-medium rounded-lg"
                      onClick={showModalChange}
                    >
                      Change Category
                    </button>
                    <Modal
                      title="Add Categories"
                      onCancel={handleCancel}
                      width="60rem"
                      open={isModalVisibleChange}
                      footer={null}
                    >
                      <form onChange={categoryChange}>
                        <div className="space-y-4">
                          {categories.map((category, index) => (
                            <label
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="radio"
                                name="category"
                                value={category}
                                checked={selectedCategory === category}
                                onChange={(e) =>
                                  setSelectedCategory(e.target.value)
                                }
                                className="text-teal-600"
                              />
                              <span className="text-gray-700">{category}</span>
                            </label>
                          ))}
                        </div>
                        <div className="mt-8 flex justify-end space-x-4">
                          <button
                            className="bg-gray-200 px-4 py-2 rounded-md"
                            onClick={() => setSelectedCategory("")}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-teal-600 text-white px-4 py-2 rounded-md"
                            onClick={categoryChange}
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </Modal>
                  </div>
                </div>
                <div className="flex justify-between p-5 items-center">
                  <p className="font-semibold">Product Details</p>
                  <div className="flex gap-5 items-center">
                    Inventory
                    <Switch />
                    <button
                      className="bg-blue-50 p-2 flex items-center outline-none focus:outline-none px-5 rounded-lg"
                      onClick={showModalItemsEdit}
                    >
                      <MdOutlineModeEdit className="text-xl mr-1" /> Edit
                    </button>
                    <EditProductItemModal
                      isVisible={isModalVisibleItemsEdit}
                      handleCancel={handleCancel}
                      BASE_URL={BASE_URL}
                      token={token}
                      role={role}
                    />
                    <button
                      className="bg-red-100 p-2 flex items-center rounded-lg px-3"
                      onClick={ShowModalDeleteCustomer}
                    >
                      <RiDeleteBin6Line className="text-xl mr-1 text-red-700" />{" "}
                      Delete
                    </button>
                    <Modal
                      onCancel={handleCancel}
                      footer={null}
                      open={isShowModalDeleteCustomer}
                      centered
                    >
                      <form>
                        <p className="font-bold text-[20px] mb-5">
                          Are you sure want to delete?
                        </p>
                        <div className="flex justify-end">
                          <button
                            className="bg-zinc-200 p-2 rounded-md font-semibold"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                          <button className="bg-red-100 p-2 rounded-md ml-3 px-2 text-red-700">
                            {" "}
                            Delete
                          </button>
                        </div>
                      </form>
                    </Modal>
                  </div>
                </div>
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="p-5 flex justify-between">
                      <label className="w-1/3 text-gray-700 items-center mt-2">
                        Product Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={product.name}
                        placeholder="Product Name"
                        onChange={handleChange}
                        className="border-gray-300 border rounded-md outline-none focus:outline-none w-2/3 p-2"
                      />
                    </div>
                    <div className="p-5 flex justify-between">
                      <label className="w-1/3 text-gray-700 items-center mt-2">
                        Product Price
                      </label>
                      <input
                        type="text"
                        name="price"
                        value={product.price}
                        placeholder="Product Price"
                        onChange={handleChange}
                        className="border-gray-300 border rounded-md outline-none focus:outline-none w-2/3 p-2"
                      />
                    </div>
                    <div className="p-5 flex justify-between">
                      <label className="w-1/3 text-gray-700 items-center mt-2">
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        value={product.description}
                        placeholder="Description"
                        onChange={handleChange}
                        className="border-gray-300 border rounded-md outline-none focus:outline-none w-2/3 p-2"
                      />
                    </div>
                    <div className="p-5 flex justify-between">
                      <label className="w-1/3 text-gray-700 items-center mt-2">
                        Available Qty
                      </label>
                      <input
                        type="text"
                        name="quantity"
                        value={product.quantity}
                        placeholder="quantity"
                        onChange={handleChange}
                        className="border-gray-300 border rounded-md outline-none focus:outline-none w-2/3 p-2"
                      />
                    </div>
                    <div className="p-5 flex justify-between">
                      <label className="w-1/3 text-gray-700 items-center mt-2">
                        Alerts <InfoCircleOutlined />
                      </label>
                      <input
                        type="text"
                        name="alerts"
                        value={product.alerts}
                        placeholder="Alerts"
                        onChange={handleChange}
                        className="border-gray-300 border rounded-md outline-none focus:outline-none w-2/3 p-2"
                      />
                    </div>
                    {/* <div className="max-w-md mx-auto p-4"> */}
                    <div className="p-5 flex justify-between">
                      <label className="w-1/3 text-gray-700 items-center mt-2">
                        Variants
                      </label>
                      <select
                        id="variants"
                        className="border-gray-300 border rounded-md outline-none focus:outline-none w-2/3 p-2"
                      >
                        <option>Chocolate</option>
                      </select>
                    </div>
                    <button className="ml-64" onClick={toggleFormVisibility}>
                      Add Variant
                    </button>
                    {isFormVisible && (
                      <div className="bg-gray-100 p-4 w-2/3 ms-auto mt-5 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">
                          Add Variants
                        </h2>
                        <div className="pb-5 flex justify-between">
                          <label className="w-1/3 text-gray-700 items-center mt-2">
                            Variant Name
                          </label>
                          <input
                            type="text"
                            name="variant"
                            value={product.variant}
                            placeholder="variant"
                            onChange={handleChange}
                            className="border-gray-300 border rounded-md outline-none focus:outline-none w-2/3 p-2"
                          />
                        </div>
                        <div className="flex justify-between w-2/3">
                          <p>Variant 1</p>
                          <p>value</p>
                        </div>
                        {variants.map((variant, index) => (
                          <div key={index} className="flex items-center mb-2">
                            <input
                              type="text"
                              placeholder={`Variant ${index + 1}`}
                              value={variant.name}
                              onChange={(e) =>
                                handleChangeVariant(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="w-full p-2 border border-gray-300 rounded-md mr-2"
                            />
                            <input
                              type="text"
                              placeholder="Price"
                              value={`₹${variant.price}`}
                              onChange={(e) =>
                                handleChangeVariant(
                                  index,
                                  "price",
                                  e.target.value
                                )
                              }
                              className="w-full p-2 border border-gray-300 rounded-md mr-2"
                            />
                            <button
                              type="button"
                              onClick={() => removeVariant(index)}
                              className="text-red-600"
                            >
                              <DeleteOutlined />
                            </button>
                          </div>
                        ))}
                        <div className="flex justify-between gap-3 mx-3">
                          <button
                            type="submit"
                            className="w-1/2 bg-zinc-200 p-2 rounded-md mt-4"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={addVariant}
                            className="w-1/2 bg-teal-800 text-white p-2 rounded-md mt-4"
                          >
                            Add variant
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
