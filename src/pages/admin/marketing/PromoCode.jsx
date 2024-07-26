import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { Switch, Modal, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import GlobalSearch from "../../../components/GlobalSearch";
import { UserContext } from "../../../context/UserContext";
import { MdCameraAlt, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddPromoCodeModal from "../../../components/model/promoCodeModals/AddPromoCodeModal";
import EditPromoCodeModal from "../../../components/model/promoCodeModals/EditPromoCodeModal";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const PromoCode = () => {
  const [formData, setFormData] = useState([]);
  const { token, role } = useContext(UserContext);
  const [currentPromo, setCurrentPromo] = useState(null);
  const [currentPromoEdit, setCurrentPromoEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BASE_URL}/admin/promocode/get-promocode`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          setFormData(response.data.data);
        }
      } catch (err) {
        console.error(`Error in fetch data, ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, role, navigate]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showModalEdit = (id) => {
    setCurrentPromoEdit(id);
    setIsModalVisibleEdit(true);
  };

  const showModalDelete = (promoId) => {
    setCurrentPromo(promoId);
    setIsShowModalDelete(true);
  };

  const handleCancel = () => {
    console.log("Cancel clicked")
    setIsModalVisible(false);
    setIsShowModalDelete(false);
    setIsModalVisibleEdit(false);
  };

  const removePromo = (currentPromo) => {
    setFormData(formData.filter((formData) => formData._id !== currentPromo));
  };

  const handleConfirmDelete = () => {
    setIsShowModalDelete(false);
    setCurrentPromo(null);
  };

  const handlePromoDelete = async (currentPromo) => {
    try {
      setIsLoading(true);
      const deleteResponse = await axios.delete(
        `${BASE_URL}/admin/promocode/delete-promocode/${currentPromo}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (deleteResponse.status === 200) {
        removePromo(currentPromo);
        handleConfirmDelete();
      }
    } catch (err) {
      console.error(
        `Error in deleting promoCode: ${err.response?.data?.message || err.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = (id) => {
    setFormData((prevAgent) =>
      prevAgent.map((agent) =>
        agent.id === id
          ? { ...formData, status: !agent.status }
          : agent
      )
    );
  }

  return (
    <>
      <Sidebar />

      <div className="pl-[300px] bg-gray-100 w-full h-fit">
        <div className="">
          <nav className="p-5">
            <GlobalSearch />
          </nav>

          <div className="mx-5 flex justify-between">
            <h1 className="font-bold text-[20px]">Promo codes</h1>
            <Switch
              onChange={(checked) => onChange("agent", checked)}
              name="referral"
            />
          </div>

          <p className="m-5 text-gray-500">
            Promo codes are exclusive discount vouchers that can be redeemed by
            the customers during the checkout process
            <span className="flex justify-start">
              You can create customized promotional codes with a detailed
              description that will be visible to customers
            </span>
          </p>
          <div className="flex justify-end pr-5 mb-10">
            <button
              className="bg-teal-800 text-white rounded-md px-4 py-2 font-semibold  flex items-center  space-x-1 outline-none focus:outline-none"
              onClick={showModal} // Call the function directly
            >
              <PlusOutlined /> <span>Add Promo codes</span>
            </button>

            <AddPromoCodeModal
              isVisible={isModalVisible}
              token={token}
              handleCancel={handleCancel}
              BASE_URL={BASE_URL}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="overflow-x-auto p-5 w-full">
            <thead>
              <tr className="p-5 w-full">
                {[
                  "Code",
                  "Type",
                  "Value",
                  "Maximum discount",
                  "Minimum order amount",
                  "Start Date",
                  "End Date",
                  "Description",
                  "Promo Application mode",
                  "Promo Applied on",
                  "Promo used (No. of Times)",
                  "Status",
                ].map((headers) => (
                  <th
                    key={headers}
                    className="bg-teal-800 text-white h-[70px] mt-10 px-5 text-center whitespace-nowrap"
                  >
                    {headers}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {formData.map((data) => (
                <tr className="text-center bg-white h-20" key={data._id}>
                  <td>{data.promoCode}</td>
                  <td>{data.promoType}</td>
                  <td>{data.discount}</td>
                  <td>{data.maxDiscountValue}</td>
                  <td>{data.minOrderAmount}</td>
                  <td>{data.fromDate}</td>
                  <td>{data.toDate}</td>
                  <td>{data.description}</td>
                  <td>{data.PromoApplicationMode}</td>
                  <td>{data.appliedOn}</td>
                  <td>{data.PromoUsed}</td>
                  <td>
                    <div className="flex gap-3 items-center">
                      <div>
                        <Switch
                          checked={data.status === "true" ? true : false}
                          onChange={() => handleToggle(data._id)} />
                      </div>
                      <div className="flex items-center">
                        <button onClick={() => showModalEdit(data._id)}>
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                        </button>

                        <EditPromoCodeModal
                          handleCancel={handleCancel}
                          isVisible={isModalVisibleEdit}
                          token={token}
                          currentPromoEdit={currentPromoEdit}
                          formData={formData}
                          BASE_URL={BASE_URL}
                        />
                      </div>
                      <button onClick={() => showModalDelete(data._id)}>
                        <RiDeleteBinLine className="bg-red-100 text-red-600 mr-3 p-2 text-[35px] rounded-lg" />
                      </button>
                      <Modal
                        onCancel={handleCancel}
                        footer={null}
                        open={isShowModalDelete}
                        centered
                      >
                        <p className="font-semibold text-[18px] mb-5">
                          <Spin spinning={isLoading}>
                            Are you sure you want to delete?
                          </Spin>
                        </p>
                        <div className="flex justify-end gap-5">
                          <button
                            className="bg-cyan-100 px-5 py-2 rounded-lg"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-red-100 px-5 py-2 rounded-lg font-semibold text-red-600"
                            onClick={() => handlePromoDelete(currentPromo)}
                          >
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

export default PromoCode;
