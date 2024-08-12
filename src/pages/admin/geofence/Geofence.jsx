import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import GlobalSearch from "../../../components/GlobalSearch";
import { mappls } from "mappls-web-maps";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { Modal } from "antd";
import { Menu, MenuButton, MenuItem, MenuList, useToast } from "@chakra-ui/react";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Geofence = () => {
  const mapContainerRef = useRef(null);
  const [mapObject, setMapObject] = useState(null);
  const { token } = useContext(UserContext);
  const [geofences, setGeofences] = useState([]);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState({});
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const toast = useToast()

  const [authToken, setAuthToken] = useState("");


    const getAuthToken = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/token/get-auth-token`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setAuthToken(response.data.data);
        }
      } catch (err) {
        console.log(`Error in getting auth token`);
      }
    };

   
 

  useEffect(() => {
    getAuthToken();
    getAllGeofence();
  }, []);

  const mapplsClassObject = new mappls();

  useEffect(() => {
    if (geofences.length >= 0) {
      console.log("Token", authToken)
      const mapProps = {
        center: [8.528818999999999, 76.94310683333333],
        traffic: true,
        zoom: 12,
        geolocation: true,
        clickableIcons: true,
      };

      console.log("Mappls", mapplsClassObject);

      mapplsClassObject.initialize(
        `${authToken}`,
        async () => {
          if (mapContainerRef.current) {
            console.log("Initializing map...");
            const map = await mapplsClassObject.Map({
              id: "map",
              properties: mapProps,
            });

            if (map && typeof map.on === "function") {
              console.log("Map initialized successfully.");
              map.on("load", async () => {
                console.log("Map loaded.");
                setMapObject(map);
                setIsMapLoaded(true);
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
    }
  }, [geofences]);

  const GeoJsonComponent = ({ map }) => {
    const geoJsonRef = useRef(null);
    const geoJSON = {
      type: "FeatureCollection",
      features: geofences.map((geofence) => ({
        type: "Feature",
        properties: {
          class_id: geofence.id,
          name: geofence.name,
          stroke: geofence.color,
          "stroke-opacity": 0.4,
          "stroke-width": 3,
          fill: geofence.color,
          "fill-opacity": 0.4,
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            geofence.coordinates.map((coord) => [coord[0], coord[1]]),
          ],
        },
      })),
    };
    console.log("geoJSON", geoJSON)

    useEffect(() => {
      if (geoJsonRef.current) {
        mapplsClassObject.removeLayer({ map: map, layer: geoJsonRef.current });
      }
      geoJsonRef.current = mapplsClassObject.addGeoJson({
        map: map,
        data: geoJSON,
        overlap: false,
        fitbounds: true,
        preserveViewport: false,
      });
    }, [map]); // Ensure this only runs when `map` or `geoJSON` change
  };

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

  const handleDelete = async(id)=>{
    try{
      const deleteResponse = await axios.delete(
        `${BASE_URL}/admin/geofence/delete-geofence/${id}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (deleteResponse.status === 200) {
        toast({
          title: "Success",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    }catch(err){
      console.log("Error in deleting geofence: ", err.message);
    }
  }

  const showModalDeleteTask = (taskId) => {
    setVisibleDeleteModal((prev) => ({ ...prev, [taskId]: true }));
  };

  const showModalDeleteCancelTask = (taskId) => {
    setVisibleDeleteModal((prev) => ({ ...prev, [taskId]: false }));
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
          <Link
            to="/add-geofence"
            className="bg-teal-700 text-white rounded-md flex items-center px-9 py-2 "
          >
            <PlusOutlined className="mr-2" /> Add Geofence
          </Link>
        </div>
        <p className=" text-gray-500  mx-10 mt-5">
          A geofence is a virtual perimeter for a real-world geographic area.
          Different geofences can be assigned to a single city.
        </p>
        <div className="flex justify-between mt-10 gap-5 mx-10">
          <div className="w-1/3 max-h-[32rem] overflow-y-auto">
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
                        <MenuItem>
                          <Link
                            className="text-black "
                            to={`/edit-geofence?id=${data._id}`}
                          >
                            Edit
                          </Link>
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
                      onClick={()=>{handleDelete(data._id)
                        showModalDeleteCancelTask(data._id)
                      }}
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
            >
              {isMapLoaded && geofences.length >= 0 && (
                <GeoJsonComponent map={mapObject} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Geofence;
