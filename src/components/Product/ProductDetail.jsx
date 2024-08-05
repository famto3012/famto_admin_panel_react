import { useEffect, useState } from "react";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";

const ProductDetail = ({ detail, BASE_URL, token }) => {
  const [productDetail, setProductDetail] = useState({
    productName: "",
    price: "",
    description: "",
    availableQuantity: "",
    alert: "",
    variants: [],
  });

  const [variants, setVariants] = useState([{ name: "", price: "" }]);

  const [addVariantForm, setAddVariantForm] = useState(null);

  useEffect(() => {
    setProductDetail(detail);
    setAddVariantForm(productDetail?.varinats?.length > 0 ? true : false);
  }, [detail]);

  const handleChange = (e) => {
    setProductDetail({ ...productDetail, [e.target.name]: e.target.value });
  };

  const toggleAddVariant = () => {
    setAddVariantForm(true);
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

        {productDetail?.variants?.length === 0 && (
          <div className="flex justify-end me-5">
            <button
              className="bg-teal-700 py-2 px-3 text-white rounded-md"
              onClick={toggleAddVariant}
            >
              Add Variant
            </button>
          </div>
        )}

        {addVariantForm && (
          <>
            {productDetail?.variants[0]?.variantName && (
              <div className="p-5 flex justify-between">
                <label className="w-1/3 text-gray-700 items-center mt-2">
                  Variants
                </label>
                <select
                  name="variantName"
                  value={""}
                  className="border-gray-300 border rounded-md outline-none focus:outline-none w-2/3 p-2"
                >
                  {productDetail?.varinats?.map((variant) => (
                    <option value={variant.variantName}>
                      {variant.varinatName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="bg-gray-100 p-4 w-2/3 ms-auto mt-5 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Add Variants</h2>
              <div className="pb-5 flex justify-between">
                <label className="w-1/3 text-gray-700 items-center mt-2">
                  Variant Name
                </label>
                <input
                  type="text"
                  name="variant"
                  value={productDetail?.variant}
                  placeholder="variant"
                  onChange={handleChange}
                  className="border-gray-300 border rounded-md outline-none focus:outline-none w-2/3 p-2"
                />
              </div>
              <div className="flex justify-between w-2/3">
                <p>Variant 1</p>
                <p>value</p>
              </div>
              {productDetail?.variants?.map((variant, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    placeholder={`Variant ${index + 1}`}
                    value={variant.name}
                    onChange={(e) =>
                      handleChangeVariant(index, "name", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md mr-2"
                  />
                  <input
                    type="text"
                    placeholder="Price"
                    value={`₹${variant.price}`}
                    onChange={(e) =>
                      handleChangeVariant(index, "price", e.target.value)
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
          </>
        )}
      </form>
    </>
  );
};

export default ProductDetail;
