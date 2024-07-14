import React, { useState } from "react";
import { ArrowLeftOutlined, SettingOutlined } from "@ant-design/icons";
import { Modal, Switch } from "antd";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import {
  Step,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
} from "@chakra-ui/react";
import SidebarDelivery from "../../../components/model/SidebarDelivery";

const DeliveryManagement = () => {
  const [settings, setSettings] = useState({
    selectedOption: "",
    expires: "",
    maxRadius: "",
    prioritize: "",
  });

  const steps = [
    {
      title: "Merchant Name",
      description: "by Admin ID #123",
      adress: "56, Post office, Pattom, Thiruvallam Lorem Ipsum Lorem Ipsum",
      pickup: "delivery",
      time: "HH :MM",
    },
    {
      title: "Cusotmer Name",
      description: "by Admin ID #123",
      adress: "PMG",
      pickup: "delivery",
      time: "HH :MM",
    },
  ];

  const { activeStep } = useSteps({
    index: 2,
    count: steps.length,
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const data = [
    {
      time: "06.00",
      head: "order",
      adress: "56, Post office, Pattom, Thiruvallam Lorem Ipsum Lorem Ipsum",
      phone: "1234",
    },
    {
      time: "06.00",
      head: "order",
      adress: "Pattom",
    },
    {
      time: "06.00",
      head: "order",
      adress: "Pattom",
    },
    {
      time: "06.00",
      head: "order",
      adress: "Pattom",
    },
  ];
  const [value, checkValue] = useState("");

  const onChange = (checked) => {
    checkValue(checked);
    console.log(`switch to ${checked}`);
  };

  const [task, setTask] = useState("");
  console.log(task);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showOkModal = () => {
    setIsModalVisible(false);
  };

  const showModalCancel = () => {
    setIsModalVisible(false);
  };

  const [isModalVisibleAgent, setIsModalVisibleAgent] = useState(false);

  const showModalAgent = () => {
    setIsModalVisibleAgent(true);
  };

  const showOkModalAgent = () => {
    setIsModalVisibleAgent(false);
  };

  const showModalCancelAgent = () => {
    setIsModalVisibleAgent(false);
  };

  const [isModalVisibleTask, setIsModalVisibleTask] = useState(false);

  const showModalTask = () => {
    setIsModalVisibleTask(true);
  };

  const showOkModalTask = () => {
    setIsModalVisibleTask(false);
  };

  const showModalCancelTask = () => {
    setIsModalVisibleTask(false);
  };

  const [selectedOption, setSelectedOption] = useState("sales");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const submitSettings = (e) => {
    e.preventDefault();
    const data = { settings, selectedOption };
    console.log("data", data);
  };

  return (
    <>
      <SidebarDelivery />
      <div className="p-5 pl-[75px] bg-gray-100">
        <p className="text-[18px] font-semibold mt-5">
          {" "}
          <ArrowLeftOutlined /> Delivery Management
        </p>
        <div className="bg-white rounded-lg flex justify-between p-5 mt-5 ">
          <div>
            <select className="bg-blue-50 p-2 rounded-md" name="day">
              <option>Today</option>
              <option>Tomorrow</option>
            </select>
            <select className="bg-blue-50 p-2 ml-5 rounded-md" name="agent">
              <option>All Agents</option>
              <option>Agents</option>
            </select>
          </div>
          <div className="flex gap-8 items-center">
            <SettingOutlined
              className="p-4 bg-blue-50 rounded-2xl"
              onClick={showModal}
            />
            <Modal
              onOk={showOkModal}
              onCancel={showModalCancel}
              open={isModalVisible}
              width="600px"
              centered
              footer={null}
            >
              <div>
                <form onSubmit={submitSettings}>
                  <div>
                    <div className="flex justify-between mt-5">
                      <label className="text-[17px] font-semibold">
                        Request expires
                      </label>
                      <input
                        type="text"
                        name="expires"
                        className="w-2/4 border border-gray-200 rounded-lg outline-none focus:outline-none h-10"
                        value={settings.expires}
                        onChange={handleChange}
                      />
                      <div>
                        <p className="font-semibold text-[16px]">sec</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-[18px] font-semibold">
                        set auto allocation
                      </label>
                      <div className="flex items-center ">
                        <input
                          type="radio"
                          id="send-to-all"
                          name="send-to-all"
                          value="send-to-all"
                          onChange={handleOptionChange}
                          checked={selectedOption === "send-to-all"}
                          className=""
                        />
                        <label htmlFor="send-to-all" className="mx-4">
                          Send-to-all
                        </label>
                      </div>
                      <div className="flex items-center ">
                        <input
                          type="radio"
                          id="nearest-available"
                          name="nearest-available"
                          value="nearest-available"
                          onChange={handleOptionChange}
                          checked={selectedOption === "nearest-available"}
                          className=""
                        />
                        <label htmlFor="nearest-available" className="mx-4">
                          Nearest Available
                        </label>
                      </div>
                    </div>
                    {selectedOption === "send-to-all" && (
                      <div>
                        <p className="text-gray-600 mt-5 text-[17px]">
                          Force assigns the task to Agent based on availability
                          and distance
                        </p>
                        <div className="flex justify-between mt-5">
                          <label className="text-[17px] font-semibold">
                            Maximum Radius
                          </label>
                          <input
                            type="text"
                            name="maxRadius"
                            value={settings.maxRadius}
                            className="w-2/4 border border-gray-200 rounded-lg outline-none focus:outline-none h-10"
                            onChange={handleChange}
                          />
                          <div>
                            <p className="font-semibold text-[16px]">Km</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedOption === "nearest-available" && (
                      <p className="mt-5">
                        Sends the task request notification to the Agent
                        (maximum limit: 500 Agent) available in
                        the task time-slot. task gets assigned to the "Agent who
                        accepts the task request first. If no Agent accepts
                        the task, it remains unassigned."
                      </p>
                    )}
                    <div className="grid">
                      <label className="text-[18px] mt-5 font-semibold">
                        Prioritize
                      </label>
                      <div className="flex mt-3 gap-2">
                        <input
                          type="radio"
                          name="prioritize"
                          value="Default"
                          checked={settings.prioritize === "Default"}
                        />
                        <p className="font-semibold text-[16px]">Default</p>
                      </div>
                      <div className="flex">
                        <input
                          type="radio"
                          name="prioritize"
                          value="Montly salaried employees"
                          checked={
                            settings.prioritize === "Montly salaried employees"
                          }
                        />
                        <p className="font-semibold text-[16px] ml-2">
                          Montly salaried employees{" "}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-5">
                      <button
                        onClick={showModalCancel}
                        className="bg-blue-50 p-3 rounded-lg w-1/2 font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={showOkModal}
                        className="bg-teal-800 text-white p-3 w-1/2 rounded-lg"
                      >
                        Apply Auto Allocation
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Modal>

            <p>
              Auto Allocation <Switch onChange={onChange} />
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <div className="w-1/4 rounded-lg bg-white">
            <div className="bg-teal-800 text-white p-5 rounded-lg">Tasks</div>
            <div className="w-full p-2 mt-4">
              <select
                className="border-2 border-zinc-200 bg-gray-100 rounded-lg  p-2 w-full focus:outline-none"
                name="task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              >
                <option value="task" hidden selected>
                  Select Task
                </option>
                <option value="unassigned">
                  Unassigned Tasks <span className="bg-teal-800 p-2"> 10</span>
                </option>
                <option value="assigned">Assigned Tasks</option>
                <option value="assigned">Completed Tasks</option>
              </select>
              <input
                type="search"
                className="border-2 border-zinc-200 bg-white rounded-lg mt-5 p-2 w-full focus:outline-none"
                name="search"
                placeholder="Search order Id"
              />
            </div>
            <div className="p-5 bg-white">
              {task === "unassigned" && (
                <div>
                  {data.map((data) => (
                    <Card className="bg-zinc-100 mt-5">
                      <CardBody>
                        <Typography variant="h5" color="" className="">
                          {data.time}
                        </Typography>
                        <Typography>{data.head}</Typography>
                        <Typography>{data.adress}</Typography>
                        <Typography className="flex justify-between mt-3">
                          <Button className=" bg-gray-100 text-black text-[14px] font-semibold">
                            View on Map
                          </Button>

                          {value ? (
                            <div>
                              <Button
                                className=" bg-teal-800 text-white text-[14px] font-semibold"
                                onClick={showModalTask}
                              >
                                View Details
                              </Button>
                              <Modal
                                onOk={showOkModalTask}
                                onCancel={showModalCancelTask}
                                open={isModalVisibleTask}
                                width="600px"
                                centered
                                title="Task details"
                                footer={null}
                              >
                                <div>
                                  <div className="flex gap-10 text-[18px] font-normal mt-5">
                                    <div className="w-1/2 me-3  grid gap-3">
                                      <div className="flex justify-between">
                                        <label className="text-gray-500">
                                          Task Id
                                        </label>
                                        <p>12</p>
                                      </div>
                                      <div className="flex justify-between ">
                                        <label className="text-gray-500">
                                          Delivery Method
                                        </label>
                                        <p>Online</p>
                                      </div>
                                    </div>
                                    <div className="w-1/2 grid gap-3">
                                      <div className="flex justify-between">
                                        <label className="text-gray-500">
                                          Agent Name
                                        </label>
                                        <p>Name</p>
                                      </div>
                                      <div className="flex justify-between">
                                        <label className="text-gray-500">
                                          Agent ID
                                        </label>
                                        <p>12</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="mt-5 text-lg font-semibold">
                                      Task status
                                    </p>
                                    <div className="mt-5">
                                      <Stepper
                                        index={activeStep}
                                        orientation="vertical"
                                        colorScheme="teal"
                                        gap="2"
                                      >
                                        {steps.map((step, index) => (
                                          <Step
                                            key={index}
                                            className="flex gap-5 size-20"
                                          >
                                            <StepIndicator>
                                              <StepStatus
                                                complete={
                                                  <div className="bg-teal-500 w-8 h-8 flex items-center justify-center rounded-full text-white font-bold">
                                                    {index + 1}
                                                  </div>
                                                }
                                                incomplete={
                                                  <div className="bg-gray-300 w-8 h-8 flex items-center justify-center rounded-full text-gray-700 font-bold">
                                                    {index + 1}
                                                  </div>
                                                }
                                                active={
                                                  <div className="bg-teal-800 w-8 h-8 flex items-center justify-center rounded-full text-white font-bold">
                                                    {index + 1}
                                                  </div>
                                                }
                                              />
                                            </StepIndicator>
                                            <Box
                                              flexShrink="0"
                                              className="ml-4"
                                            >
                                              <StepTitle className="font-semibold text-[16px]">
                                                {step.title}
                                              </StepTitle>
                                              <StepDescription className="text-sm text-gray-500">
                                                {step.description}
                                              </StepDescription>
                                              <Step className="text-sm text-gray-500">
                                                {step.adress}
                                              </Step>
                                            </Box>
                                            <Box
                                              flexShrink="0"
                                              className="ml-36"
                                            >
                                              <Step>
                                                Expected Time {step.pickup}
                                              </Step>
                                              <Step>
                                                Pick up Time {step.time}
                                              </Step>
                                            </Box>
                                            <StepSeparator className="my-2" />
                                          </Step>
                                        ))}
                                      </Stepper>
                                    </div>
                                  </div>
                                </div>
                              </Modal>
                            </div>
                          ) : (
                            <div>
                              <Button
                                className=" bg-teal-800  text-white text-[13px]  font-semibold"
                                onClick={showModalAgent}
                              >
                                Assign Agent
                              </Button>
                              <Modal
                                title="Assign Agent"
                                onOk={showOkModalAgent}
                                onCancel={showModalCancelAgent}
                                open={isModalVisibleAgent}
                                footer={null}
                                width="600px"
                                centered
                              >
                                <div>
                                  <div className="flex mt-5">
                                    <label className="w-1/3 text-gray-600">
                                      Task ID
                                    </label>
                                    <p className="font-semibold">123</p>
                                  </div>
                                  <div className="flex mt-5">
                                    <label className="w-1/3 text-gray-600">
                                      Geofence
                                    </label>
                                    <p className="font-semibold">
                                      <Switch />
                                    </p>
                                  </div>
                                  <div className="flex mt-5 ">
                                    <label className="w-1/3 text-gray-600">
                                      Agent
                                    </label>
                                    <select
                                      className="w-2/3 mr-8 p-2 rounded-lg border border-gray-300 outline-none focus:outline-none"
                                      name="agent"
                                    >
                                      <option>Assign Agent</option>
                                    </select>
                                  </div>
                                  <div className="flex justify-end gap-5 mt-10">
                                    <button className="bg-zinc-200 p-2 rounded-md px-4">
                                      Cancel
                                    </button>
                                    <button className="bg-teal-800 text-white p-2 rounded-md px-4">
                                      Assign Agent
                                    </button>
                                  </div>
                                </div>
                              </Modal>
                            </div>
                          )}
                        </Typography>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )}

              {task === "assigned" && (
                <div>
                  {data.map((data) => (
                    <Card className="bg-zinc-100 mt-5">
                      <CardBody>
                        <Typography variant="h5" color="blue-gray" className="">
                          {data.time}
                        </Typography>
                        <Typography>{data.head}</Typography>
                        <Typography>{data.adress}</Typography>

                        <Typography className="flex justify-between mt-3 ">
                          <Button className=" bg-gray-100 text-black text-[14px] font-semibold">
                            View on Map
                          </Button>
                          <Button
                            className=" bg-teal-800 text-white text-[14px] font-semibold"
                            onClick={showModalTask}
                          >
                            View Details
                          </Button>
                          <Modal
                            onOk={showOkModalTask}
                            onCancel={showModalCancelTask}
                            open={isModalVisibleTask}
                            width="600px"
                            centered
                            title="Task details"
                            footer={null}
                          >
                            <div>
                              <div className="flex gap-10 text-[18px] font-normal mt-5">
                                <div className="w-1/2 me-3  grid gap-3">
                                  <div className="flex justify-between">
                                    <label className="text-gray-500">
                                      Task Id
                                    </label>
                                    <p>12</p>
                                  </div>
                                  <div className="flex justify-between ">
                                    <label className="text-gray-500">
                                      Delivery Method
                                    </label>
                                    <p>Online</p>
                                  </div>
                                </div>
                                <div className="w-1/2 grid gap-3">
                                  <div className="flex justify-between">
                                    <label className="text-gray-500">
                                      Agent Name
                                    </label>
                                    <p>Name</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <label className="text-gray-500">
                                      Agent ID
                                    </label>
                                    <p>12</p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <p className="mt-5 text-lg font-semibold">
                                  Task status
                                </p>
                                <div className="mt-5">
                                  <Stepper
                                    index={activeStep}
                                    orientation="vertical"
                                    colorScheme="teal"
                                    gap="2"
                                  >
                                    {steps.map((step, index) => (
                                      <Step
                                        key={index}
                                        className="flex gap-5 size-20"
                                      >
                                        <StepIndicator>
                                          <StepStatus
                                            complete={
                                              <div className="bg-teal-500 w-8 h-8 flex items-center justify-center rounded-full text-white font-bold">
                                                {index + 1}
                                              </div>
                                            }
                                            incomplete={
                                              <div className="bg-gray-300 w-8 h-8 flex items-center justify-center rounded-full text-gray-700 font-bold">
                                                {index + 1}
                                              </div>
                                            }
                                            active={
                                              <div className="bg-teal-800 w-8 h-8 flex items-center justify-center rounded-full text-white font-bold">
                                                {index + 1}
                                              </div>
                                            }
                                          />
                                        </StepIndicator>
                                        <Box flexShrink="0" className="ml-4">
                                          <StepTitle className="font-semibold text-[16px]">
                                            {step.title}
                                          </StepTitle>
                                          <StepDescription className="text-sm text-gray-500">
                                            {step.description}
                                          </StepDescription>
                                          <Step className="text-sm text-gray-500">
                                            {step.adress}
                                          </Step>
                                        </Box>
                                        <Box flexShrink="0" className="ml-36">
                                          <Step>
                                            Expected Time {step.pickup}
                                          </Step>
                                          <Step>Pick up Time {step.time}</Step>
                                        </Box>
                                        <StepSeparator className="my-2" />
                                      </Step>
                                    ))}
                                  </Stepper>
                                </div>
                              </div>
                            </div>
                          </Modal>
                        </Typography>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="w-2/4">
            <img className="w-full" src="map.svg" />
          </div>
          <div className="w-1/4 rounded-lg bg-white">
            <div className="bg-teal-800 text-white p-5 rounded-lg">Agents</div>
            <div className="w-full p-2 bg-white">
              <select
                className="border-2 border-zinc-200 bg-gray-100 rounded-lg  p-2 w-full focus:outline-none"
                name="tasks"
              >
                <option value="free">Free</option>
                <option value="busy">Busy</option>
                <option value="inactive">Inactive</option>
              </select>
              <input
                type="search"
                className="border-2 border-zinc-200 bg-white rounded-lg mt-5 p-2 w-full focus:outline-none"
                name="search"
                placeholder="Search agents"
              />
            </div>
            <div className="p-5 ">
              {data.map((data) => (
                <Card className="bg-zinc-100 mt-5 flex">
                  <div className="flex justify-between">
                    <div className="w-2/3">
                      <CardBody>
                        <Typography variant="h5" color="blue-gray" className="">
                          {data.time}
                        </Typography>
                        <Typography>{data.head}</Typography>
                        <Typography>{data.phone}</Typography>
                      </CardBody>
                    </div>
                    <div className="w-1/3 flex justify-center items-center">
                      <p className="bg-teal-800 rounded-full p-3 text-white">
                        10
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryManagement;
