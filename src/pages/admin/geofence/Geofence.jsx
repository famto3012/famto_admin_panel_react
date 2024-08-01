import React, { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { BellOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import GlobalSearch from "../../../components/GlobalSearch";
import { mappls } from "mappls-web-maps";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { Modal } from "antd";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import AddGeofenceModal from "../../../components/model/AddGeofenceModel/AddGeofenceModel";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Geofence = () => {
  const mapContainerRef = useRef(null);
  const mapAddContainerRef = useRef(null);
  const [mapObject, setMapObject] = useState(null);
  const [mapAddObject, setMapAddObject] = useState(null);
  const { token } = useContext(UserContext);
  const [geofences, setGeofences] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState({});
  const [visibleDeleteModal, setVisibleDeleteModal] = useState({});

  useEffect(() => {
    getAllGeofence();
    const mapProps = {
      center: [8.528818999999999, 76.94310683333333],
      traffic: true,
      zoom: 12,
      geolocation: true,
      clickableIcons: true,
    };

    const mapplsClassObject = new mappls();

    mapplsClassObject.initialize(
      "9a632cda78b871b3a6eb69bddc470fef",
      async () => {
        if (mapContainerRef.current) {
          console.log("Initializing map...");
          const map = await mapplsClassObject.Map({
            id: "map",
            properties: mapProps,
          });

          if (map && typeof map.on === "function") {
            console.log("Map initialized successfully.");
            map.on("load", () => {
              console.log("Map loaded.");
              setMapObject(map);
              addGeofencesToMap(map); // Save the map object to state
            });
          } else {
            console.error(
              "mapObject.on is not a function or mapObject is not defined"
            );
          }
        } else {
          console.error("Map container not found");
        }
      }
    );
  }, []);

  // useEffect(() => {
  //   if (isModalVisible) {
  //     console.log("Add geofence modal is visible");

  //     const mapProps = {
  //       center: [8.528818999999999, 76.94310683333333],
  //       traffic: true,
  //       zoom: 12,
  //       geolocation: true,
  //       clickableIcons: true,
  //     };

  //     const mapplsClassObject = new mappls();

  //     // Delay the map initialization to ensure the modal is fully rendered
  //     setTimeout(() => {
  //       if (mapAddContainerRef.current) {
  //         console.log("Initializing map in modal...");
  //         mapplsClassObject.initialize(
  //           "9a632cda78b871b3a6eb69bddc470fef",
  //           async () => {
  //             console.log("Inside initialize callback");

  //             try {
  //               const map = await mapplsClassObject.Map({
  //                 id: "modalMap",
  //                 properties: mapProps,
  //               });

  //               if (map && typeof map.on === "function") {
  //                 console.log("Map add initialized successfully.");
  //                 map.on("load", () => {
  //                   console.log("Map add loaded.");
  //                   setMapAddObject(map);
  //                 });
  //               } else {
  //                 console.error(
  //                   "mapObject.on is not a function or mapObject is not defined"
  //                 );
  //               }
  //             } catch (error) {
  //               console.error("Error initializing map:", error);
  //             }
  //           }
  //         );
  //       } else {
  //         console.error("Map container not found in modal");
  //       }
  //     }, 500); // Adjust the delay as necessary
  //   }
  // }, [isModalVisible]);

  const getAllGeofence = async () => {
    try {
      console.log(token);
      const response = await axios.get(
        `${BASE_URL}/admin/geofence/get-geofence`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setGeofences(response.data.geofences);
      }
    } catch (err) {
      console.log("Error in fetching geofences: ", err);
    }
  };

  const addGeofencesToMap = (map) => {
    const mapplsClassObject = new mappls();
    geofences.forEach((geofence) => {
      const coordinates = geofence.coordinates.map((coord) => [
        coord[0],
        coord[1],
      ]);
      const polygon = new mapplsClassObject.Polygon({
        paths: coordinates,
        strokeColor: geofence.color,
        strokeWeight: 2,
        fillColor: geofence.color,
        fillOpacity: 0.4,
      });
      polygon.setMap(map);

      const popup = new mapplsClassObject.Popup({
        content: `<div>${geofence.name}</div>`,
        position: coordinates[0],
      });

      polygon.addListener("click", () => {
        popup.open(map);
      });
    });
  };

  const showModalEditTask = (taskId) => {
    setVisibleEditModal((prev) => ({ ...prev, [taskId]: true }));
  };

  const showModalEditCancelTask = (taskId) => {
    setVisibleEditModal((prev) => ({ ...prev, [taskId]: false }));
  };

  const showModalDeleteTask = (taskId) => {
    setVisibleDeleteModal((prev) => ({ ...prev, [taskId]: true }));
  };

  const showModalDeleteCancelTask = (taskId) => {
    setVisibleDeleteModal((prev) => ({ ...prev, [taskId]: false }));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showOkModal = () => {
    setIsModalVisible(false);
  };

  const showModalCancel = () => {
    setIsModalVisible(false);
  };

  const [color, setColor] = useState("#4931a0"); // default color

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleInputChange = (e) => {
    setGeofences({ ...geofences, [e.target.name]: e.target.value });
  };

  const signupAction = (e) => {
    e.preventDefault();
    const location = { geofences, color };
    console.log("Confirmed Location", location);
  };

  return (
    <>
      <Sidebar />
      <div className="w-full min-h-screen pl-[300px] bg-gray-100 flex flex-col">
        <nav className="p-5">
          <GlobalSearch />
        </nav>
        <div className="flex items-center justify-between mx-10">
          <h1 className="font-bold text-lg">Geofence</h1>
          <button
            // to="/add-geofence"
            className="bg-teal-700 text-white rounded-md flex items-center px-9 py-2 "
            onClick={showModal}
          >
            <PlusOutlined className="mr-2" /> Add Geofence
          </button>
          <AddGeofenceModal
            isModalVisible={isModalVisible}
            handleOk={showOkModal}
            handleCancel={showModalCancel}
            setMapAddObject={setMapAddObject}
          />
        </div>
        <p className=" text-gray-500  mx-10 mt-5">
          A geofence is a virtual perimeter for a real-world geographic area.
          Different geofences can be assigned to a single city.
        </p>
        <div className="flex justify-between mt-10 gap-5 mx-10">
          <div className="w-1/3">
            {geofences.map((data) => (
              <Card
                className="bg-zinc-100 mt-5 flex hover:bg-teal-800 hover:text-white"
                key={data._id}
              >
                <div className="flex justify-evenly mx-5">
                  <div className="flex items-center">
                    <p
                      className="rounded-full p-4 text-white"
                      style={{ backgroundColor: data.color }}
                    ></p>
                  </div>
                  <div>
                    <CardBody>
                      <Typography variant="h5" color="blue-gray" className="">
                        {data.name}
                      </Typography>
                      <Typography>{data.description}</Typography>
                    </CardBody>
                  </div>
                  <div className="flex items-center">
                    <Menu isLazy>
                      <MenuButton>
                        <MoreHorizOutlinedIcon />
                      </MenuButton>
                      <MenuList>
                        <MenuItem
                          className="text-black"
                          onClick={() => showModalEditTask(data._id)}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          className="text-black"
                          onClick={() => showModalDeleteTask(data._id)}
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </div>
                </div>
                <Modal
                  onOk={() => showModalEditCancelTask(data._id)}
                  onCancel={() => showModalEditCancelTask(data._id)}
                  open={visibleEditModal[data._id] || false}
                  width="500px"
                  centered
                  title="Edit Geofence"
                  footer={null}
                >
                  <form onSubmit={signupAction}>
                    <div className="flex flex-col gap-3 ">
                      <div>
                        <label
                          className="w-1/3 text-md font-medium"
                          htmlFor="regionName"
                        >
                          Colour
                        </label>
                        <div className="relative rounded-full">
                          <input
                            type="color"
                            className="appearance-none w-full h-12 rounded outline-none focus:outline-none mt-2"
                            style={{ WebkitAppearance: "none" }}
                            value={color}
                            onChange={handleColorChange}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <ColorLensOutlinedIcon className=" text-white text-[25px]" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label
                          className="w-1/3 text-md font-medium"
                          htmlFor="regionName"
                        >
                          Region name
                        </label>
                        <input
                          type="text"
                          name="regionName"
                          placeholder="Region Name"
                          className=" w-full p-2 bg-white mt-3 rounded focus:outline-none outline-none border border-gray-300"
                          value={geofences.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label
                          className="w-1/3 text-md font-medium"
                          htmlFor="regionDescription"
                        >
                          Region description
                        </label>
                        <input
                          type="text"
                          name="regionDescription"
                          placeholder="Region Description"
                          className=" w-full p-2 bg-white mt-3 rounded focus:outline-none outline-none border border-gray-300"
                          value={geofences.description}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex justify-end gap-4 mt-6">
                        <button
                          className="bg-cyan-50 px-7 py-1 rounded-md"
                          type="button"
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-teal-700 text-white px-8 py-1 rounded-md"
                          type="submit"
                          onClick={signupAction}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </Modal>
                <Modal
                  onOk={() => showModalDeleteCancelTask(data._id)}
                  onCancel={() => showModalDeleteCancelTask(data._id)}
                  open={visibleDeleteModal[data._id] || false}
                  width="450px"
                  centered
                  title="Delete Geofence"
                  footer={null}
                >
                  <p className="font-semibold text-[14px] mb-5">
                    Are you sure you want to delete?
                  </p>
                  <div className="flex justify-end">
                    <button
                      className="bg-cyan-100 px-5 py-1 rounded-md font-semibold"
                      // onClick={showModalDeleteCancel1}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-red-100 px-5 py-1 rounded-md ml-3 text-red-700"
                      //onClick={()=>{handleDelete(alertItem._id)
                      //  showModalCancelTask(alertItem._id)
                      //}}
                    >
                      Delete
                    </button>
                  </div>
                </Modal>
              </Card>
            ))}
          </div>
          <div className="w-3/4 bg-white h-[520px]">
            <div
              id="map"
              ref={mapContainerRef}
              style={{ width: "99%", height: "510px", display: "inline-block" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Geofence;
