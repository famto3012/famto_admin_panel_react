import { useState, useEffect } from "react";
import { Modal } from "antd";

const AddressModal = ({ isOpen, onClose, data, type, onUpdateAddress }) => {
  const [addressData, setAddressData] = useState(data);

  // Sync internal state with the data prop when the modal opens
  useEffect(() => {
    if (isOpen) {
      setAddressData(data);
    }
  }, [isOpen, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...addressData, [name]: value };
    setAddressData(updatedData);
    onUpdateAddress({ ...updatedData, type });
  };

  return (
    <Modal
      title={`${type} Address`}
      open={isOpen}
      onCancel={onClose}
      width="500px"
      centered
      footer={null}
    >
      <div className="flex">
        <div className="mt-6 p-6 bg-gray-200 rounded-lg shadow-lg w-full">
          <div>
            <div className="flex flex-col gap-3">
              <div className="flex item-center">
                <label className="w-1/3 text-md font-semibold mt-2">
                  Full Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="w-2/3 px-3 py-2 bg-white rounded focus:outline-none outline-none"
                  value={addressData.fullName || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex items-center">
                <label className="w-1/3 text-md font-medium">
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className="w-2/3 px-3 py-2 bg-white rounded focus:outline-none outline-none"
                  value={addressData.phoneNumber || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex items-center">
                <label className="w-1/3 text-md font-medium">
                  Flat/House no/Floor<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="flat"
                  placeholder="Flat/House no/Floor"
                  className="w-2/3 px-3 py-2 bg-white rounded focus:outline-none outline-none"
                  value={addressData.flat || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex items-center">
                <label className="w-1/3 text-md font-medium">
                  Area/Locality<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="area"
                  placeholder="Area/Locality"
                  className="w-2/3 px-3 py-2 bg-white rounded focus:outline-none outline-none"
                  value={addressData.area || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex items-center">
                <label className="w-1/3 text-md font-medium">
                  Nearby Landmark
                </label>
                <input
                  type="text"
                  name="landmark"
                  placeholder="Landmark"
                  className="w-2/3 px-3 py-2 bg-white rounded focus:outline-none outline-none"
                  value={addressData.landmark || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddressModal;
