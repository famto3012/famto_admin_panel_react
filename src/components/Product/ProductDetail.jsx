import { useEffect, useState } from "react";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Select from "react-select";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { Tooltip } from "antd";
import DeleteVariantTypeModal from "../model/ProductModels/DeleteVariantTypeModal";

const ProductDetail = ({ detail, BASE_URL, token, role }) => {
  const [productDetail, setProductDetail] = useState(detail);
  const [newVariantData, setNewVariantData] = useState({
    variantName: "",
    variantTypes: [],
  });

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [variantDetail, setVariantDetail] = useState(null);
  const [selectedVariantTypeId, setSelectedVariantTypeId] = useState(null);

  const [isNewSaveLoading, setIsNewSaveLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  const [showNewVariantForm, setShowNewVariantForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (detail?.variants?.length > 0) {
      const initialVariant = {
        value: 0,
        label: detail.variants[0].variantName || "Variant 1",
      };
      setSelectedVariant(initialVariant);
      setVariantDetail(detail.variants[0]);
    }
    setProductDetail(detail);
  }, [detail]);

  useEffect(() => {
    if (selectedVariant) {
      const currentDetail = productDetail.variants[selectedVariant.value];
      setVariantDetail(currentDetail);
    }
  }, [selectedVariant, productDetail.variants, productDetail]);

  const variantOptions = productDetail.variants.map((variant, index) => ({
    value: index,
    label: variant.variantName || `Variant ${index + 1}`,
  }));

  const handleSelectVariant = (variant) => {
    setSelectedVariant(variant);
  };

  const addExistingVariantTypeRow = (e) => {
    e.preventDefault();
    if (variantDetail) {
      setVariantDetail((prev) => ({
        ...prev,
        variantTypes: [...prev.variantTypes, { typeName: "", price: "" }],
      }));
    }
  };

  const addNewVariantTypeRow = (e) => {
    e.preventDefault();
    setNewVariantData((prev) => ({
      ...prev,
      variantTypes: [...prev.variantTypes, { typeName: "", price: "" }],
    }));
  };

  const removeExistingVariantType = (index, variantTypeId) => {
    console.log(index);
    console.log(variantTypeId);
    if (variantTypeId) {
      setSelectedVariantTypeId(variantTypeId);
      setShowDeleteModal(true);
    } else {
      setVariantDetail((prev) => ({
        ...prev,
        variantTypes: prev.variantTypes.filter((_, i) => i !== index),
      }));
    }
  };

  const removeNewVariantType = (index) => {
    setNewVariantData((prev) => ({
      ...prev,
      variantTypes: prev.variantTypes.filter((_, i) => i !== index),
    }));
  };

  const toggleNewVariantForm = (e) => {
    e.preventDefault();
    setShowNewVariantForm(!showNewVariantForm);
  };

  const handleChangeExistingVariant = (index, field, value) => {
    if (variantDetail) {
      const updatedVariantTypes = [...variantDetail.variantTypes];
      updatedVariantTypes[index][field] = value;
      setVariantDetail((prev) => ({
        ...prev,
        variantTypes: updatedVariantTypes,
      }));
    }
  };

  const handleInputChange = (index, name, value) => {
    setNewVariantData((prev) => ({
      ...prev,
      variantTypes: prev.variantTypes.map((type, i) =>
        i === index ? { ...type, [name]: value } : type
      ),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (variantDetail) {
      setVariantDetail((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCancel = () => {
    setSelectedVariantTypeId(null);
    setShowDeleteModal(false);
  };

  const handleFilterDeleteVariantType = (variantTypeId) => {
    setVariantDetail((prev) => ({
      ...prev,
      variantTypes: prev.variantTypes.filter(
        (type) => type._id !== variantTypeId
      ),
    }));
  };

  const handleAddNewVariant = async (e) => {
    e.preventDefault();
    try {
      setIsNewSaveLoading(true);
      const response = await axios.post(
        `${BASE_URL}/products/${productDetail._id}/add-variants`,
        newVariantData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Variant added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setProductDetail((prevDetail) => ({
          ...prevDetail,
          variants: [...prevDetail.variants, response.data.data.variants.pop()],
        }));

        setNewVariantData({
          variantName: "",
          variantTypes: [],
        });

        setShowNewVariantForm(false);
      }
    } catch (err) {
      console.error("Error in adding new variants:", err);
      toast({
        title: "Error",
        description: "Error in adding new variants",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsNewSaveLoading(false);
    }
  };

  const handleSaveVariants = async (e) => {
    e.preventDefault();
    try {
      setIsSaveLoading(true);
      const response = await axios.put(
        `${BASE_URL}/products/${productDetail._id}/variants/${variantDetail._id}`,
        variantDetail,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Variant updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error("Error in saving variants:", err);
      toast({
        title: "Error",
        description: "Error in updating variant",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSaveLoading(false);
    }
  };

  return (
    <>
      <form>
        <div className="p-5 flex justify-between">
          <label className="w-1/3 text-gray-700 items-center mt-2">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            value={productDetail?.productName || "-"}
            readOnly
            className="bg-gray-200 rounded-md outline-none focus:outline-none w-2/3 p-2"
          />
        </div>

        <div className="p-5 flex justify-between">
          <label className="w-1/3 text-gray-700 items-center mt-2">
            Product Price
          </label>
          <input
            type="text"
            name="price"
            value={role === "Admin" ? productDetail?.price || "-" : productDetail?.costPrice || "-"}
            readOnly
            className="bg-gray-200 rounded-md outline-none focus:outline-none w-2/3 p-2"
          />
        </div>

        <div className="p-5 flex justify-between">
          <label className="w-1/3 text-gray-700 items-center mt-2">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={productDetail?.description || "-"}
            readOnly
            className="bg-gray-200 rounded-md outline-none focus:outline-none w-2/3 p-2"
          />
        </div>

        <div className="p-5 flex justify-between">
          <label className="w-1/3 text-gray-700 items-center mt-2">
            Long Description
          </label>

          <textarea
            name="longDescription"
            value={productDetail?.longDescription || "-"}
            readOnly
            rows={5}
            className="bg-gray-200 rounded-md outline-none focus:outline-none w-2/3 p-2 resize-none"
          ></textarea>
        </div>

        <div className="p-5 flex justify-between">
          <label className="w-1/3 text-gray-700 items-center mt-2">
            Available Qty
          </label>
          <input
            type="text"
            name="availableQuantity"
            value={productDetail?.availableQuantity || "-"}
            readOnly
            className="bg-gray-200 rounded-md outline-none focus:outline-none w-2/3 p-2"
          />
        </div>

        <div className="p-5 flex justify-between">
          <label className="flex items-center gap-2">
            Alerts
            <Tooltip title="Enter the minimum quantity at which you want to receive an e-mail for updating your inventory.">
              <InfoCircleOutlined />
            </Tooltip>
          </label>

          <input
            type="text"
            name="alert"
            value={productDetail?.alert || "-"}
            readOnly
            className="bg-gray-200 rounded-md outline-none focus:outline-none w-2/3 p-2"
          />
        </div>

        <div className="p-5 flex justify-between">
          <label className="w-1/3 text-gray-700 items-center mt-2">
            Variants
          </label>
          <button
            className="bg-teal-700 py-2 px-3 text-white rounded-md outline-none focus:outline-none w-2/3"
            onClick={toggleNewVariantForm}
          >
            Add Variant
          </button>
        </div>

        {showNewVariantForm && (
          <div className="bg-gray-100 p-4 w-2/3 ms-auto mt-5 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Add Variant Types</h2>
            <div className="pb-5 flex justify-between">
              <label className="w-1/3 text-gray-700 items-center mt-2">
                Variant Name
              </label>
              <input
                type="text"
                name="variantName"
                value={newVariantData?.variantName}
                placeholder="Variant name"
                onChange={(e) =>
                  setNewVariantData((prevData) => ({
                    ...prevData,
                    variantName: e.target.value,
                  }))
                }
                className="border-gray-300 border rounded-md outline-none focus:outline-none w-2/3 p-2"
              />
            </div>

            {newVariantData.variantTypes?.map((type, index) => (
              <div className="flex items-center mb-2" key={index}>
                <input
                  type="text"
                  placeholder="Variant type name"
                  value={type.typeName || ""}
                  onChange={(e) =>
                    handleInputChange(index, "typeName", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md mr-2 outline-none focus:outline-none"
                />
                {role === "Admin" && (
                  <input
                    type="number"
                    placeholder="Price"
                    value={type.price || ""}
                    onChange={(e) =>
                      handleInputChange(index, "price", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md mr-2 outline-none focus:outline-none"
                  />
                )}
                <input
                  type="number"
                  placeholder={role === "Admin" ? "Cost Price" : "Price"}
                  value={type.costPrice || ""}
                  onChange={(e) =>
                    handleInputChange(index, "costPrice", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md mr-2 outline-none focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeNewVariantType(index)}
                  className="text-red-600"
                >
                  <DeleteOutlined />
                </button>
              </div>
            ))}

            <div className="flex justify-between gap-3 mx-3">
              <button
                type="button"
                onClick={handleAddNewVariant}
                className="w-1/2 bg-zinc-200 p-2 rounded-md mt-4"
              >
                {isNewSaveLoading ? `Saving...` : `Save`}
              </button>
              <button
                type="button"
                onClick={addNewVariantTypeRow}
                className="w-1/2 bg-teal-800 text-white p-2 rounded-md mt-4"
              >
                Add more
              </button>
            </div>
          </div>
        )}

        {selectedVariant && (
          <>
            <div className="p-5 flex justify-between">
              <span className="w-1/3 "></span>
              <Select
                value={selectedVariant}
                isSearchable={false}
                placeholder="Select variant type"
                className="w-2/3"
                options={variantOptions}
                onChange={handleSelectVariant}
              />
            </div>

            <div className="bg-gray-100 p-4 w-2/3 ms-auto mt-5 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Add Variant Types</h2>
              {variantDetail && (
                <>
                  <div className="pb-5 flex justify-between">
                    <label className="w-1/3 text-gray-700 items-center mt-2">
                      Variant Name
                    </label>
                    <input
                      type="text"
                      name="variantName"
                      value={variantDetail.variantName || ""}
                      placeholder="Variant name"
                      onChange={handleChange}
                      className="border-gray-300 border rounded-md outline-none focus:outline-none w-2/3 p-2"
                    />
                  </div>

                  {variantDetail.variantTypes.map((type, index) => (
                    <div className="flex items-center mb-2" key={type._id}>
                      <input
                        type="text"
                        placeholder="Variant type name"
                        value={type.typeName || ""}
                        onChange={(e) =>
                          handleChangeExistingVariant(
                            index,
                            "typeName",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded-md mr-2 outline-none focus:outline-none"
                      />
                      {role === "Admin" && (
                        <input
                          type="number"
                          placeholder="Price"
                          value={type.price || ""}
                          onChange={(e) =>
                            handleChangeExistingVariant(
                              index,
                              "price",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded-md mr-2 outline-none focus:outline-none"
                        />
                      )}
                      <input
                        type="number"
                        placeholder={role === "Admin" ? "Cost price" : "Price"}
                        value={type.costPrice || ""}
                        onChange={(e) =>
                          handleChangeExistingVariant(
                            index,
                            "costPrice",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded-md mr-2 outline-none focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeExistingVariantType(index, type._id)
                        }
                        className="text-red-600"
                      >
                        <DeleteOutlined />
                      </button>
                    </div>
                  ))}
                </>
              )}

              <div className="flex justify-between gap-3 mx-3">
                <button
                  type="submit"
                  onClick={handleSaveVariants}
                  className="w-1/2 bg-zinc-200 p-2 rounded-md mt-4"
                >
                  {isSaveLoading ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={addExistingVariantTypeRow}
                  className="w-1/2 bg-teal-800 text-white p-2 rounded-md mt-4"
                >
                  Add more
                </button>
              </div>
            </div>
          </>
        )}
      </form>

      <DeleteVariantTypeModal
        isOpen={showDeleteModal}
        onCancel={handleCancel}
        BASE_URL={BASE_URL}
        token={token}
        productId={productDetail._id}
        variantId={variantDetail?._id}
        variantTypeId={selectedVariantTypeId}
        onDeleteVariantType={handleFilterDeleteVariantType}
      />
    </>
  );
};

export default ProductDetail;
