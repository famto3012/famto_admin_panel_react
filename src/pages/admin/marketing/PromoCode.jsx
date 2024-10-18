import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { Switch, Modal, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import GlobalSearch from "../../../components/GlobalSearch";
import { UserContext } from "../../../context/UserContext";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddPromoCodeModal from "../../../components/model/promoCodeModals/AddPromoCodeModal";
import EditPromoCodeModal from "../../../components/model/promoCodeModals/EditPromoCodeModal";
import GIFLoader from "../../../components/GIFLoader";
import { useToast } from "@chakra-ui/react";
import { formatDate } from "../../../utils/formatter";
import { useDraggable } from "../../../hooks/useDraggable";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const PromoCode = () => {
  const [allPromocode, setAllPromocode] = useState([]);
  const { token, role } = useContext(UserContext);
  const [currentPromo, setCurrentPromo] = useState(null);
  const [currentPromoEdit, setCurrentPromoEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [status, setStatus] = useState("");

  const { handleMouseDown, handleMouseLeave, handleMouseUp, handleMouseMove } =
    useDraggable();
  const navigate = useNavigate();
  const toast = useToast();

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
          setAllPromocode(response.data.data);
        }
      } catch (err) {
        console.error(`Error in fetch data, ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, role, navigate]);

  // to delete the Promocode.

  const removePromo = (currentPromo) => {
    setAllPromocode(
      allPromocode.filter((allPromocode) => allPromocode._id !== currentPromo)
    );
  };

  const handleConfirmDelete = () => {
    setIsShowModalDelete(false);
    setCurrentPromo(null);
  };

  const handlePromoDelete = async (e, currentPromo) => {
    e.preventDefault();

    try {
      setConfirmLoading(true);
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
        toast({
          title: "Success",
          description: "Promocode Deleted Successfully.",
          duration: 3000,
          isClosable: true,
          status: "success",
        });
      }
    } catch (err) {
      console.error(`Error in deleting promoCode: ${err.message}`);
      toast({
        title: "Error",
        description: "Failed to delete promo code.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleToggle = async (Id) => {
    try {
      const statusToUpdate = allPromocode.find(
        (promocode) => promocode._id === Id
      );
      if (statusToUpdate) {
        const updatedStatus = !statusToUpdate.status;

        await axios.put(
          `${BASE_URL}/admin/promocode/edit-promocode-status/${Id}`,
          {
            ...statusToUpdate,
            status: updatedStatus,
          },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast({
          title: "Success",
          description: "Promo code Status Updated Successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setAllPromocode((prevData) =>
          prevData.map((allPromocode) =>
            allPromocode._id === Id
              ? { ...allPromocode, status: !allPromocode.status }
              : allPromocode
          )
        );
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update Promo code status",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddPromocode = (newPromocode) => {
    setAllPromocode([newPromocode, ...allPromocode]);
  };

  const handleEditPromoCode = (updatedPromo) => {
    setAllPromocode((prevPromo) =>
      prevPromo.map((promocode) =>
        promocode._id === updatedPromo._id ? updatedPromo : promocode
      )
    );
  };

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
    setIsModalVisible(false);
    setIsShowModalDelete(false);
    setIsModalVisibleEdit(false);
  };

  return (
    <div>
      {isLoading ? (
        <GIFLoader />
      ) : (
        <>
          <Sidebar />

          <div className="pl-[300px] bg-gray-100 w-full h-fit">
            <div>
              <nav className="p-5">
                <GlobalSearch />
              </nav>

              <div className="mx-5 flex justify-between">
                <h1 className="font-bold text-[20px]">Promo codes</h1>
              </div>

              <div className="m-5 text-gray-500">
                Promo codes are exclusive discount vouchers that can be redeemed
                by the customers during the checkout process
                <div className="flex justify-start">
                  You can create customized promotional codes with a detailed
                  description that will be visible to customers
                </div>
              </div>
              <div className="flex justify-end pr-5 mb-10">
                <button
                  type="button"
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
                  onPromocodeAdd={handleAddPromocode}
                />
              </div>
            </div>
            <div
              className="overflow-x-auto overflow-element cursor-grab"
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              <table className="p-5 w-full draggable-table">
                <thead>
                  <tr className="p-10 w-full">
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
                  {allPromocode?.map((data) => (
                    <tr
                      className="text-center odd:bg-white w-fit px-24 h-20"
                      key={data._id}
                    >
                      <td className="px-5">{data.promoCode}</td>
                      <td className="px-5">{data.promoType}</td>
                      <td className="px-5">{data.discount}</td>
                      <td className="px-5">{data.maxDiscountValue}</td>
                      <td className="px-5">{data.minOrderAmount}</td>
                      <td className="px-5">{formatDate(data.fromDate)}</td>
                      <td className="px-5">{formatDate(data.toDate)}</td>
                      <td className="px-5">{data.description}</td>
                      <td className="px-5">{data.applicationMode}</td>
                      <td className="px-5">{data.appliedOn}</td>
                      <td className="px-5">{data.noOfUserUsed}</td>
                      <td className="px-5">
                        <div className="flex gap-3 items-center">
                          <div>
                            <Switch
                              checked={data.status}
                              onChange={() => handleToggle(data._id)}
                            />
                          </div>
                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={() => showModalEdit(data._id)}
                            >
                              <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                            </button>
                            <EditPromoCodeModal
                              handleCancel={handleCancel}
                              isVisible={isModalVisibleEdit}
                              token={token}
                              currentPromoEdit={currentPromoEdit}
                              allPromocode={allPromocode}
                              BASE_URL={BASE_URL}
                              onAddPromocode={handleEditPromoCode}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => showModalDelete(data._id)}
                          >
                            <RiDeleteBinLine className="bg-red-100 text-red-600 mr-3 p-2 text-[35px] rounded-lg" />
                          </button>
                          <Modal
                            onCancel={handleCancel}
                            footer={null}
                            open={isShowModalDelete}
                            centered
                          >
                            <div className="font-semibold text-[18px] mb-5">
                              <Spin spinning={confirmLoading}>
                                Are you sure you want to delete?
                              </Spin>
                            </div>
                            <div className="flex justify-end gap-5">
                              <button
                                type="button"
                                className="bg-cyan-100 px-5 py-2 rounded-lg"
                                onClick={handleCancel}
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="bg-red-100 px-5 py-2 rounded-lg font-semibold text-red-600"
                                onClick={(e) =>
                                  handlePromoDelete(e, currentPromo)
                                }
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
      )}
    </div>
  );
};

export default PromoCode;
