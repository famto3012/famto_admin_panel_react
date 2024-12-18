import { Switch } from "antd";
import { useContext, useEffect } from "react";
import Select from "react-select";
import { UserContext } from "../../context/UserContext";

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

  useEffect(() => {
    console.log(detail);
  }, [detail]);

  const handleSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    onDataChange({
      ...detail,
      merchantDetail: {
        ...detail.merchantDetail,
        businessCategoryId: selectedValues,
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

  const businessCategoryOptions = allBusinessCategory?.map((category) => ({
    label: category.title,
    value: category._id,
  }));

  const foodCategoryIds = allBusinessCategory
    ?.filter((category) => category.title === "Food")
    .map((category) => category._id);

  const { role } = useContext(UserContext);

  return (
    <>
      <div className="mb-4 flex flex-col gap-[10px]">
        <h3 className="text-gray-700 font-bold mb-2">Configuration</h3>
        {role === "Admin" && (
          <div className="mb-4 flex w-[800px]">
            <label className="block mt-3 text-gray-700 w-1/3">
              Business category
            </label>

            <Select
              className="mt-2 w-3/5 rounded-md outline-none focus:outline-none"
              value={businessCategoryOptions?.filter((option) =>
                detail?.merchantDetail?.businessCategoryId?.includes(
                  option.value
                )
              )}
              isMulti={true}
              isSearchable={true}
              onChange={handleSelectChange}
              options={businessCategoryOptions}
              placeholder="Select business category"
              isClearable={true}
            />
          </div>
        )}

        {/*  */}
        {detail?.merchantDetail?.businessCategoryId?.includes(
          foodCategoryIds[0]
        ) && (
          <div className="mb-4 flex w-[800px]">
            <label className="block text-gray-700 w-1/3">If food, then</label>
            <div className="flex items-center gap-[4rem]">
              <label className="mr-4 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="merchantFoodType"
                    value="Veg"
                    checked={detail?.merchantDetail?.merchantFoodType === "Veg"}
                    onChange={handleInputChange}
                    className=" text-teal-600 focus:ring-teal-500"
                  />
                  <span>Veg</span>
                </div>
              </label>

              <label className="mr-4 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="merchantFoodType"
                    value="Non-veg"
                    checked={
                      detail?.merchantDetail?.merchantFoodType === "Non-veg"
                    }
                    onChange={handleInputChange}
                    className=" text-teal-600 focus:ring-teal-500"
                  />
                  <span>Non-Veg</span>
                </div>
              </label>

              <label className="mr-4 cursor-pointer">
                <input
                  type="radio"
                  name="merchantFoodType"
                  value="Both"
                  checked={detail?.merchantDetail?.merchantFoodType === "Both"}
                  onChange={handleInputChange}
                  className="mr-2 text-teal-600 focus:ring-teal-500"
                />
                Both
              </label>
            </div>
          </div>
        )}

        <div className="mb-4 flex w-[800px]">
          <label className="block text-gray-700 w-1/3">Delivery option</label>
          <div className="flex items-center gap-[4rem]">
            <label className="mr-4 cursor-pointer">
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

        <div className="mb-4 flex items-start w-[800px]">
          <label className="block text-gray-700 w-1/3">
            Select Delivery time
          </label>
          <input
            type="text"
            name="deliveryTime"
            value={detail?.merchantDetail?.deliveryTime}
            onChange={handleInputChange}
            className="p-2 w-[20rem] border rounded-md outline-none focus:outline-none"
            placeholder="Time (in minutes)"
          />
        </div>

        <div className="mb-4 flex w-[800px]">
          <span className="w-1/3"></span>
          <p className="text-gray-500 w-2/5 text-sm mt-2">
            Note: Enter here the default time taken for the Delivery of an
            order. If a merchant is handling their delivery by itself then he
            will enter his/her own delivery time.
          </p>
        </div>

        <div className="mb-4 flex w-[800px]">
          <label className="block w-1/3 text-gray-700">
            Pre Order Sales Status
          </label>

          <Switch
            name="preOrderStatus"
            checked={
              detail?.merchantDetail?.preOrderStatus &&
              detail?.merchantDetail?.deliveryOption !== "On-demand"
            }
            onChange={(checked) =>
              togglePreOrderStatus(checked, "preOrderStatus")
            }
            disabled={detail?.merchantDetail?.deliveryOption === "On-demand"}
          />
        </div>
      </div>

      <div className="mb-6 flex w-[800px]">
        <h3 className="text-black mb-2 w-1/3">Serving Area</h3>
        <div className="mb-4 w3/5">
          <div className="flex flex-col gap-4">
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
              />
              <span className="text-[15px]">
                No Serving restrictions ( I serve everywhere )
              </span>
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
                className=" form-radio text-teal-600 focus:ring-teal-500"
              />
              <span className="text-[15px]">
                Mention a radius around the central location of my merchant.
                Your store will serve within a this radius around your central
                location.
              </span>
            </label>
          </div>
          {detail?.merchantDetail?.servingArea === "Mention-radius" && (
            <input
              type="number"
              name="servingRadius"
              value={detail?.merchantDetail?.servingRadius}
              onChange={handleInputChange}
              className="mt-6 p-2 w-[20rem] border rounded-md outline-none focus:outline-none"
              placeholder="Serving Radius (in km)"
              min={1}
              max={99}
              step={1} // This ensures only whole numbers are accepted
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ConfigureMerchant;
