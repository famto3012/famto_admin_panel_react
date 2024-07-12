import { BellOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { Modal, Switch } from "antd";

const Pricing = () => {
  const [agentpricing, setAgentPricing] = useState([]);
  useEffect(() => {
    const fetchAgentPricing = async () => {
      const dummyData = [
        {
          ruleName: "agentprice",
          baseFare: "500",
          baseDistanceFare: "40",
          extraFareDay: "30",
          baseDistanceKm: "100",
          waitingFare: "25",
          waitingTime: "2 hour",
          purchaseFareHour: "300",
          addedTip: "20",
          geofence: "TVM",
        },
        // Add more customers as needed
      ];

      setAgentPricing(dummyData);
    };

    fetchAgentPricing();
  }, []);
  const [agentsurge, setAgentSurge] = useState([]);
  useEffect(() => {
    const fetchAgentSurge = async () => {
      const dummyData = [
        {
          ruleName: "agentsurge",
          baseFare: "400",
          baseDistanceFare: "30",
          waitingFare: "20",
          waitingTime: "3 hour",
          geofence: "TVM",
        },
        // Add more customers as needed
      ];

      setAgentSurge(dummyData);
    };

    fetchAgentSurge();
  }, []);

  const [merchantpricing, setMerchantPricing] = useState([]);
  useEffect(() => {
    const fetchMerchantPricing = async () => {
      const dummyData = [
        {
          ruleName: "merchantprice",
          baseFare: "600",
          baseDistance: "50",
          fareAfterDistance: "3",
          baseWeight: "20",
          fareAfterWeight: "3",
          purchaseFareHour: "400",
          waitingFare: "35",
          waitingTime: "1 hour",
          geofence: "TVM",
        },
        // Add more customers as needed
      ];

      setMerchantPricing(dummyData);
    };

    fetchMerchantPricing();
  }, []);
  const [merchantsurge, setMerchantSurge] = useState([]);
  useEffect(() => {
    const fetchMerchantSurge = async () => {
      const dummyData = [
        {
          ruleName: "merchantsurge",
          baseFare: "300",
          baseDistanceFare: "20",
          waitingFare: "10",
          waitingTime: "2 hour",
          geofence: "TVM",
        },
        // Add more customers as needed
      ];

      setMerchantSurge(dummyData);
    };

    fetchMerchantSurge();
  }, []);

  const [customerpricing, setCustomerPricing] = useState([]);
  useEffect(() => {
    const fetchCustomerPricing = async () => {
      const dummyData = [
        {
          ruleName: "customerprice",
          baseFare: "700",
          baseDistance: "50",
          fareAfterDistance: "8",
          baseWeight: "7",
          fareAfterWeight: "9",
          purchaseFareHour: "4 hour",

          waitingFare: "45",
          waitingTime: "2 hour",
          addedTip: "40",
          geofence: "TVM",
        },
        // Add more customers as needed
      ];

      setCustomerPricing(dummyData);
    };

    fetchCustomerPricing();
  }, []);
  const [customersurge, setCustomerSurge] = useState([]);
  useEffect(() => {
    const fetchCustomerSurge = async () => {
      const dummyData = [
        {
          ruleName: "customersurge",
          baseFare: "500",
          baseDistanceFare: "20",
          waitingFare: "10",
          waitingTime: "2 hour",
          geofence: "TVM",
        },
        // Add more customers as needed
      ];

      setCustomerSurge(dummyData);
    };

    fetchCustomerSurge();
  }, []);

  const [isModalVisibleEditAr, setIsModalVisibleEditAr] = useState(false);

  const showModalEditAr = () => {
    setIsModalVisibleEditAr(true);
  };

  const handleEditConfirmAr = () => {
    setIsModalVisibleEditAr(false);
  };

  const handleEditCancelAr = () => {
    setIsModalVisibleEditAr(false);
  };

  const [isModalVisibleEditAs, setIsModalVisibleEditAs] = useState(false);

  const showModalEditAs = () => {
    setIsModalVisibleEditAs(true);
  };

  const handleEditConfirmAs = () => {
    setIsModalVisibleEditAs(false);
  };

  const handleEditCancelAs = () => {
    setIsModalVisibleEditAs(false);
  };

  const [isModalVisibleEditMr, setIsModalVisibleEditMr] = useState(false);

  const showModalEditMr = () => {
    setIsModalVisibleEditMr(true);
  };

  const handleEditConfirmMr = () => {
    setIsModalVisibleEditMr(false);
  };

  const handleEditCancelMr = () => {
    setIsModalVisibleEditMr(false);
  };
  const [isModalVisibleEditMs, setIsModalVisibleEditMs] = useState(false);

  const showModalEditMs = () => {
    setIsModalVisibleEditMs(true);
  };

  const handleEditConfirmMs = () => {
    setIsModalVisibleEditMs(false);
  };

  const handleEditCancelMs = () => {
    setIsModalVisibleEditMs(false);
  };

  const [isModalVisibleEditCr, setIsModalVisibleEditCr] = useState(false);

  const showModalEditCr = () => {
    setIsModalVisibleEditCr(true);
  };

  const handleEditConfirmCr = () => {
    setIsModalVisibleEditCr(false);
  };

  const handleEditCancelCr = () => {
    setIsModalVisibleEditCr(false);
  };

  const [isModalVisibleEditCs, setIsModalVisibleEditCs] = useState(false);

  const showModalEditCs = () => {
    setIsModalVisibleEditCs(true);
  };

  const handleEditConfirmCs = () => {
    setIsModalVisibleEditCs(false);
  };

  const handleEditCancelCs = () => {
    setIsModalVisibleEditCs(false);
  };

  const [formData3, setFormData3] = useState({
    ruleNamedata: "",
    baseFaredata: "",
    baseDistancedata: "",
    waitingFaredata: "",
    waitingTimedata: "",
    geofencedata: "",
  });

  const inputChange3 = (e) => {
    setFormData3({ ...formData3, [e.target.name]: e.target.value });
  };

  const formSubmit3 = (e) => {
    e.preventDefault();
    console.log(formData3);
  };
  const [formData1, setFormData1] = useState({
    ruleNamedata: "",
    baseFaredata: "",
    baseDistancedata: "",
    waitingFaredata: "",
    waitingTimedata: "",
    geofencedata: "",
  });

  const inputChange1 = (e) => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
  };

  const formSubmit1 = (e) => {
    e.preventDefault();
    console.log(formData1);
  };
  const [formData2, setFormData2] = useState({
    ruleNamedata: "",
    baseFaredata: "",
    baseDistancedata: "",
    waitingFaredata: "",
    waitingTimedata: "",
    geofencedata: "",
  });

  const inputChange2 = (e) => {
    setFormData2({ ...formData2, [e.target.name]: e.target.value });
  };

  const formSubmit2 = (e) => {
    e.preventDefault();
    console.log(formData2);
  };

  const [apricing, setApricing] = useState({
    ruleName: "",
    baseFare: "",
    baseDistanceFare: "",
    extraFareDay: "",
    baseDistanceKm: "",
    waitingTime: "",
    waitingFare: "",
    purchaseFareHour: "",
    addedTip: "",
    geofence: "",
  });
  const handleInputChange1 = (e) => {
    setApricing({ ...apricing, [e.target.name]: e.target.value });
  };

  const submitAction1 = (e) => {
    e.preventDefault();
    console.log(apricing);
  };

  const [mpricing, setMpricing] = useState({
    ruleName: "",
    baseFare: "",
    fareAfterDistance: "",
    baseWeight: "",
    fareAfterWeight: "",
    waitingTime: "",
    waitingFare: "",
    purchaseFareHour: "",
    geofence: "",
  });
  const handleInputChange2 = (e) => {
    setMpricing({ ...mpricing, [e.target.name]: e.target.value });
  };

  const submitAction2 = (e) => {
    e.preventDefault();
    console.log(mpricing);
  };

  const [cpricing, setCpricing] = useState({
    ruleName: "",
    baseFare: "",
    baseDistance: "",
    fareAfterDistance: "",
    baseWeight: "",
    fareAfterWeight: "",
    waitingTime: "",
    waitingFare: "",
    purchaseFareHour: "",
    addedTip: "",
    geofence: "",
  });
  const handleInputChange3 = (e) => {
    setCpricing({ ...cpricing, [e.target.name]: e.target.value });
  };

  const submitAction3 = (e) => {
    e.preventDefault();
    console.log(cpricing);
  };
  const [isModalVisibleAr, setIsModalVisibleAr] = useState(false);

  const showModalAr = () => {
    setIsModalVisibleAr(true);
  };

  const handleConfirmAr = () => {
    setIsModalVisibleAr(false);
  };

  const handleCancelAr = () => {
    setIsModalVisibleAr(false);
  };

  const [isModalVisibleMr, setIsModalVisibleMr] = useState(false);

  const showModalMr = () => {
    setIsModalVisibleMr(true);
  };

  const handleConfirmMr = () => {
    setIsModalVisibleMr(false);
  };

  const handleCancelMr = () => {
    setIsModalVisibleMr(false);
  };

  const [isModalVisibleCr, setIsModalVisibleCr] = useState(false);

  const showModalCr = () => {
    setIsModalVisibleCr(true);
  };

  const handleConfirmCr = () => {
    setIsModalVisibleCr(false);
  };

  const handleCancelCr = () => {
    setIsModalVisibleCr(false);
  };

  const [isModalVisibleAs, setIsModalVisibleAs] = useState(false);

  const showModalAs = () => {
    setIsModalVisibleAs(true);
  };

  const handleConfirmAs = () => {
    setIsModalVisibleAs(false);
  };

  const handleCancelAs = () => {
    setIsModalVisibleAs(false);
  };

  const [isModalVisibleMs, setIsModalVisibleMs] = useState(false);

  const showModalMs = () => {
    setIsModalVisibleMs(true);
  };

  const handleConfirmMs = () => {
    setIsModalVisibleMs(false);
  };

  const handleCancelMs = () => {
    setIsModalVisibleMs(false);
  };

  const [isModalVisibleCs, setIsModalVisibleCs] = useState(false);

  const showModalCs = () => {
    setIsModalVisibleCs(true);
  };

  const handleConfirmCs = () => {
    setIsModalVisibleCs(false);
  };

  const handleCancelCs = () => {
    setIsModalVisibleCs(false);
  };




  const [isShowModalDeleteAr , setIsShowModalDeleteAr] = useState(false);

  const showModalDeleteAr = () => {
    setIsShowModalDeleteAr(true)
  }

  const showModalDeleteOkAr = () => {
    setIsShowModalDeleteAr(false)
  }

  const showModalDeleteCancelAr = () => {
    setIsShowModalDeleteAr(false)
  }

  const [isShowModalDeleteAs , setIsShowModalDeleteAs] = useState(false);

  const showModalDeleteAs = () => {
    setIsShowModalDeleteAs(true)
  }

  const showModalDeleteOkAs = () => {
    setIsShowModalDeleteAs(false)
  }

  const showModalDeleteCancelAs = () => {
    setIsShowModalDeleteAs(false)
  }

  const [isShowModalDeleteMr , setIsShowModalDeleteMr] = useState(false);

  const showModalDeleteMr = () => {
    setIsShowModalDeleteMr(true)
  }

  const showModalDeleteOkMr = () => {
    setIsShowModalDeleteMr(false)
  }

  const showModalDeleteCancelMr = () => {
    setIsShowModalDeleteMr(false)
  }

  const [isShowModalDeleteMs , setIsShowModalDeleteMs] = useState(false);

  const showModalDeleteMs = () => {
    setIsShowModalDeleteMs(true)
  }

  const showModalDeleteOkMs = () => {
    setIsShowModalDeleteMs(false)
  }

  const showModalDeleteCancelMs = () => {
    setIsShowModalDeleteMs(false)
  }

  const [isShowModalDeleteCr , setIsShowModalDeleteCr] = useState(false);

  const showModalDeleteCr = () => {
    setIsShowModalDeleteCr(true)
  }

  const showModalDeleteOkCr = () => {
    setIsShowModalDeleteCr(false)
  }

  const showModalDeleteCancelCr = () => {
    setIsShowModalDeleteCr(false)
  }

  const [isShowModalDeleteCs , setIsShowModalDeleteCs] = useState(false);

  const showModalDeleteCs = () => {
    setIsShowModalDeleteCs(true)
  }

  const showModalDeleteOkCs = () => {
    setIsShowModalDeleteCs(false)
  }

  const showModalDeleteCancelCs = () => {
    setIsShowModalDeleteCs(false)
  }

  return (
    <>
      <Sidebar />
      <div className="w-full h-screen pl-[300px] bg-gray-100">
        <div className="flex justify-end p-4 gap-10">
          <BellOutlined className="text-2xl text-gray-500" />
          <div className="relative">
            <input
              type="search"
              name="search"
              placeholder="Search"
              className="bg-white h-10 px-10 pr-10 rounded-full text-sm focus:outline-none mr-3"
            />
            <button type="submit" className="absolute right-0 top-0 mt-2 mr-8">
              <SearchOutlined className="text-xl text-gray-600" />
            </button>
          </div>
        </div>
        <h1 className="mx-9  text-xl font-bold">Pricing</h1>
        <h1 className="px-9 mt-5 font-bold p-3 bg-gray-300">Agent</h1>
        <div className="flex items-center justify-between mx-9 mt-5">
          <h1 className="text-md">Pricing</h1>
          <div>
            <button
              className="bg-teal-700 text-white rounded-md flex items-center space-x-1 p-2"
              onClick={showModalAr}
            >
              <PlusOutlined className="mr-3" /> Add rule
            </button>
            <Modal
              title="Agent Pricing"
              open={isModalVisibleAr}
              centered
              onOk={handleConfirmAr}
              onCancel={handleCancelAr}
              footer={null}
            >
              <form onSubmit={submitAction1}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="ruleName">
                      Rule Name
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Rule Name"
                      value={apricing.ruleName}
                      id="ruleName"
                      name="ruleName"
                      onChange={handleInputChange1}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="baseFare">
                      Base Fare
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Base Fare"
                      value={apricing.baseFare}
                      id="baseFare"
                      name="baseFare"
                      onChange={handleInputChange1}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="baseDistanceFare"
                    >
                      Base Distance Fare
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Base Distance"
                      value={apricing.baseDistanceFare}
                      id="baseDistanceFare"
                      name="baseDistanceFare"
                      onChange={handleInputChange1}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="extraFareDay"
                    >
                      Extra Fare Day
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Extra Fare Day"
                      value={apricing.extraFareDay}
                      id="extraFareDay"
                      name="extraFareDay"
                      onChange={handleInputChange1}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="baseDistanceKm"
                    >
                      Base Distance Km
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Base Distance"
                      value={apricing.baseDistanceKm}
                      id="baseDistanceKm"
                      name="baseDistanceKm"
                      onChange={handleInputChange1}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="waitingTime"
                    >
                      Waiting Time (minutes)
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Waiting Time"
                      value={apricing.waitingTime}
                      id="waitingTime"
                      name="waitingTime"
                      onChange={handleInputChange1}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="waitingFare"
                    >
                      Waiting Fare
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Waiting Fare"
                      value={apricing.waitingFare}
                      id="waitingFare"
                      name="waitingFare"
                      onChange={handleInputChange1}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="purchaseFareHour"
                    >
                      Purchase Fare Hour
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Purchase Fare Hour"
                      value={apricing.purchaseFareHour}
                      id="purchaseFareHour"
                      name="purchaseFareHour"
                      onChange={handleInputChange1}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="addedTip">
                      Added Tip
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Added Tip"
                      value={apricing.addedTip}
                      id="addedTip"
                      name="addedTip"
                      onChange={handleInputChange1}
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="geofence">
                      Geofence
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Geofence"
                      value={apricing.geofence}
                      id="geofence"
                      name="geofence"
                      onChange={handleInputChange1}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    className="bg-cyan-50 py-2 px-4 rounded-md"
                    type="button"
                    onClick={handleCancelAr}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-teal-700 text-white py-2 px-4 rounded-md"
                    type="submit"
                    onClick={handleConfirmAr}
                  >
                    Add
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        </div>

        <div className="overflow-auto w-full">
          <table className="w-full mt-[20px]">
            <thead>
              <tr>
                {[
                  "Rule Name",
                  "Base Fare",
                  "Base Distance Fare",
                  "Extra Fare per Day",
                  "Base Distance Fare per Km",
                  "Waiting Fare",
                  "Waiting Time",
                  "Purchase Fare per hour",
                  "Added Tip",
                  "Geofence",
                  "Status",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="bg-teal-700 text-center text-white  px-2 py-4  border-r-2 border-[#eee]/50"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agentpricing.map((agentpricing) => (
                <tr
                  key={agentpricing.id}
                  className="align-middle border-b border-gray-300 text-center p-4"
                >
                  <td className="p-4">{agentpricing.ruleName}</td>
                  <td className="p-4">{agentpricing.baseFare}</td>
                  <td className="p-4">{agentpricing.baseDistanceFare}</td>
                  <td className="p-4">{agentpricing.extraFareDay}</td>
                  <td className="p-4">{agentpricing.baseDistanceKm}</td>
                  <td className="p-4">{agentpricing.waitingFare}</td>
                  <td className="p-4 px-2">{agentpricing.waitingTime}</td>
                  <td className="p-4">{agentpricing.purchaseFareHour}</td>
                  <td className="p-4">{agentpricing.addedTip}</td>
                  <td className="p-4">{agentpricing.geofence}</td>
                  <td className="p-4">
                    <div className="flex justify-center items-center gap-3">
                      <div>
                        <Switch />
                      </div>
                      <div className="flex items-center">
                        <button onClick={showModalEditAr}>
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                        </button>
                        <Modal
                          title=" Edit Agent Pricing"
                          open={isModalVisibleEditAr}
                          centered
                          onOk={handleEditConfirmAr}
                          onCancel={handleEditCancelAr}
                          footer={null}
                        >
                          <form onSubmit={submitAction1}>
                            <div className="flex flex-col gap-4">
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="ruleName"
                                >
                                  Rule Name
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Rule Name"
                                  value={apricing.ruleName}
                                  id="ruleName"
                                  name="ruleName"
                                  onChange={handleInputChange1}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="baseFare"
                                >
                                  Base Fare
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Base Fare"
                                  value={apricing.baseFare}
                                  id="baseFare"
                                  name="baseFare"
                                  onChange={handleInputChange1}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="baseDistanceFare"
                                >
                                  Base Distance Fare
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Base Distance"
                                  value={apricing.baseDistanceFare}
                                  id="baseDistanceFare"
                                  name="baseDistanceFare"
                                  onChange={handleInputChange1}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="extraFareDay"
                                >
                                  Extra Fare Day
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Extra Fare Day"
                                  value={apricing.extraFareDay}
                                  id="extraFareDay"
                                  name="extraFareDay"
                                  onChange={handleInputChange1}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="baseDistanceKm"
                                >
                                  Base Distance Km
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Base Distance"
                                  value={apricing.baseDistanceKm}
                                  id="baseDistanceKm"
                                  name="baseDistanceKm"
                                  onChange={handleInputChange1}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="waitingTime"
                                >
                                  Waiting Time (minutes)
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Waiting Time"
                                  value={apricing.waitingTime}
                                  id="waitingTime"
                                  name="waitingTime"
                                  onChange={handleInputChange1}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="waitingFare"
                                >
                                  Waiting Fare
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Waiting Fare"
                                  value={apricing.waitingFare}
                                  id="waitingFare"
                                  name="waitingFare"
                                  onChange={handleInputChange1}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="purchaseFareHour"
                                >
                                  Purchase Fare Hour
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Purchase Fare Hour"
                                  value={apricing.purchaseFareHour}
                                  id="purchaseFareHour"
                                  name="purchaseFareHour"
                                  onChange={handleInputChange1}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="addedTip"
                                >
                                  Added Tip
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Added Tip"
                                  value={apricing.addedTip}
                                  id="addedTip"
                                  name="addedTip"
                                  onChange={handleInputChange1}
                                />
                              </div>

                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="geofence"
                                >
                                  Geofence
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Geofence"
                                  value={apricing.geofence}
                                  id="geofence"
                                  name="geofence"
                                  onChange={handleInputChange1}
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                              <button
                                className="bg-cyan-50 py-2 px-4 rounded-md"
                                type="button"
                                onClick={handleEditCancelAr}
                              >
                                Cancel
                              </button>
                              <button
                                className="bg-teal-700 text-white py-2 px-4 rounded-md"
                                type="submit"
                                onClick={handleEditConfirmAr}
                              >
                                Add
                              </button>
                            </div>
                          </form>
                        </Modal>
                      </div>
                      <button on onClick={showModalDeleteAr}>
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                      <Modal
                     onOk={showModalDeleteOkAr}
                     onCancel={showModalDeleteCancelAr}
                     footer={null}
                     open={isShowModalDeleteAr}
                     centered
                    >
                    
                    <p className="font-semibold text-[18px] mb-5">Are you sure want to delete?</p>
                    <div className="flex justify-end">
                    <button className="bg-cyan-100 px-5 py-1 rounded-md font-semibold" onClick={showModalDeleteCancelAr}>Cancel</button>
                    <button className="bg-teal-800 px-5 py-1 rounded-md ml-3 text-white"> Delete</button>
                    </div>
                  </Modal>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mx-9 mt-8">
          <h1 className="text-md">Surge</h1>
          <div>
            <button
              className="bg-teal-700 text-white rounded-md flex items-center space-x-1 p-2"
              onClick={showModalAs}
            >
              <PlusOutlined className="mr-3" /> Add Surge
            </button>
            <Modal
              title="Surge"
              open={isModalVisibleAs}
              centered
              onOk={handleConfirmAs}
              onCancel={handleCancelAs}
              footer={null}
            >
              <form onSubmit={formSubmit1}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="ruleNamedata"
                    >
                      Rule Name
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Rule Name"
                      value={formData1.ruleNamedata}
                      id="ruleNamedata"
                      name="ruleNamedata"
                      onChange={inputChange1}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="baseFaredata"
                    >
                      Base Fare
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Base Fare"
                      value={formData1.baseFaredata}
                      id="baseFaredata"
                      name="baseFaredata"
                      onChange={inputChange1}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="baseDistancedata"
                    >
                      Base Distance
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Base Distance"
                      value={formData1.baseDistancedata}
                      id="baseDistancedata"
                      name="baseDistancedata"
                      onChange={inputChange1}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="waitingFaredata"
                    >
                      Waiting Fare
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Waiting Fare"
                      value={formData1.waitingFaredata}
                      id="waitingFaredata"
                      name="waitingFaredata"
                      onChange={inputChange1}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="waitingTimedata"
                    >
                      Waiting Time (minutes)
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Waiting Time"
                      value={formData1.waitingTimedata}
                      id="waitingTimedata"
                      name="waitingTimedata"
                      onChange={inputChange1}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="geofencedata"
                    >
                      Geofence
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Geofence"
                      value={formData1.geofencedata}
                      id="geofencedata"
                      name="geofencedata"
                      onChange={inputChange1}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    className="bg-cyan-50 py-2 px-4 rounded-md"
                    type="button"
                    onClick={handleCancelAs}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-teal-700 text-white py-2 px-4 rounded-md"
                    type="submit"
                    onClick={handleConfirmAs}
                  >
                    Add
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        </div>

        <div className="overflow-auto w-full">
          <table className="w-full mt-[20px]">
            <thead>
              <tr>
                {[
                  "Rule Name",
                  "Base Fare",
                  "Base Distance Fare",
                  "Waiting Fare",
                  "Waiting Time",
                  "Geofence",
                  "Status",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="bg-teal-700 text-center text-white px-8 py-3 border-r-2 border-[#eee]/50"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agentsurge.map((agentsurge) => (
                <tr
                  key={agentsurge.id}
                  className="align-middle border-b border-gray-300 text-center "
                >
                  <td>{agentsurge.ruleName}</td>
                  <td>{agentsurge.baseFare}</td>
                  <td>{agentsurge.baseDistanceFare}</td>
                  <td>{agentsurge.waitingFare}</td>
                  <td>{agentsurge.waitingTime}</td>
                  <td>{agentsurge.geofence}</td>
                  <td className="py-3 ">
                    <div className="flex items-center gap-3 justify-end mx-4">
                      <div>
                        <Switch />
                      </div>
                      <div className="flex items-center">
                        <button onClick={showModalEditAs}>
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                        </button>
                        <Modal
                          title=" Edit Surge"
                          open={isModalVisibleEditAs}
                          centered
                          onOk={handleEditConfirmAs}
                          onCancel={handleEditCancelAs}
                          footer={null}
                        >
                          <form onSubmit={formSubmit1}>
                            <div className="flex flex-col gap-4">
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="ruleNamedata"
                                >
                                  Rule Name
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Rule Name"
                                  value={formData1.ruleNamedata}
                                  id="ruleNamedata"
                                  name="ruleNamedata"
                                  onChange={inputChange1}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="baseFaredata"
                                >
                                  Base Fare
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Base Fare"
                                  value={formData1.baseFaredata}
                                  id="baseFaredata"
                                  name="baseFaredata"
                                  onChange={inputChange1}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="baseDistancedata"
                                >
                                  Base Distance
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Base Distance"
                                  value={formData1.baseDistancedata}
                                  id="baseDistancedata"
                                  name="baseDistancedata"
                                  onChange={inputChange1}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="waitingFaredata"
                                >
                                  Waiting Fare
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Waiting Fare"
                                  value={formData1.waitingFaredata}
                                  id="waitingFaredata"
                                  name="waitingFaredata"
                                  onChange={inputChange1}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="waitingTimedata"
                                >
                                  Waiting Time (minutes)
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Waiting Time"
                                  value={formData1.waitingTimedata}
                                  id="waitingTimedata"
                                  name="waitingTimedata"
                                  onChange={inputChange1}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="geofencedata"
                                >
                                  Geofence
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Geofence"
                                  value={formData1.geofencedata}
                                  id="geofencedata"
                                  name="geofencedata"
                                  onChange={inputChange1}
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                              <button
                                className="bg-cyan-50 py-2 px-4 rounded-md"
                                type="button"
                                onClick={handleEditCancelAs}
                              >
                                Cancel
                              </button>
                              <button
                                className="bg-teal-700 text-white py-2 px-4 rounded-md"
                                type="submit"
                                onClick={handleEditConfirmAs}
                              >
                                Add
                              </button>
                            </div>
                          </form>
                        </Modal>
                      </div>
                      <button onClick={showModalDeleteAs}>
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                      <Modal
                     onOk={showModalDeleteOkAs}
                     onCancel={showModalDeleteCancelAs}
                     footer={null}
                     open={isShowModalDeleteAs}
                     centered
                    >
                    
                    <p className="font-semibold text-[18px] mb-5">Are you sure want to delete?</p>
                    <div className="flex justify-end">
                    <button className="bg-cyan-100 px-5 py-1 rounded-md font-semibold" onClick={showModalDeleteCancelAs}>Cancel</button>
                    <button className="bg-teal-800 px-5 py-1 rounded-md ml-3 text-white"> Delete</button>
                    </div>
                  </Modal>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h1 className="px-9 mt-5 font-bold p-3 bg-gray-300">Merchant</h1>
        <div className="flex items-center justify-between mx-9 mt-10">
          <h1 className="text-md">Pricing</h1>
          <div>
            <button
              className="bg-teal-700 text-white rounded-md flex items-center space-x-1 p-2"
              onClick={showModalMr}
            >
              <PlusOutlined className="mr-3" /> Add rule
            </button>
            <Modal
              title="Merchant Pricing"
              open={isModalVisibleMr}
              centered
              onOk={handleConfirmMr}
              onCancel={handleCancelMr}
              footer={null}
            >
              <form onSubmit={submitAction2}>
                <div className="flex flex-col gap-4 min-h-100">
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="ruleName">
                      Rule Name
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Rule Name"
                      value={mpricing.ruleName}
                      id="ruleName"
                      name="ruleName"
                      onChange={handleInputChange2}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="baseFare">
                      Base Fare
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Base Fare"
                      value={mpricing.baseFare}
                      id="baseFare"
                      name="baseFare"
                      onChange={handleInputChange2}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="fareAfterDistance"
                    >
                      Fare After Distance
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Fare After Distance"
                      value={mpricing.fareAfterDistance}
                      id="fareAfterDistance"
                      name="fareAfterDistance"
                      onChange={handleInputChange2}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="baseWeight">
                      Base Weight
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Base Weight"
                      value={mpricing.baseWeight}
                      id="baseWeight"
                      name="baseWeight"
                      onChange={handleInputChange2}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="fareAfterWeight"
                    >
                      Fare After Weight
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Fare After Weight"
                      value={mpricing.fareAfterWeight}
                      id="fareAfterWeight"
                      name="fareAfterWeight"
                      onChange={handleInputChange2}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="waitingFare"
                    >
                      Waiting Fare
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Waiting Fare"
                      value={mpricing.waitingFare}
                      id="waitingFare"
                      name="waitingFare"
                      onChange={handleInputChange2}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="waitingTime"
                    >
                      Waiting Time (minutes)
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Waiting Time"
                      value={mpricing.waitingTime}
                      id="waitingTime"
                      name="waitingTime"
                      onChange={handleInputChange2}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="purchaseFareHour"
                    >
                      Purchase Fare Hour
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Purchase Fare Hour"
                      value={mpricing.purchaseFareHour}
                      id="purchaseFareHour"
                      name="purchaseFareHour"
                      onChange={handleInputChange2}
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="geofence">
                      Geofence
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Geofence"
                      value={mpricing.geofence}
                      id="geofence"
                      name="geofence"
                      onChange={handleInputChange2}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    className="bg-cyan-50 py-2 px-4 rounded-md"
                    type="button"
                    onClick={handleCancelMr}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-teal-700 text-white py-2 px-4 rounded-md"
                    type="submit"
                    onClick={handleConfirmMr}
                  >
                    Add
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        </div>

        <div className="overflow-auto w-full">
          <table className="w-full mt-[20px]">
            <thead>
              <tr>
                {[
                  "Rule Name",
                  "Base Fare",
                  "Base Distance",
                  "Fare After Base Distance",
                  "Base Weight Upto",
                  "Fare After Base Weight",
                  "Purchase Fare per hour",
                  "Waiting Fare",
                  "Waiting Time",
                  "Geofence",
                  "Status",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="bg-teal-700 text-center text-white px-1 py-3  border-r-2 border-[#eee]/50"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {merchantpricing.map((merchantpricing) => (
                <tr
                  key={merchantpricing.id}
                  className="align-middle border-b border-gray-300 text-center "
                >
                  <td className="p-4">{merchantpricing.ruleName}</td>
                  <td className="p-4">{merchantpricing.baseFare}</td>
                  <td className="p-4">{merchantpricing.baseDistance}</td>
                  <td className="p-4">{merchantpricing.fareAfterDistance}</td>
                  <td className="p-4">{merchantpricing.baseWeight}</td>
                  <td className="p-4">{merchantpricing.fareAfterWeight}</td>
                  <td className="p-4">{merchantpricing.purchaseFareHour}</td>
                  <td className="p-4">{merchantpricing.waitingFare}</td>
                  <td className="p-4 px-2">{merchantpricing.waitingTime}</td>
                  <td className="p-4">{merchantpricing.geofence}</td>
                  <td className="p-4">
                    <div className="flex justify-center items-center gap-3">
                      <div>
                        <Switch />
                      </div>
                      <div className="flex items-center">
                        <button onClick={showModalEditMr}>
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                        </button>
                        <Modal
                          title="Edit Merchant Pricing"
                          open={isModalVisibleEditMr}
                          centered
                          onOk={handleEditConfirmMr}
                          onCancel={handleEditCancelMr}
                          footer={null}
                        >
                          <form onSubmit={submitAction2}>
                            <div className="flex flex-col gap-4 min-h-100">
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="ruleName"
                                >
                                  Rule Name
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Rule Name"
                                  value={mpricing.ruleName}
                                  id="ruleName"
                                  name="ruleName"
                                  onChange={handleInputChange2}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="baseFare"
                                >
                                  Base Fare
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Base Fare"
                                  value={mpricing.baseFare}
                                  id="baseFare"
                                  name="baseFare"
                                  onChange={handleInputChange2}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="fareAfterDistance"
                                >
                                  Fare After Distance
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Fare After Distance"
                                  value={mpricing.fareAfterDistance}
                                  id="fareAfterDistance"
                                  name="fareAfterDistance"
                                  onChange={handleInputChange2}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="baseWeight"
                                >
                                  Base Weight
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Base Weight"
                                  value={mpricing.baseWeight}
                                  id="baseWeight"
                                  name="baseWeight"
                                  onChange={handleInputChange2}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="fareAfterWeight"
                                >
                                  Fare After Weight
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Fare After Weight"
                                  value={mpricing.fareAfterWeight}
                                  id="fareAfterWeight"
                                  name="fareAfterWeight"
                                  onChange={handleInputChange2}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="waitingFare"
                                >
                                  Waiting Fare
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Waiting Fare"
                                  value={mpricing.waitingFare}
                                  id="waitingFare"
                                  name="waitingFare"
                                  onChange={handleInputChange2}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="waitingTime"
                                >
                                  Waiting Time (minutes)
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Waiting Time"
                                  value={mpricing.waitingTime}
                                  id="waitingTime"
                                  name="waitingTime"
                                  onChange={handleInputChange2}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="purchaseFareHour"
                                >
                                  Purchase Fare Hour
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Purchase Fare Hour"
                                  value={mpricing.purchaseFareHour}
                                  id="purchaseFareHour"
                                  name="purchaseFareHour"
                                  onChange={handleInputChange2}
                                />
                              </div>

                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="geofence"
                                >
                                  Geofence
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Geofence"
                                  value={mpricing.geofence}
                                  id="geofence"
                                  name="geofence"
                                  onChange={handleInputChange2}
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                              <button
                                className="bg-cyan-50 py-2 px-4 rounded-md"
                                type="button"
                                onClick={handleEditCancelMr}
                              >
                                Cancel
                              </button>
                              <button
                                className="bg-teal-700 text-white py-2 px-4 rounded-md"
                                type="submit"
                                onClick={handleEditConfirmMr}
                              >
                                Add
                              </button>
                            </div>
                          </form>
                        </Modal>
                      </div>
                      <button onClick={showModalDeleteMr}>
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                      <Modal
                     onOk={showModalDeleteOkMr}
                     onCancel={showModalDeleteCancelMr}
                     footer={null}
                     open={isShowModalDeleteMr}
                     centered
                    >
                    
                    <p className="font-semibold text-[18px] mb-5">Are you sure want to delete?</p>
                    <div className="flex justify-end">
                    <button className="bg-cyan-100 px-5 py-1 rounded-md font-semibold" onClick={showModalDeleteCancelMr}>Cancel</button>
                    <button className="bg-teal-800 px-5 py-1 rounded-md ml-3 text-white"> Delete</button>
                    </div>
                  </Modal>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mx-9 mt-8">
          <h1 className="text-md">Surge</h1>
          <div>
            <button
              className="bg-teal-700 text-white rounded-md flex items-center space-x-1 p-2"
              onClick={showModalMs}
            >
              <PlusOutlined className="mr-3" /> Add Surge
            </button>
            <Modal
              title="Surge"
              open={isModalVisibleMs}
              centered
              onOk={handleConfirmMs}
              onCancel={handleCancelMs}
              footer={null}
            >
              <form onSubmit={formSubmit2}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="ruleNamedata"
                    >
                      Rule Name
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Rule Name"
                      value={formData2.ruleNamedata}
                      id="ruleNamedata"
                      name="ruleNamedata"
                      onChange={inputChange2}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="baseFaredata"
                    >
                      Base Fare
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Base Fare"
                      value={formData2.baseFaredata}
                      id="baseFaredata"
                      name="baseFaredata"
                      onChange={inputChange2}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="baseDistancedata"
                    >
                      Base Distance
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Base Distance"
                      value={formData2.baseDistancedata}
                      id="baseDistancedata"
                      name="baseDistancedata"
                      onChange={inputChange2}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="waitingFaredata"
                    >
                      Waiting Fare
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Waiting Fare"
                      value={formData2.waitingFaredata}
                      id="waitingFaredata"
                      name="waitingFaredata"
                      onChange={inputChange2}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="waitingTimedata"
                    >
                      Waiting Time (minutes)
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Waiting Time"
                      value={formData2.waitingTimedata}
                      id="waitingTimedata"
                      name="waitingTimedata"
                      onChange={inputChange2}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="geofencedata"
                    >
                      Geofence
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Geofence"
                      value={formData2.geofencedata}
                      id="geofencedata"
                      name="geofencedata"
                      onChange={inputChange2}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    className="bg-cyan-50 py-2 px-4 rounded-md"
                    type="button"
                    onClick={handleCancelMs}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-teal-700 text-white py-2 px-4 rounded-md"
                    type="submit"
                    onClick={handleConfirmMs}
                  >
                    Add
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        </div>

        <div className="overflow-auto w-full">
          <table className="w-full mt-[20px]">
            <thead>
              <tr>
                {[
                  "Rule Name",
                  "Base Fare",
                  "Base Distance Fare",
                  "Waiting Fare",
                  "Waiting Time",
                  "Geofence",
                  "Status",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="bg-teal-700 text-center text-white px-8 py-3 border-r-2 border-[#eee]/50"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {merchantsurge.map((merchantsurge) => (
                <tr
                  key={merchantsurge.id}
                  className="align-middle border-b border-gray-300 text-center "
                >
                  <td>{merchantsurge.ruleName}</td>
                  <td>{merchantsurge.baseFare}</td>
                  <td>{merchantsurge.baseDistanceFare}</td>
                  <td>{merchantsurge.waitingFare}</td>
                  <td>{merchantsurge.waitingTime}</td>
                  <td>{merchantsurge.geofence}</td>
                  <td className="py-3 ">
                    <div className="flex items-center gap-3 justify-end mx-4">
                      <div>
                        <Switch />
                      </div>
                      <div className="flex item-center">
                        <button onClick={showModalEditMs}>
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                        </button>
                        <Modal
                          title=" Edit Surge"
                          open={isModalVisibleEditMs}
                          centered
                          onOk={handleEditConfirmMs}
                          onCancel={handleEditCancelMs}
                          footer={null}
                        >
                          <form onSubmit={formSubmit2}>
                            <div className="flex flex-col gap-4">
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="ruleNamedata"
                                >
                                  Rule Name
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Rule Name"
                                  value={formData2.ruleNamedata}
                                  id="ruleNamedata"
                                  name="ruleNamedata"
                                  onChange={inputChange2}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="baseFaredata"
                                >
                                  Base Fare
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Base Fare"
                                  value={formData2.baseFaredata}
                                  id="baseFaredata"
                                  name="baseFaredata"
                                  onChange={inputChange2}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="baseDistancedata"
                                >
                                  Base Distance
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Base Distance"
                                  value={formData2.baseDistancedata}
                                  id="baseDistancedata"
                                  name="baseDistancedata"
                                  onChange={inputChange2}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="waitingFaredata"
                                >
                                  Waiting Fare
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Waiting Fare"
                                  value={formData2.waitingFaredata}
                                  id="waitingFaredata"
                                  name="waitingFaredata"
                                  onChange={inputChange2}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="waitingTimedata"
                                >
                                  Waiting Time (minutes)
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Waiting Time"
                                  value={formData2.waitingTimedata}
                                  id="waitingTimedata"
                                  name="waitingTimedata"
                                  onChange={inputChange2}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="geofencedata"
                                >
                                  Geofence
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Geofence"
                                  value={formData2.geofencedata}
                                  id="geofencedata"
                                  name="geofencedata"
                                  onChange={inputChange2}
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                              <button
                                className="bg-cyan-50 py-2 px-4 rounded-md"
                                type="button"
                                onClick={handleEditCancelMs}
                              >
                                Cancel
                              </button>
                              <button
                                className="bg-teal-700 text-white py-2 px-4 rounded-md"
                                type="submit"
                                onClick={handleEditConfirmMs}
                              >
                                Add
                              </button>
                            </div>
                          </form>
                        </Modal>
                      </div>
                      <button onClick={showModalDeleteMs}>
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                      <Modal
                     onOk={showModalDeleteOkMs}
                     onCancel={showModalDeleteCancelMs}
                     footer={null}
                     open={isShowModalDeleteMs}
                     centered
                    >
                    
                    <p className="font-semibold text-[18px] mb-5">Are you sure want to delete?</p>
                    <div className="flex justify-end">
                    <button className="bg-cyan-100 px-5 py-1 rounded-md font-semibold" onClick={showModalDeleteCancelMs}>Cancel</button>
                    <button className="bg-teal-800 px-5 py-1 rounded-md ml-3 text-white"> Delete</button>
                    </div>
                  </Modal>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h1 className="px-9 mt-5 font-bold p-3 bg-gray-300">Customer</h1>
        <div className="flex items-center justify-between mx-9 mt-10">
          <h1 className="text-md">Pricing</h1>
          <div>
            <button
              className="bg-teal-700 text-white rounded-md flex items-center space-x-1 p-2"
              onClick={showModalCr}
            >
              <PlusOutlined className="mr-3" /> Add rule
            </button>
            <Modal
              title="Customer Pricing"
              open={isModalVisibleCr}
              centered
              onOk={handleConfirmCr}
              onCancel={handleCancelCr}
              footer={null}
            >
              <form onSubmit={submitAction3}>
                <div className="flex flex-col gap-4 ">
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="ruleName">
                      Rule Name
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Rule Name"
                      value={cpricing.ruleName}
                      id="ruleName"
                      name="ruleName"
                      onChange={handleInputChange3}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="baseFare">
                      Base Fare
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Base Fare"
                      value={cpricing.baseFare}
                      id="baseFare"
                      name="baseFare"
                      onChange={handleInputChange3}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="baseDistance"
                    >
                      Base Distance
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Base Distance"
                      value={cpricing.baseDistance}
                      id="baseDistance"
                      name="baseDistance"
                      onChange={handleInputChange3}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="fareAfterDistance"
                    >
                      Fare After Distance
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Fare After Distance"
                      value={cpricing.fareAfterDistance}
                      id="fareAfterDistance"
                      name="fareAfterDistance"
                      onChange={handleInputChange3}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="baseWeight">
                      Base Weight
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Base Weight"
                      value={cpricing.baseWeight}
                      id="baseWeight"
                      name="baseWeight"
                      onChange={handleInputChange3}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="fareAfterWeight"
                    >
                      Fare After Weight
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Fare After Weight"
                      value={cpricing.fareAfterWeight}
                      id="fareAfterWeight"
                      name="fareAfterWeight"
                      onChange={handleInputChange3}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="waitingFare"
                    >
                      Waiting Fare
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Waiting Fare"
                      value={cpricing.waitingFare}
                      id="waitingFare"
                      name="waitingFare"
                      onChange={handleInputChange3}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="waitingTime"
                    >
                      Waiting Time
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Waiting Time"
                      value={cpricing.waitingTime}
                      id="waitingTime"
                      name="waitingTime"
                      onChange={handleInputChange3}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="purchaseFareHour"
                    >
                      Purchase Fare Hour
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Purchase Fare Hour"
                      value={cpricing.purchaseFareHour}
                      id="purchaseFareHour"
                      name="purchaseFareHour"
                      onChange={handleInputChange3}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="addedTip">
                      Added Tip
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Added Tip"
                      value={cpricing.addedTip}
                      id="addedTip"
                      name="addedTip"
                      onChange={handleInputChange3}
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="geofence">
                      Geofence
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Geofence"
                      value={cpricing.geofence}
                      id="geofence"
                      name="geofence"
                      onChange={handleInputChange3}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    className="bg-cyan-50 py-2 px-4 rounded-md"
                    type="button"
                    onClick={handleCancelCr}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-teal-700 text-white py-2 px-4 rounded-md"
                    type="submit"
                    onClick={handleConfirmCr}
                  >
                    Add
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        </div>

        <div className="overflow-auto w-full">
          <table className="w-full mt-[20px]">
            <thead>
              <tr>
                {[
                  "Rule Name",
                  "Base Fare",
                  "Base Distance",
                  "Fare After Base Distance",
                  "Base Weight Upto",
                  "Fare After Base Weight",
                  "Purchase Fare per hour",

                  "Waiting Fare",
                  "Waiting Time",
                  "Added Tip",
                  "Geofence",
                  "Status",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="bg-teal-700 text-center text-white  px-1 py-3  border-r-2 border-[#eee]/50"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customerpricing.map((customerpricing) => (
                <tr
                  key={customerpricing.id}
                  className="align-middle border-b border-gray-300 text-center p-4"
                >
                  <td className="p-4">{customerpricing.ruleName}</td>
                  <td className="p-4">{customerpricing.baseFare}</td>
                  <td className="p-4">{customerpricing.baseDistance}</td>
                  <td className="p-4">{customerpricing.fareAfterDistance}</td>
                  <td className="p-4">{customerpricing.baseWeight}</td>
                  <td className="p-4">{customerpricing.fareAfterWeight}</td>
                  <td className="p-4">{customerpricing.purchaseFareHour}</td>
                  <td className="p-4">{customerpricing.waitingFare}</td>
                  <td className="p-4 px-2">{customerpricing.waitingTime}</td>
                  <td className="p-4">{customerpricing.addedTip}</td>
                  <td className="p-4">{customerpricing.geofence}</td>
                  <td className="p-4">
                    <div className="flex justify-center items-center gap-3">
                      <div>
                        <Switch />
                      </div>
                      <div className="flex items-center">
                        <button onClick={showModalEditCr}>
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                        </button>
                        <Modal
                          title=" Edit Customer Pricing"
                          open={isModalVisibleEditCr}
                          centered
                          onOk={handleEditConfirmCr}
                          onCancel={handleEditCancelCr}
                          footer={null}
                        >
                          <form onSubmit={submitAction3}>
                            <div className="flex flex-col gap-4 ">
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="ruleName"
                                >
                                  Rule Name
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Rule Name"
                                  value={cpricing.ruleName}
                                  id="ruleName"
                                  name="ruleName"
                                  onChange={handleInputChange3}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="baseFare"
                                >
                                  Base Fare
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Base Fare"
                                  value={cpricing.baseFare}
                                  id="baseFare"
                                  name="baseFare"
                                  onChange={handleInputChange3}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="baseDistance"
                                >
                                  Base Distance
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Base Distance"
                                  value={cpricing.baseDistance}
                                  id="baseDistance"
                                  name="baseDistance"
                                  onChange={handleInputChange3}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="fareAfterDistance"
                                >
                                  Fare After Distance
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Fare After Distance"
                                  value={cpricing.fareAfterDistance}
                                  id="fareAfterDistance"
                                  name="fareAfterDistance"
                                  onChange={handleInputChange3}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="baseWeight"
                                >
                                  Base Weight
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Base Weight"
                                  value={cpricing.baseWeight}
                                  id="baseWeight"
                                  name="baseWeight"
                                  onChange={handleInputChange3}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="fareAfterWeight"
                                >
                                  Fare After Weight
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Fare After Weight"
                                  value={cpricing.fareAfterWeight}
                                  id="fareAfterWeight"
                                  name="fareAfterWeight"
                                  onChange={handleInputChange3}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="waitingFare"
                                >
                                  Waiting Fare
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Waiting Fare"
                                  value={cpricing.waitingFare}
                                  id="waitingFare"
                                  name="waitingFare"
                                  onChange={handleInputChange3}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="waitingTime"
                                >
                                  Waiting Time
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Waiting Time"
                                  value={cpricing.waitingTime}
                                  id="waitingTime"
                                  name="waitingTime"
                                  onChange={handleInputChange3}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="purchaseFareHour"
                                >
                                  Purchase Fare Hour
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Purchase Fare Hour"
                                  value={cpricing.purchaseFareHour}
                                  id="purchaseFareHour"
                                  name="purchaseFareHour"
                                  onChange={handleInputChange3}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="addedTip"
                                >
                                  Added Tip
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Added Tip"
                                  value={cpricing.addedTip}
                                  id="addedTip"
                                  name="addedTip"
                                  onChange={handleInputChange3}
                                />
                              </div>

                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="geofence"
                                >
                                  Geofence
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Geofence"
                                  value={cpricing.geofence}
                                  id="geofence"
                                  name="geofence"
                                  onChange={handleInputChange3}
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                              <button
                                className="bg-cyan-50 py-2 px-4 rounded-md"
                                type="button"
                                onClick={handleEditCancelCr}
                              >
                                Cancel
                              </button>
                              <button
                                className="bg-teal-700 text-white py-2 px-4 rounded-md"
                                type="submit"
                                onClick={handleEditConfirmCr}
                              >
                                Add
                              </button>
                            </div>
                          </form>
                        </Modal>
                      </div>
                      <button onClick={showModalDeleteCr}>
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                      <Modal
                     onOk={showModalDeleteOkCr}
                     onCancel={showModalDeleteCancelCr}
                     footer={null}
                     open={isShowModalDeleteCr}
                     centered
                    >
                    
                    <p className="font-semibold text-[18px] mb-5">Are you sure want to delete?</p>
                    <div className="flex justify-end">
                    <button className="bg-cyan-100 px-5 py-1 rounded-md font-semibold" onClick={showModalDeleteCancelCr}>Cancel</button>
                    <button className="bg-teal-800 px-5 py-1 rounded-md ml-3 text-white"> Delete</button>
                    </div>
                  </Modal>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mx-9 mt-8">
          <h1 className="text-md">Surge</h1>
          <div>
            <button
              className="bg-teal-700 text-white rounded-md flex items-center space-x-1 p-2"
              onClick={showModalCs}
            >
              <PlusOutlined className="mr-3" /> Add Surge
            </button>
            <Modal
              title="Surge"
              open={isModalVisibleCs}
              centered
              onOk={handleConfirmCs}
              onCancel={handleCancelCs}
              footer={null}
            >
              <form onSubmit={formSubmit3}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="ruleNamedata"
                    >
                      Rule Name
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Rule Name"
                      value={formData3.ruleNamedata}
                      id="ruleNamedata"
                      name="ruleNamedata"
                      onChange={inputChange3}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="baseFaredata"
                    >
                      Base Fare
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Base Fare"
                      value={formData3.baseFaredata}
                      id="baseFaredata"
                      name="baseFaredata"
                      onChange={inputChange3}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="baseDistancedata"
                    >
                      Base Distance
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Base Distance"
                      value={formData3.baseDistancedata}
                      id="baseDistancedata"
                      name="baseDistancedata"
                      onChange={inputChange3}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="waitingFaredata"
                    >
                      Waiting Fare
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Waiting Fare"
                      value={formData3.waitingFaredata}
                      id="waitingFaredata"
                      name="waitingFaredata"
                      onChange={inputChange3}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="waitingTimedata"
                    >
                      Waiting Time (minutes)
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Waiting Time"
                      value={formData3.waitingTimedata}
                      id="waitingTimedata"
                      name="waitingTimedata"
                      onChange={inputChange3}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="geofencedata"
                    >
                      Geofence
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Geofence"
                      value={formData3.geofencedata}
                      id="geofencedata"
                      name="geofencedata"
                      onChange={inputChange3}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    className="bg-cyan-50 py-2 px-4 rounded-md"
                    type="button"
                    onClick={handleCancelCs}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-teal-700 text-white py-2 px-4 rounded-md"
                    type="submit"
                    onClick={handleCancelCs}
                  >
                    Add
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        </div>

        <div className="overflow-auto w-full ">
          <table className="w-full mt-[20px] mb-28">
            <thead>
              <tr>
                {[
                  "Rule Name",
                  "Base Fare",
                  "Base Distance Fare",
                  "Waiting Fare",
                  "Waiting Time",
                  "Geofence",
                  "Status",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="bg-teal-700 text-center text-white px-8 py-3 border-r-2 border-[#eee]/50"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customersurge.map((customersurge) => (
                <tr
                  key={customersurge.id}
                  className="align-middle border-b border-gray-300 text-center "
                >
                  <td>{customersurge.ruleName}</td>
                  <td>{customersurge.baseFare}</td>
                  <td>{customersurge.baseDistanceFare}</td>
                  <td>{customersurge.waitingFare}</td>
                  <td>{customersurge.waitingTime}</td>
                  <td>{customersurge.geofence}</td>
                  <td className="py-3 ">
                    <div className="flex items-center gap-3 justify-end mx-4">
                      <div>
                        <Switch />
                      </div>
                      <div className="flex items-center">
                        <button onClick={showModalEditCs}>
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                        </button>
                        <Modal
                          title="Surge"
                          open={isModalVisibleEditCs}
                          centered
                          onOk={handleEditConfirmCs}
                          onCancel={handleEditCancelCs}
                          footer={null}
                        >
                          <form onSubmit={formSubmit3}>
                            <div className="flex flex-col gap-4">
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="ruleNamedata"
                                >
                                  Rule Name
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Rule Name"
                                  value={formData3.ruleNamedata}
                                  id="ruleNamedata"
                                  name="ruleNamedata"
                                  onChange={inputChange3}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="baseFaredata"
                                >
                                  Base Fare
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Base Fare"
                                  value={formData3.baseFaredata}
                                  id="baseFaredata"
                                  name="baseFaredata"
                                  onChange={inputChange3}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="baseDistancedata"
                                >
                                  Base Distance
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Base Distance"
                                  value={formData3.baseDistancedata}
                                  id="baseDistancedata"
                                  name="baseDistancedata"
                                  onChange={inputChange3}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="waitingFaredata"
                                >
                                  Waiting Fare
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Waiting Fare"
                                  value={formData3.waitingFaredata}
                                  id="waitingFaredata"
                                  name="waitingFaredata"
                                  onChange={inputChange3}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="waitingTimedata"
                                >
                                  Waiting Time (minutes)
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Waiting Time"
                                  value={formData3.waitingTimedata}
                                  id="waitingTimedata"
                                  name="waitingTimedata"
                                  onChange={inputChange3}
                                />
                              </div>
                              <div className="flex items-center">
                                <label
                                  className="w-1/3 text-gray-500"
                                  htmlFor="geofencedata"
                                >
                                  Geofence
                                </label>
                                <input
                                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                                  type="text"
                                  placeholder="Geofence"
                                  value={formData3.geofencedata}
                                  id="geofencedata"
                                  name="geofencedata"
                                  onChange={inputChange3}
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                              <button
                                className="bg-cyan-50 py-2 px-4 rounded-md"
                                type="button"
                                onClick={handleEditCancelCr}
                              >
                                Cancel
                              </button>
                              <button
                                className="bg-teal-700 text-white py-2 px-4 rounded-md"
                                type="submit"
                                onClick={handleEditCancelCs}
                              >
                                Add
                              </button>
                            </div>
                          </form>
                        </Modal>
                      </div>
                      <button onClick={showModalDeleteCs}>
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                      <Modal
                     onOk={showModalDeleteOkCs}
                     onCancel={showModalDeleteCancelCs}
                     footer={null}
                     open={isShowModalDeleteCs}
                     centered
                    >
                    
                    <p className="font-semibold text-[18px] mb-5">Are you sure want to delete?</p>
                    <div className="flex justify-end">
                    <button className="bg-cyan-100 px-5 py-1 rounded-md font-semibold" onClick={showModalDeleteCancelCs}>Cancel</button>
                    <button className="bg-teal-800 px-5 py-1 rounded-md ml-3 text-white"> Delete</button>
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

export default Pricing;
