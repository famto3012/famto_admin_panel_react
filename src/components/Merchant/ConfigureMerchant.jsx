import { Switch } from "antd";

const ConfigureMerchant = ({ detail, allBusinessCategory, onDataChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onDataChange({
      ...detail,
      [name]: value,
      merchantDetail: {
        ...detail.merchantDetail,
        [name]: value,
      },
    });
  };

  const togglePreOrderStatus = (checked, name) => {
    onDataChange({
      ...detail,
      [name]: checked,
      merchantDetail: {
        ...detail.merchantDetail,
        [name]: checked,
      },
    });
  };

  return (
    <>
      <div className="mb-6">
        <h3 className="text-gray-700 font-bold mb-2">Configuration</h3>

        <div className="mb-4 flex">
          <label className="block mt-3 text-gray-700">Business category</label>
          <select
            name="businessCategoryId"
            value={detail?.merchantDetail?.businessCategoryId}
            onChange={handleInputChange}
            className="mt-2 p-2 ml-[11.5rem] w-[20rem] border rounded-md outline-none focus:outline-none"
          >
            <option defaultValue={"Select business category"} hidden>
              Select business category
            </option>
            {allBusinessCategory?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 flex ">
          <label className="block text-gray-700">If restaurant, then</label>
          <div className="flex items-center gap-[4rem]">
            <label className="mr-4 ml-[12.5rem] cursor-pointer">
              <input
                type="radio"
                name="merchantFoodType"
                value="Veg"
                checked={detail?.merchantDetail?.merchantFoodType === "Veg"}
                onChange={handleInputChange}
                className="mr-2  text-teal-600 focus:ring-teal-500"
              />{" "}
              Veg
            </label>
            <label className="mr-4 cursor-pointer">
              <input
                type="radio"
                name="merchantFoodType"
                value="Non-veg"
                checked={detail?.merchantDetail?.merchantFoodType === "Non-veg"}
                onChange={handleInputChange}
                className="mr-2  text-teal-600 focus:ring-teal-500"
              />{" "}
              Non-Veg
            </label>
            <label className="mr-4 cursor-pointer">
              <input
                type="radio"
                name="merchantFoodType"
                value="Both"
                checked={detail?.merchantDetail?.merchantFoodType === "Both"}
                onChange={handleInputChange}
                className="mr-2 text-teal-600 focus:ring-teal-500"
              />{" "}
              Both
            </label>
          </div>
        </div>

        <div className="mb-4 flex ">
          <label className="block text-gray-700">Delivery option</label>
          <div className="flex items-center gap-[4rem]">
            <label className="mr-4 ml-[12.5rem] cursor-pointer">
              <input
                type="radio"
                name="deliveryOption"
                value="On-demand"
                checked={detail?.merchantDetail?.deliveryOption === "On-demand"}
                onChange={handleInputChange}
                className="mr-2  text-teal-600 focus:ring-teal-500"
              />{" "}
              On-demand
            </label>
            <label className="mr-4 cursor-pointer">
              <input
                type="radio"
                name="deliveryOption"
                value="Scheduled"
                checked={detail?.merchantDetail?.deliveryOption === "Scheduled"}
                onChange={handleInputChange}
                className="mr-2  text-teal-600 focus:ring-teal-500"
              />{" "}
              Scheduled
            </label>
            <label className="mr-4 cursor-pointer">
              <input
                type="radio"
                name="deliveryOption"
                value="Both"
                checked={detail?.merchantDetail?.deliveryOption === "Both"}
                onChange={handleInputChange}
                className="mr-2 text-teal-600 focus:ring-teal-500"
              />{" "}
              Both
            </label>
          </div>
        </div>

        <div className="mb-4 flex">
          <label className="block mt-3 text-gray-700">
            Select Delivery time
          </label>
          <input
            type="text"
            name="deliveryTime"
            value={detail?.merchantDetail?.deliveryTime}
            onChange={handleInputChange}
            className="mt-2 ml-[11.5rem] p-2 w-[20rem] border rounded-md outline-none focus:outline-none"
            placeholder="Time (in minutes)"
          />
        </div>

        <div className="w-[650px]">
          <p className="text-gray-500 ml-[20.5rem] right-0 text-sm mt-2">
            Note: Enter here the default time taken for the Delivery of an
            order. If a merchant is handling their delivery by itself then he
            will enter his/her own delivery time.
          </p>
        </div>

        <div className="mb-10 mt-6 flex">
          <label className="block mt-3 text-gray-700">
            Pre Order Sales Status
          </label>

          <Switch
            name="preOrderStatus"
            checked={detail?.merchantDetail?.preOrderStatus}
            onChange={(checked) =>
              togglePreOrderStatus(checked, "preOrderStatus")
            }
            className="mt-5 ml-[11.5rem]"
          />
        </div>
      </div>

      <div className="mb-6 flex">
        <h3 className="text-black mb-2 flex">Serving Area</h3>
        <div className="mb-4 ">
          <div className="grid ml-[15rem] gap-3">
            <label className="mr-4 text-gray-700 text-[14px] cursor-pointer">
              <input
                type="radio"
                name="servingArea"
                value="No-restrictions"
                checked={
                  detail?.merchantDetail?.servingArea === "No-restrictions"
                }
                onChange={handleInputChange}
                className="mr-2 form-radio text-teal-600 focus:ring-teal-500"
              />{" "}
              No Serving restrictions (I serve everywhere)
            </label>
            <label className="mr-6 text-gray-700 w-[20rem] text-[14px] flex-col space-x-3 cursor-pointer">
              <input
                type="radio"
                name="servingArea"
                value="Mention-radius"
                checked={
                  detail?.merchantDetail?.servingArea === "Mention-radius"
                }
                onChange={handleInputChange}
                className="mr-2 form-radio text-teal-600 focus:ring-teal-500"
              />{" "}
              Mention a radius around the central location of my merchant. Your
              store will serve within a this radius around your central
              location. Note: Serving radius 0 means that the Restaurant can
              serve anywhere.
            </label>
          </div>
          {detail?.merchantDetail?.servingArea === "Mention-radius" && (
            <input
              type="text"
              name="servingRadius"
              value={detail?.merchantDetail?.servingRadius}
              onChange={handleInputChange}
              className="mt-6 ml-[15rem] p-2 w-[20rem] border rounded-md outline-none focus:outline-none"
              placeholder="Serving Radius (in km)"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ConfigureMerchant;
