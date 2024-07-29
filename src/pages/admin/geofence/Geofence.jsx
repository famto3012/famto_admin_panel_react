import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { BellOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import GlobalSearch from "../../../components/GlobalSearch";
import { mappls } from "mappls-web-maps";

const Geofence = () => {
  const mapContainerRef = useRef(null);
  const [mapObject, setMapObject] = useState(null);
  const data = [
    {
      time: "Lorem Ipsum",
      head: "lorem ipsum",
    },
  ];

  useEffect(() => {
   
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
                setMapObject(map); // Save the map object to state
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
          <div className="w-1/3">
            {data.map((data) => (
              <Card className="bg-zinc-100 mt-5 flex hover:bg-teal-800 hover:text-white" key={data._id}>
                <div className="flex justify-evenly mx-5">
                  <div className=" flex items-center">
                    <p className="bg-cyan-200 rounded-full p-4 text-white "></p>
                  </div>
                  <div>
                    <CardBody>
                      <Typography variant="h5" color="blue-gray" className="">
                        {data.time}
                      </Typography>
                      <Typography>{data.head}</Typography>
                    </CardBody>
                  </div>
                  <div className="flex items-center">
                    <MoreHorizOutlinedIcon />
                  </div>
                </div>
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
