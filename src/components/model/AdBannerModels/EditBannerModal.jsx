// import { useState, useEffect, useRef } from "react";
// import { Modal } from "antd";
// import axios from "axios";
// import { MdCameraAlt } from "react-icons/md";
// import { useToast } from "@chakra-ui/react";

// const EditBannerModal = ({
//   isVisible,
//   handleCancel,
//   token,
//   allGeofence,
//   currentBannerEdit,
//   BASE_URL,
//   onAddAppData,
// }) => {
//   // Initialize state with currentBannerEdit details if available
//   const [appBanner, setAppData] = useState({
//     name: "",
//     merchantId: "",
//     geofenceId: "",
//     imageUrl: "",
//   });
//   const fileInputRef = useRef(null);
//   const [fileSelected, setFileSelected] = useState(null);
//   const [bannerPreviewURL, setBannerPreviewURL] = useState(null);

//   const [confirmLoading, setConfirmLoading] = useState(false);

//   const toast = useToast();

//   useEffect(() => {
//     if (!currentBannerEdit) return;

//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/admin/app-banner/get-app-banner/${currentBannerEdit}`,
//           {
//             withCredentials: true,
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         if (response.status === 200) {
//           const { data } = response.data;
//           setAppData(data);
//         }
//       } catch (err) {
//         console.error(`Error in fetching data:`, err);
//         toast({
//           title: "Error",
//           description: "Error in getting banner data",
//           status: "error",
//           duration: 3000,
//           isClosable: true,
//         });
//       }
//     };

//     if (currentBannerEdit) {
//       fetchData();
//       console.log("currentBannner",currentBannerEdit)
//     }
//   }, [isVisible, token]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setAppData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSelectImage = (e) => {
//     const file = e.target.files[0];
//     console.log("File", file);
//     fileInputRef.current = file; // store the selected file in the ref
//     console.log("Selected File handle", fileInputRef.current); 
//     setFileSelected(fileInputRef.current);
//     setBannerPreviewURL(URL.createObjectURL(file));
//     console.log("Banner preview url", URL.createObjectURL(file));
//   };

//   // useEffect(() => {
//   //   console.log("Banner preview url", bannerPreviewURL)
//   //   console.log("Selected File", fileSelected)
//   // }, [bannerPreviewURL, fileSelected])

//   const saveAction = async (e) => {
//     e.preventDefault();

//     try {
//       setConfirmLoading(true);

//       const dataToSend = new FormData();
//       const file = fileInputRef.current;
//       console.log("SELECTED FILE", file);

//       dataToSend.append("name", appBanner.name);
//       dataToSend.append("merchantId", appBanner.merchantId);
//       dataToSend.append("geofenceId", appBanner.geofenceId);
//       // dataToSend.append("imageUrl", appBanner.imageUrl);
     
//       if (fileSelected) {
//         dataToSend.append("bannerImage", fileSelected);
//       }

//       for (let pair of dataToSend.entries()) {
//         console.log(pair[0] + ": " + pair[1]);
//       }

//       const response = await axios.put(
//         `${BASE_URL}/admin/app-banner/edit-app-banner/${currentBannerEdit}`,
//         dataToSend,
//         {
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.status === 200) {
//         onAddAppData(response.data.data);
//         setAppData({
//           name: "",
//           merchantId: "",
//           geofenceId: "",
//           imageUrl: "",
//         });
//         setFileSelected(null);
//         setBannerPreviewURL(null);
//         handleCancel();
//         toast({
//           title: "Success",
//           description: "Banner updated successfully",
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//         });
//       }
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: "Error in updating banner",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//       console.log(err.message)
//     } finally {
//       setConfirmLoading(false);
//     }
//   };

//   return (
//     <Modal
//       title="Edit App Ad Banner"
//       open={isVisible}
//       onCancel={handleCancel}
//       footer={null}
//       centered
//     >
//       <form onSubmit={saveAction} autoComplete="off">
//         <div className="flex flex-col gap-4">
//           <div className="flex items-center">
//             <label htmlFor="name" className="w-1/3">
//               Name
//             </label>
//             <input
//               type="text"
//               placeholder="Name"
//               id="name"
//               name="name"
//               value={appBanner?.name}
//               onChange={handleInputChange}
//               className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
//             />
//           </div>

//           <div className="flex items-center">
//             <label htmlFor="merchantId" className="w-1/3">
//               Merchant ID
//             </label>
//             <input
//               type="text"
//               placeholder="Merchant ID"
//               id="merchantId"
//               name="merchantId"
//               value={appBanner?.merchantId}
//               onChange={handleInputChange}
//               className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
//             />
//           </div>

//           <div className="flex items-center">
//             <label htmlFor="geofenceId" className="w-1/3">
//               Geofence
//             </label>
//             <select
//               className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
//               name="geofenceId"
//               value={appBanner?.geofenceId}
//               onChange={handleInputChange}
//             >
//               {allGeofence.map((geofence) => (
//                 <option key={geofence._id} value={geofence._id}>
//                   {geofence.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex items-center">
//             <label className="w-1/3">Banner Image (390px x 400px)</label>
//             <div className="flex items-center gap-[30px]">
//               {bannerPreviewURL && (
//                 <>
//                   <p>Hello</p>
//                   <figure className="mt-3 h-16 w-16 rounded-md relative">
//                     <img
//                       src={bannerPreviewURL}
//                       alt="Preview"
//                       className="w-full rounded h-full object-cover"
//                     />
//                   </figure>
//                 </>
//               )}

//               {/* Display the current image from state if no new image is selected */}
//               {!bannerPreviewURL && appBanner?.imageUrl && (
//                 <figure className="mt-3 h-16 w-16 rounded-md relative">
//                   <img
//                     src={appBanner?.imageUrl}
//                     alt="Current"
//                     className="w-full rounded h-full object-cover"
//                   />
//                 </figure>
//               )}

//               <input
//                 type="file"
//                 name="bannerImage"
//                 id="bannerImage"
//                 className="hidden"
//                 onChange={handleSelectImage}
//                 // ref={fileInputRef}
//               />
//               <label htmlFor="bannerImage" className="cursor-pointer">
//                 <MdCameraAlt
//                   className="bg-teal-800 text-[30px] text-white p-4 h-16 w-16 mt-3 rounded-md"
//                   size={30}
//                 />
//               </label>
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-end gap-4 mt-6">
//           <button
//             className="bg-cyan-50 py-2 px-4 rounded-md"
//             type="button"
//             onClick={handleCancel}
//           >
//             Cancel
//           </button>
//           <button
//             className="bg-teal-700 text-white py-2 px-4 rounded-md"
//             type="submit"
//           >
//             {confirmLoading ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default EditBannerModal;

import { useState, useEffect, useRef } from "react";
import { Modal } from "antd";
import axios from "axios";
import { MdCameraAlt } from "react-icons/md";
import { useToast } from "@chakra-ui/react";

const EditBannerModal = ({
  isVisible,
  handleCancel,
  token,
  allGeofence,
  currentBannerEdit,
  BASE_URL,
  onAddAppData,
}) => {
  const [appBanner, setAppData] = useState({
    name: "",
    merchantId: "",
    geofenceId: "",
    imageUrl: "",
  });
  let imageFile = {}
  const fileInputRef = useRef(null); // Ref to store the file
  const [bannerPreviewURL, setBannerPreviewURL] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (!currentBannerEdit) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/admin/app-banner/get-app-banner/${currentBannerEdit}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          const { data } = response.data;
          setAppData(data);
        }
      } catch (err) {
        console.error(`Error in fetching data:`, err);
        toast({
          title: "Error",
          description: "Error in getting banner data",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    if (currentBannerEdit) {
      fetchData();
      console.log("currentBanner", currentBannerEdit);
    }
  }, [isVisible, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectImage = (e) => {
    const file = fileInputRef.current.files[0];
    console.log("file", file)
    if (file) {
      // fileInputRef.current = file; // Store the selected file in the ref
      setBannerPreviewURL(URL.createObjectURL(file));
      imageFile.file = file
      console.log("File selected:", file); // Log the file
      console.log("File selected:", imageFile); // Log the file
      // console.log("File stored in ref:", fileInputRef.current); // Log the ref value
    } else {
      console.log("No file selected.");
    }
  };

  const saveAction = async (e) => {
    e.preventDefault();

    try {
      setConfirmLoading(true);

      const dataToSend = new FormData();
      const file = fileInputRef.current.files[0]; // Get the file from the ref
     
      if (!file) {
        console.error("No file found in ref.");
      }

      dataToSend.append("name", appBanner.name);
      dataToSend.append("merchantId", appBanner.merchantId);
      dataToSend.append("geofenceId", appBanner.geofenceId);

      if (file) {
        console.log(file)
        dataToSend.append("bannerImage", file); // Use the file stored in the ref
      }

      for (let pair of dataToSend.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await axios.put(
        `${BASE_URL}/admin/app-banner/edit-app-banner/${currentBannerEdit}`,
        dataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        onAddAppData(response.data.data);
        setAppData({
          name: "",
          merchantId: "",
          geofenceId: "",
          imageUrl: "",
        });
        fileInputRef.current = null; // Clear the ref after successful submission
        setBannerPreviewURL(null);
        handleCancel();
        toast({
          title: "Success",
          description: "Banner updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error in updating banner",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(err.message);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title="Edit App Ad Banner"
      open={isVisible}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <form onSubmit={saveAction} autoComplete="off">
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <label htmlFor="name" className="w-1/3">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              id="name"
              name="name"
              value={appBanner?.name}
              onChange={handleInputChange}
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="merchantId" className="w-1/3">
              Merchant ID
            </label>
            <input
              type="text"
              placeholder="Merchant ID"
              id="merchantId"
              name="merchantId"
              value={appBanner?.merchantId}
              onChange={handleInputChange}
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="geofenceId" className="w-1/3">
              Geofence
            </label>
            <select
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="geofenceId"
              value={appBanner?.geofenceId}
              onChange={handleInputChange}
            >
              {allGeofence.map((geofence) => (
                <option key={geofence._id} value={geofence._id}>
                  {geofence.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <label className="w-1/3">Banner Image (390px x 400px)</label>
            <div className="flex items-center gap-[30px]">
              {bannerPreviewURL && (
                <figure className="mt-3 h-16 w-16 rounded-md relative">
                  <img
                    src={bannerPreviewURL}
                    alt="Preview"
                    className="w-full rounded h-full object-cover"
                  />
                </figure>
              )}

              {!bannerPreviewURL && appBanner?.imageUrl && (
                <figure className="mt-3 h-16 w-16 rounded-md relative">
                  <img
                    src={appBanner?.imageUrl}
                    alt="Current"
                    className="w-full rounded h-full object-cover"
                  />
                </figure>
              )}

              <input
                type="file"
                name="bannerImage"
                id="bannerImage"
                className="hidden"
                onChange={handleSelectImage}
                ref={fileInputRef}
              />
              <label htmlFor="bannerImage" className="cursor-pointer">
                <MdCameraAlt
                  className="bg-teal-800 text-[30px] text-white p-4 h-16 w-16 mt-3 rounded-md"
                  size={30}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            className="bg-cyan-50 py-2 px-4 rounded-md"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-teal-700 text-white py-2 px-4 rounded-md"
            type="submit"
          >
            {confirmLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditBannerModal;
