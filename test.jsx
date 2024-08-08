import { useEffect, useState } from "react";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Select from "react-select";

const ProductDetail = ({ detail, BASE_URL, token }) => {
  const [productDetail, setProductDetail] = useState({
    productName: "",
    price: "",
    description: "",
    availableQuantity: "",
    alert: "",
    variants: [],
  });

  const [showVariantForm, setShowVariantForm] = useState(false);

  useEffect(() => {
    setProductDetail(detail);
  }, [detail]);

  const handleChange = (e) => {
    setProductDetail({ ...productDetail, [e.target.name]: e.target.value });
  };

  const handleSelectVariant = (variant) => {
    console.log(variant.value);
  };

  const toggleAddVariant = (e) => {
    e.preventDefault();
    setShowVariantForm(!showVariantForm);
  };

  const addVariant = () => {
    setProductDetail((prevState) => ({
      ...prevState,
      variants: [...prevState.variants, { name: "", price: "" }],
    }));
  };

  const removeVariant = (index) => {
    setProductDetail((prevState) => ({
      ...prevState,
      variants: prevState.variants.filter((_, i) => i !== index),
    }));
  };

  const handleChangeExistingVariant = (index, field, value) => {
    const updatedVariants = [...productDetail.variants];
    updatedVariants[index][field] = value;
    setProductDetail((prevState) => ({
      ...prevState,
      variants: updatedVariants,
    }));
  };

  const handleChangeNewVariant = (index, field, value) => {
    const updatedVariants = [...productDetail.variants];
    updatedVariants[index][field] = value;
    setProductDetail((prevState) => ({
      ...prevState,
      variants: updatedVariants,
    }));
  };

  // Prepare options for the Select component
  const variantOptions = productDetail.variants.map((variant, index) => ({
    value: index,
    label: variant.variantName || `Variant ${index + 1}`,
  }));

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
            value={productDetail.productName}
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
            value={productDetail.price}
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
            value={productDetail.description}
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
            name="availableQuantity"
            value={productDetail.availableQuantity}
            placeholder="Available quantity"
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
            name="alert"
            value={productDetail.alert}
            placeholder="Alert"
            onChange={handleChange}
            className="border-gray-300 border rounded-md outline-none focus:outline-none w-2/3 p-2"
          />
        </div>

        <div className="p-5 flex justify-between">
          <label className="w-1/3 text-gray-700 items-center mt-2">
            Variants
          </label>
          <button
            className="bg-teal-700 py-2 px-3 text-white rounded-md outline-none focus:outline-none w-2/3"
            onClick={toggleAddVariant}
          >
            Add Variant
          </button>
        </div>

        {showVariantForm && (
          <div className="bg-gray-100 p-4 w-2/3 ms-auto mt-5 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Add Variant Types</h2>
            <div className="pb-5 flex justify-between">
              <label className="w-1/3 text-gray-700 items-center mt-2">
                Variant Name
              </label>
              <input
                type="text"
                name="variantName"
                value={productDetail?.variantName}
                placeholder="Variant name"
                onChange={handleChange}
                className="border-gray-300 border rounded-md outline-none focus:outline-none w-2/3 p-2"
              />
            </div>

            <div className="flex items-center mb-2">
              <input
                type="text"
                placeholder={`Variant name`}
                // value={variant.name}
                // onChange={(e) =>
                //   handleChangeVariant(index, "name", e.target.value)
                // }
                className="w-full p-2 border border-gray-300 rounded-md mr-2 outline-none focus:outline-none"
              />
              <input
                type="text"
                placeholder="Price"
                prefix="₹"
                // value={`${variant.price}`}
                // onChange={(e) =>
                //   handleChangeVariant(index, "price", e.target.value)
                // }
                className="w-full p-2 border border-gray-300 rounded-md mr-2 outline-none focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="text-red-600"
              >
                <DeleteOutlined />
              </button>
            </div>

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
                Add more
              </button>
            </div>
          </div>
        )}

        <div className="p-5 flex justify-between">
          <span className="w-1/3 "></span>
          <Select
            value={variantOptions[0]}
            isSearchable={false}
            placeholder={"Select variant type"}
            className="w-2/3"
            options={variantOptions}
            onChange={handleSelectVariant}
          />
        </div>

        <div className="bg-gray-100 p-4 w-2/3 ms-auto mt-5 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Add Variant Types</h2>
          <div className="pb-5 flex justify-between">
            <label className="w-1/3 text-gray-700 items-center mt-2">
              Variant Name
            </label>
            <input
              type="text"
              name="variantName"
              value={productDetail?.variantName}
              placeholder="Variant name"
              onChange={handleChange}
              className="border-gray-300 border rounded-md outline-none focus:outline-none w-2/3 p-2"
            />
          </div>

          <div className="flex items-center mb-2">
            <input
              type="text"
              placeholder={`Variant name`}
              // value={variant.name}
              // onChange={(e) =>
              //   handleChangeVariant(index, "name", e.target.value)
              // }
              className="w-full p-2 border border-gray-300 rounded-md mr-2 outline-none focus:outline-none"
            />
            <input
              type="text"
              placeholder="Price"
              prefix="₹"
              // value={`${variant.price}`}
              // onChange={(e) =>
              //   handleChangeVariant(index, "price", e.target.value)
              // }
              className="w-full p-2 border border-gray-300 rounded-md mr-2 outline-none focus:outline-none"
            />
            <button
              type="button"
              onClick={() => removeVariant(index)}
              className="text-red-600"
            >
              <DeleteOutlined />
            </button>
          </div>

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
              Add more
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProductDetail;
