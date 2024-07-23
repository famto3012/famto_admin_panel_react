import React, { useState } from 'react'
import { Modal } from "antd";
import { MdCameraAlt } from 'react-icons/md';

const AddIndividualModal = ({
    isVisible,
    handleCancel,
    token,
    allGeofence,
    BASE_URL,
}) => {

    const [individualdata, SetIndividualData] = useState({
        name: "",
        merchantId: "",
        geofenceId: "",
        imageUrl: "",
    });

    const formSubmit = (e) => {
        e.preventDefault();
        console.log(individualdata);
        handleCancelIndividual();
    };

    const handleInputChangeIndividual = (e) => {
        SetIndividualData({ ...individualdata, [e.target.name]: e.target.value });
    };

    const [adFile, setAdFile] = useState(null);
    const [adPreviewURL, setAdPreviewURL] = useState(null);

    const handleAdImageChange = (e) => {
        const file = e.target.files[0];
        setAdFile(file);
        setAdPreviewURL(URL.createObjectURL(file));
    };

    return (
        <Modal
            title="Individual Merchant Ad Banner"
            open={isVisible}
            className="mt-20"
            onCancel={handleCancel}
            footer={null}
        >
            <form onSubmit={formSubmit}>
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
                            value={individualdata.name}
                            onChange={handleInputChangeIndividual}
                            className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="merchantId" className="w-1/3">
                            Merchant ID
                        </label>
                        <input
                            type="id"
                            placeholder="Merchant ID"
                            id="merchantId"
                            name="merchantId"
                            value={individualdata.merchantId}
                            onChange={handleInputChangeIndividual}
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
                            value={individualdata.geofenceId}
                            onChange={handleInputChangeIndividual}
                        >
                            <option defaultValue={"Select geofence"} hidden>
                                Select geofence
                            </option>
                            {allGeofence.map((geofence) => (
                                <option key={geofence._id} value={geofence._id}>
                                    {geofence.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center">
                        <label className=" w-1/3">
                            Banner Image (390px x 400px)
                        </label>
                        <div className="flex items-center gap-[30px]">
                            {!adPreviewURL && (
                                <div className="bg-cyan-50 shadow-md  mt-3 h-16 w-16 rounded-md" />
                            )}
                            {adPreviewURL && (
                                <figure className="mt-3 h-16 w-16 rounded-md relative">
                                    <img
                                        src={adPreviewURL}
                                        alt="profile"
                                        className="w-full rounded h-full object-cover"
                                    />
                                </figure>
                            )}
                            <input
                                type="file"
                                name="adImage"
                                id="adImage"
                                className="hidden"
                                onChange={handleAdImageChange}
                            />
                            <label htmlFor="adImage" className="cursor-pointer">
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
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default AddIndividualModal
