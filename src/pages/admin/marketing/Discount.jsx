import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import GlobalSearch from '../../../components/GlobalSearch'
import { Switch, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { MdOutlineEdit } from 'react-icons/md'
import { RiDeleteBinLine } from 'react-icons/ri'

const Discount = () => {

    const [merchantName, setMerchantName] = useState("")

    const [merchantDiscount, setMerchantDiscount] = useState({
        merchant: "",
        discountName: "",
        maxCheckoutValue: "",
        discountType: "",
        discountValue: "",
        description: "",
        validFrom: "",
        validTo: "",
        geofenceId: "",
    })

    const [productDiscount, setProductDiscount] = useState({
        discountName: "",
        maxAmount: "",
        discountType: "",
        discountValue: "",
        description: "",
        productId: "",
        validFrom: "",
        validTo: "",
        geofenceId: "",
        onAddOn: null,
    })

    const handleChange = (e) => {
        setMerchantName({ [e.target.name]: e.target.value })
    }

    const handleDiscount = (e) => {
        setMerchantDiscount({ ...merchantDiscount, [e.target.name]: e.target.value })
    }

    const handleDiscountSubmit = (e) => {
        e.preventDefault();

        console.log("MerchantDiscount:", merchantDiscount);
    }

    const handleInputChange = (e) => {
        setProductDiscount({ ...productDiscount, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("ProductDiscount: ", productDiscount)
    }



    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);

    const showModalEdit = () => {
        setIsModalVisibleEdit(true);
    };

    const handleOkEdit = () => {
        setIsModalVisibleEdit(false);
    };

    const handleCancelEdit = () => {
        setIsModalVisibleEdit(false);
    };



    const [isModalVisibleProduct, setIsModalVisibleProduct] = useState(false);

    const showModalProduct = () => {
        setIsModalVisibleProduct(true);
    };

    const handleOkProduct = () => {
        setIsModalVisibleProduct(false);
    };

    const handleCancelProduct = () => {
        setIsModalVisibleProduct(false);
    };


    const [isModalVisibleProductEdit, setIsModalVisibleProductEdit] = useState(false);

    const showModalProductEdit = () => {
        setIsModalVisibleProductEdit(true);
    };

    const handleOkProductEdit = () => {
        setIsModalVisibleProductEdit(false);
    };

    const handleCancelProductEdit = () => {
        setIsModalVisibleProductEdit(false);
    };

    const onChange = (e) =>{
        setProductDiscount({[e.target.name]: checked});
    }

    const discount = [
        {
            name: "Hotel",
            value: "123",
            description: "description for testimng the sixe ff the tethdjfhyuhdfyergyuevgywiyuwytgwdvcgvewygvcqgdcvqgv",
            validFrom: "18/05/2003",
            validTo: "18/06/2003",
            geofence: "Tvm",
            status: true
        }
    ]

    const [isShowModalDelete1 , setIsShowModalDelete1] = useState(false);

    const showModalDelete1 = () => {
      setIsShowModalDelete1(true)
    }
  
    const showModalDeleteOk1 = () => {
      setIsShowModalDelete1(false)
    }
  
    const showModalDeleteCancel1 = () => {
      setIsShowModalDelete1(false)
    }

    const [isShowModalDelete2 , setIsShowModalDelete2] = useState(false);

    const showModalDelete2 = () => {
      setIsShowModalDelete2(true)
    }
  
    const showModalDeleteOk2 = () => {
      setIsShowModalDelete2(false)
    }
  
    const showModalDeleteCancel2 = () => {
      setIsShowModalDelete2(false)
    }

    return (
        <>
            <Sidebar />
            <div className='pl-[300px] bg-gray-100'>
                <nav className='p-5'>
                    <GlobalSearch />
                </nav>
                <div className='flex justify-between mx-5 focus:outline-none'>
                    <select
                        value={merchantName}
                        name='merchantName'
                        className='bg-blue-50 p-3 rounded-lg'
                        onChange={handleChange}
                    >
                        <option value="option 1">Option 1</option>
                        <option value="option 2">Option 2</option>
                    </select>
                    <Switch />
                </div>
                <div className="flex justify-between mt-5 mx-5">
                    <h1 className="font-bold text-[20px]">Discount</h1>
                    <button
                        onClick={showModal}
                        className="bg-teal-800 text-white px-5 rounded-lg p-2"
                    >
                        <PlusOutlined /> Add Discount
                    </button>
                    <Modal
                        title="Add Discount"
                        width="700px"
                        open={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={null} // Custom footer to include form buttons
                    >
                        <form onSubmit={handleDiscountSubmit}>
                            <div className="flex flex-col  gap-4 justify-between">
                                <div className="flex gap-4">
                                    <label className="w-1/2 text-gray-500">Assign Merchant</label>
                                    <select
                                        className="border-2 border-gray-300 rounded p-2 w-2/3"
                                        name="merchant"
                                        value={merchantDiscount.merchant}
                                        onChange={handleDiscount}
                                    >
                                        <option hidden selected defaultValue="Select Merchant">Select Merchant</option>
                                        <option value="option 1">Option 1</option>
                                        <option value="option 2">Option 2</option>
                                    </select>
                                </div>
                                <div className="flex  gap-4">
                                    <label className="w-1/2 text-gray-500">Discount Name</label>
                                    <input
                                        type="text"
                                        className="border-2 border-gray-300 rounded p-2 w-2/3"
                                        name="discountName"
                                        value={merchantDiscount.discountName}
                                        onChange={handleDiscount}
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <label className="w-1/2 text-gray-500">Maximum checkout value (₹)</label>

                                    <input
                                        type="text"
                                        className="border-2 border-gray-300 rounded p-2 w-2/3"
                                        name="maxCheckoutValue"
                                        value={merchantDiscount.maxCheckoutValue}
                                        onChange={handleDiscount}
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <label className="w-1/2 text-gray-500">Discount</label>

                                    <input
                                        type="radio"
                                        className="border-2 -ml-14 border-gray-300 rounded "
                                        name="discountType"
                                        value="Fixed-discount"
                                        checked={merchantDiscount.discountType === "Fixed-discount"}
                                        onChange={handleDiscount}
                                    />Fixed-discount
                                    <input
                                        type="radio"
                                        className=" border-gray-300 rounded  "
                                        name="discountType"
                                        value="Percentage-discount"
                                        checked={merchantDiscount.discountType === "Percentage-discount"}
                                        onChange={handleDiscount}
                                    />Percentage-discount
                                </div>
                                <div className='ml-72 w-[300px]'>
                                    <input
                                        type="text"
                                        className="border-2 border-gray-300 rounded p-2 w-[360px]"
                                        name="discountValue"
                                        value={merchantDiscount.discountValue}
                                        onChange={handleDiscount}
                                    />

                                </div>
                                <div className="flex gap-4">
                                    <label className="w-1/2 text-gray-500">Description Maximum 150 Characters</label>

                                    <input
                                        type="text"
                                        className="border-2 border-gray-300 rounded p-2 w-2/3"
                                        name="description"
                                        maxLength={150}
                                        value={merchantDiscount.description}
                                        onChange={handleDiscount}
                                    />
                                </div>
                                <div className="flex gap-4 mt-5">
                                    <label className="w-1/2 text-gray-500">From</label>
                                    <input
                                        type='date'
                                        name='validFrom'
                                        value={merchantDiscount.validFrom}
                                        className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
                                        onChange={handleDiscount}
                                    />
                                </div>
                                <div className="flex gap-4 mt-5">
                                    <label className="w-1/2 text-gray-500">To</label>
                                    <input
                                        type='date'
                                        name='validTo'
                                        className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
                                        value={merchantDiscount.validTo}
                                        onChange={handleDiscount}
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <label className="w-1/2 text-gray-500">geoFence</label>
                                    <select
                                        className="border-2 border-gray-300 rounded p-2 w-2/3"
                                        name="geofenceId"
                                        value={merchantDiscount.geofenceId}
                                        onChange={handleDiscount}
                                    >
                                        <option value="TVM">TVM</option>
                                        <option value="PMG">PMG</option>
                                    </select>
                                </div>

                                <div className="flex justify-end  gap-4">
                                    <button
                                        className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
                                        onClick={handleCancel}
                                        type="submit"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
                                        onClick={handleOk}
                                        type="submit"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Modal>
                </div>

                <div className="w-full">
                    <table className="bg-white mt-[45px] text-center w-full">
                        <thead>
                            <tr>
                                {[
                                    "Name",
                                    "Value",
                                    "Description",
                                    "Valid From",
                                    "Valid To",
                                    "Geofence",
                                    "Status",
                                ].map((header) => (
                                    <th
                                        key={header}
                                        className="  bg-teal-800 text-center h-[70px] text-white"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {discount.map((table) => (
                                <tr key={table}>

                                    <td className="py-5 px-4 border-b  border-gray-100 ">
                                        {table.name}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-100">
                                        {table.value}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-100 text-start">
                                        {table.description}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-100">
                                        {table.validFrom}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-100">
                                        {table.validTo}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-100">
                                        {table.geofence}
                                    </td>
                                    <td className="py-5 px-4 border-b border-gray-100">
                                        <div className='flex gap-4'>
                                        <Switch
                                            className="text-teal-700 mt-2"
                                            checked={table.status}

                                        />
                                        <div className='flex items-center'>
                                            <button onClick={showModalEdit}>
                                            <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                                            </button>
                                            <Modal
                                                title="Edit Tax"
                                                open={isModalVisibleEdit}
                                                onOk={handleOkEdit}
                                                width="700px"
                                                onCancel={handleCancelEdit}
                                                footer={null} // Custom footer to include form buttons
                                            >
                                                <form onSubmit={handleDiscountSubmit}>
                                                    <div className="flex flex-col  gap-4 justify-between">
                                                        <div className="flex gap-4">
                                                            <label className="w-1/2 text-gray-500">Assign Merchant</label>
                                                            <select
                                                                className="border-2 border-gray-300 rounded p-2 w-2/3"
                                                                name="merchant"
                                                                value={merchantDiscount.merchant}
                                                                onChange={handleDiscount}
                                                            >
                                                                <option value="option 1">Option 1</option>
                                                                <option value="option 2">Option 2</option>
                                                            </select>
                                                        </div>
                                                        <div className="flex  gap-4">
                                                            <label className="w-1/2 text-gray-500">Discount Name</label>
                                                            <input
                                                                type="text"
                                                                className="border-2 border-gray-300 rounded p-2 w-2/3"
                                                                name="discountName"
                                                                value={merchantDiscount.discountName}
                                                                onChange={handleDiscount}
                                                            />
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <label className="w-1/2 text-gray-500">Maximum checkout value (₹)</label>

                                                            <input
                                                                type="text"
                                                                className="border-2 border-gray-300 rounded p-2 w-2/3"
                                                                name="maxCheckoutValue"
                                                                value={merchantDiscount.maxCheckoutValue}
                                                                onChange={handleDiscount}
                                                            />
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <label className="w-1/2 text-gray-500">Discount</label>

                                                            <input
                                                                type="radio"
                                                                className="border-2 -ml-14 border-gray-300 rounded "
                                                                name="discountType"
                                                                value="Fixed-discount"
                                                                checked={merchantDiscount.discountType === "Fixed-discount"}
                                                                onChange={handleDiscount}
                                                            />Fixed-discount
                                                            <input
                                                                type="radio"
                                                                className=" border-gray-300 rounded  "
                                                                name="discountType"
                                                                value="Percentage-discount"
                                                                checked={merchantDiscount.discountType === "Percentage-discount"}
                                                                onChange={handleDiscount}
                                                            />Percentage-discount
                                                        </div>
                                                        <div className='ml-72 w-[300px]'>
                                                            <input
                                                                type="text"
                                                                className="border-2 border-gray-300 rounded p-2 w-[360px]"
                                                                name="discountValue"
                                                                value={merchantDiscount.discountValue}
                                                                onChange={handleDiscount}
                                                            />

                                                        </div>
                                                        <div className="flex gap-4">
                                                            <label className="w-1/2 text-gray-500">Description Maximum 150 Characters</label>

                                                            <input
                                                                type="text"
                                                                className="border-2 border-gray-300 rounded p-2 w-2/3"
                                                                name="description"
                                                                maxLength={150}
                                                                value={merchantDiscount.description}
                                                                onChange={handleDiscount}
                                                            />
                                                        </div>
                                                        <div className="flex gap-4 mt-5">
                                                            <label className="w-1/2 text-gray-500">From</label>
                                                            <input
                                                                type='date'
                                                                name='validFrom'
                                                                value={merchantDiscount.validFrom}
                                                                className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
                                                                onChange={handleDiscount}
                                                            />
                                                        </div>
                                                        <div className="flex gap-4 mt-5">
                                                            <label className="w-1/2 text-gray-500">To</label>
                                                            <input
                                                                type='date'
                                                                name='validTo'
                                                                className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
                                                                value={merchantDiscount.validTo}
                                                                onChange={handleDiscount}
                                                            />
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <label className="w-1/2 text-gray-500">geoFence</label>
                                                            <select
                                                                className="border-2 border-gray-300 rounded p-2 w-2/3"
                                                                name="geofenceId"
                                                                value={merchantDiscount.geofenceId}
                                                                onChange={handleDiscount}
                                                            >
                                                                <option value="TVM">TVM</option>
                                                                <option value="PMG">PMG</option>
                                                            </select>
                                                        </div>

                                                        <div className="flex justify-end  gap-4">
                                                            <button
                                                                className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
                                                                onClick={handleCancelEdit}
                                                                type="submit"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
                                                                onClick={handleOkEdit}
                                                                type="submit"
                                                            >
                                                                Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </Modal>
                                        </div>
                                        <button onClick={showModalDelete1} className="outline-none focus:outline-none">
                   <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                  </button>
                  <Modal
                     onOk={showModalDeleteOk1}
                     onCancel={showModalDeleteCancel1}
                     footer={null}
                     open={isShowModalDelete1}
                     centered
                    >
                    
                    <p className="font-semibold text-[18px] mb-5">Are you sure want to delete?</p>
                    <div className="flex justify-end">
                    <button className="bg-cyan-100 px-5 py-1 rounded-md font-semibold" onClick={showModalDeleteCancel1}>Cancel</button>
                    <button className="bg-teal-800 px-5 py-1 rounded-md ml-3 text-white"> Delete</button>
                    </div>
                  </Modal>
                  </div>
                                    </td>
                                    <td className="border-b border-gray-300"></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>




                <div className='flex justify-end mt-10'>

                    <button onClick={showModalProduct} className="bg-teal-800 text-white px-5 mr-5 rounded-lg p-2"
                    >
                        <PlusOutlined />Add Product wise Discount</button>


                    <Modal
                        title="Add Product"
                        width="700px"
                        open={isModalVisibleProduct}
                        onOk={handleOkProduct}
                        onCancel={handleCancelProduct}
                        footer={null} // Custom footer to include form buttons
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col mt-5  gap-4 justify-between">
                                <div className="flex gap-4">
                                    <label className="w-1/2 text-gray-500">Assign Merchant</label>
                                    <select
                                        className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
                                        name="merchant"
                                        value={productDiscount.merchant}
                                        onChange={handleInputChange}
                                    >
                                        <option value="option 1">Option 1</option>
                                        <option value="option 2">Option 2</option>
                                    </select>
                                </div>
                                <div className="flex mt-5  gap-4">
                                    <label className="w-1/2 text-gray-500">Discount Name</label>
                                    <input
                                        type="text"
                                        className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
                                        name="discountName"
                                        value={productDiscount.discountName}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="flex mt-5 gap-4">
                                    <div>
                                        <label className="w-1/2 text-gray-500">Discount</label>

                                        <input
                                            type="radio"
                                            className="border-2 ml-[230px] mr-3 border-gray-300 rounded "
                                            name="discountType"
                                            value="fixed"
                                            checked={productDiscount.discountType === "fixed"}
                                            onChange={handleInputChange}
                                        />
                                        Fixed discount
                                        <input
                                            type="radio"
                                            className=" border-gray-300 mr-3 rounded ml-5 "
                                            name="discountType"
                                            value="percentage"
                                            checked={productDiscount.discountType === "percentage"}
                                            onChange={handleInputChange}
                                        />Percentage-discount
                                    </div>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="border-2 border-gray-300 rounded ml-72 p-2 w-[360px] focus:outline-none"
                                        name="discountValue"
                                        value={productDiscount.discountValue}
                                        onChange={handleInputChange}
                                    />

                                </div>
                                <div className="flex mt-5 gap-4">
                                    <label className="w-1/2 text-gray-500">Description Maximum 150 Characters</label>

                                    <input
                                        type="text"
                                        className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
                                        name="description"
                                        maxLength={150}
                                        value={productDiscount.description}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex mt-5 gap-4">
                                    <label className="w-1/2 text-gray-500">Select Product</label>

                                    <input
                                        type='search'
                                        className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
                                        name="maxAmount"

                                    // onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex mt-5 gap-4">
                                    <label className="w-1/2 text-gray-500">Max Amount</label>

                                    <input
                                        type="text"
                                        className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
                                        name="maxAmount"
                                        value={productDiscount.maxAmount}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex gap-4 mt-5">
                                    <label className="w-1/2 text-gray-500">Valid From</label>
                                    <input
                                        type='date'
                                        name='validFrom'
                                        value={productDiscount.validFrom}
                                        className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex gap-4 mt-5">
                                    <label className="w-1/2 text-gray-500">Valid To</label>
                                    <input
                                        type='date'
                                        name='validTo'
                                        className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
                                        value={productDiscount.validTo}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex mt-5 gap-4">
                                    <label className="w-1/2 text-gray-500">Geofence</label>
                                    <select
                                        className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
                                        name="geofenceId"
                                        value={productDiscount.geofenceId}
                                        onChange={handleInputChange}
                                    >
                                        <option value="TVM">TVM</option>
                                        <option value="PMG">PMG</option>
                                    </select>
                                </div>
                                <div className='flex mt-5 justify-between'>
                                    <label>Discount on add-on</label>
                                    <Switch />
                                </div>

                                <div className="flex justify-end mt-5 gap-4">
                                    <button
                                        className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
                                        onClick={handleCancelProduct}
                                        type="submit"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
                                        onClick={handleOkProduct}
                                        type="submit"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Modal>
                </div>
                <div className="w-full">
                    <table className="bg-white mt-[45px] text-center w-full">
                        <thead>
                            <tr>
                                {[
                                    "Name",
                                    "Value",
                                    "Description",
                                    "Valid From",
                                    "Valid To",
                                    "Geofence",
                                    "Status",
                                ].map((header) => (
                                    <th
                                        key={header}
                                        className="  bg-teal-800 text-center h-[70px] text-white"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {discount.map((table) => (
                                <tr key={table}>

                                    <td className="py-5 px-4 border-b  border-gray-100">
                                        {table.name}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-100">
                                        {table.value}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-100 text-start">
                                        {table.description}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-100">
                                        {table.validFrom}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-100">
                                        {table.validTo}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-100">
                                        {table.geofence}
                                    </td>
                                    <td className="py-5 px-4 border-b  border-gray-100">
                                      <div className='flex gap-4'>  
                                        
                                        
                                        <Switch
                                            className="text-teal-700 mt-2"
                                            checked={table.status}

                                        />
                                        <div className='flex item-center'>
                                            <button onClick={showModalProductEdit}>
                                            <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />

                                            </button>
                                            <Modal
                                                title="Edit Product"
                                                width="700px"
                                                open={isModalVisibleProductEdit}
                                                onOk={handleOkProductEdit}
                                                onCancel={handleCancelProductEdit}
                                                footer={null} // Custom footer to include form buttons
                                            >
                                                <form onSubmit={handleSubmit}>
                                                    <div className="flex flex-col mt-5  gap-4 justify-between">
                                                        <div className="flex gap-4">
                                                            <label className="w-1/2 text-gray-500">Assign Merchant</label>
                                                            <select
                                                                className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
                                                                name="merchant"
                                                                value={productDiscount.merchant}
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="option 1">Option 1</option>
                                                                <option value="option 2">Option 2</option>
                                                            </select>
                                                        </div>
                                                        <div className="flex mt-5  gap-4">
                                                            <label className="w-1/2 text-gray-500">Discount Name</label>
                                                            <input
                                                                type="text"
                                                                className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
                                                                name="discountName"
                                                                value={productDiscount.discountName}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>

                                                        <div className="flex mt-5 gap-4">
                                                            <div>
                                                                <label className="w-1/2 text-gray-500">Discount</label>

                                                                <input
                                                                    type="radio"
                                                                    className="border-2 ml-[230px] mr-3 border-gray-300 rounded "
                                                                    name="discountType"
                                                                    value="fixed"
                                                                    checked={productDiscount.discountType === "fixed"}
                                                                    onChange={handleInputChange}
                                                                />
                                                                Fixed discount
                                                                <input
                                                                    type="radio"
                                                                    className=" border-gray-300 mr-3 rounded ml-5 "
                                                                    name="discountType"
                                                                    value="percentage"
                                                                    checked={productDiscount.discountType === "percentage"}
                                                                    onChange={handleInputChange}
                                                                />Percentage-discount
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                className="border-2 border-gray-300 rounded ml-72 p-2 w-[360px] focus:outline-none"
                                                                name="discountValue"
                                                                value={productDiscount.discountValue}
                                                                onChange={handleInputChange}
                                                            />

                                                        </div>
                                                        <div className="flex mt-5 gap-4">
                                                            <label className="w-1/2 text-gray-500">Description Maximum 150 Characters</label>

                                                            <input
                                                                type="text"
                                                                className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
                                                                name="description"
                                                                maxLength={150}
                                                                value={productDiscount.description}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="flex mt-5 gap-4">
                                                            <label className="w-1/2 text-gray-500">Select Product</label>

                                                            <input
                                                                type='search'
                                                                className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
                                                                name="maxAmount"

                                                            // onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="flex mt-5 gap-4">
                                                            <label className="w-1/2 text-gray-500">Max Amount</label>

                                                            <input
                                                                type="text"
                                                                className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
                                                                name="maxAmount"
                                                                value={productDiscount.maxAmount}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="flex gap-4 mt-5">
                                                            <label className="w-1/2 text-gray-500">Valid From</label>
                                                            <input
                                                                type='date'
                                                                name='validFrom'
                                                                value={productDiscount.validFrom}
                                                                className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="flex gap-4 mt-5">
                                                            <label className="w-1/2 text-gray-500">Valid To</label>
                                                            <input
                                                                type='date'
                                                                name='validTo'
                                                                className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
                                                                value={productDiscount.validTo}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="flex mt-5 gap-4">
                                                            <label className="w-1/2 text-gray-500">Geofence</label>
                                                            <select
                                                                className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
                                                                name="geofenceId"
                                                                value={productDiscount.geofenceId}
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="TVM">TVM</option>
                                                                <option value="PMG">PMG</option>
                                                            </select>
                                                        </div>
                                                        <div className='flex mt-5 justify-between'>
                                                            <label>Discount on add-on</label>
                                                            <Switch onChange={onChange} name="onAddOn"/>
                                                        </div>

                                                        <div className="flex justify-end mt-5 gap-4">
                                                            <button
                                                                className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
                                                                onClick={handleCancelProductEdit}
                                                                type="submit"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
                                                                onClick={handleOkProductEdit}
                                                                type="submit"
                                                            >
                                                                Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </Modal>
                                        </div>
                                        <button onClick={showModalDelete2} className="outline-none focus:outline-none">
                   <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                  </button>
                  <Modal
                     onOk={showModalDeleteOk2}
                     onCancel={showModalDeleteCancel2}
                     footer={null}
                     open={isShowModalDelete2}
                     centered
                    >
                    
                    <p className="font-semibold text-[18px] mb-5">Are you sure want to delete?</p>
                    <div className="flex justify-end">
                    <button className="bg-cyan-100 px-5 py-1 rounded-md font-semibold" onClick={showModalDeleteCancel2}>Cancel</button>
                    <button className="bg-teal-800 px-5 py-1 rounded-md ml-3 text-white"> Delete</button>
                    </div>
                  </Modal>
                    </div>                
                                    </td>
                                    <td className="border-b border-gray-300"></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Discount