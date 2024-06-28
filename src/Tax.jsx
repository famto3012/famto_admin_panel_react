import React, { useState } from 'react'
import { useEffect } from 'react'
import Sidebar from './pages/sidebar/Sidebar'
import { DeleteOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons'
import { BellOutlined } from '@ant-design/icons'
import { PlusOutlined } from '@ant-design/icons'
import { Switch, Modal } from 'antd'

const Tax = () => {

    const [tax, setTax] = useState({
        tax: "",
        name: "",
        fixed: "",
        merchant: "",
        geofence: "",
    });

    const handleInputchange = (e) => {
        setTax({ ...tax, [e.target.name]: e.target.value });
    };
    const submitAction = (e) => {
        e.preventDefault()

        console.log(tax);
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


    return (
        <section className='flex'>
            <div className='w-[20%]'>
                <Sidebar />
            </div>
            <div className='w-full bg-gray-200'>
                <div className="relative flex right-5 mt-5 justify-end"><BellOutlined className=' text-gray-700' />
                    <input type="search" name="search" placeholder="Search" className="bg-gray-100 h-10 right-0 px-5 pr-10  rounded-full text-sm focus:outline-none" />
                    <button type="submit" className="absolute right-0 top-0 mt-2 mr-4"><SearchOutlined />
                    </button>
                </div>
                <div className='flex justify-between mt-5 mx-5'>
                    <h1 className='font-bold'>Tax</h1>
                    <button onClick={showModal} className='bg-teal-700 text-white px-5 rounded-lg p-2'><PlusOutlined /> Add Tax</button>
                    <Modal
                        title="Add Merchant"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={null} // Custom footer to include form buttons
                    >

                        <div className='w-[400px] h-[400px] flex col-auto'>
                            <form onSubmit={submitAction}>
                                <label className="w-1/3 text-gray-500">Tax Name</label>
                                <input type='text'
                                    name='tax'
                                    value={tax.tax}
                                    onChange={handleInputchange}
                                />

                                <label>Name :</label>
                                <input type='text'
                                    name='name'
                                    value={tax.name}
                                    onChange={handleInputchange}
                                />
                                <label> Tax Type : </label>

                                <input type='radio'
                                    name='fixed'
                                    value={tax.fixed}
                                    onChange={handleInputchange}
                                />Fixed Amount
                                <input type='radio'
                                    name='percentage'
                                    value={tax.fixed}
                                    onChange={handleInputchange}
                                />Percentage
                                <label>geoFence :</label>
                                <select
                                    name='geoFence'
                                    value={tax.geofence}
                                    onChange={handleInputchange}
                                >
                                    <option value="TVM">TVM</option>
                                    <option value="PMG">PMG</option>
                                </select>

                                Add to Merchant:
                                <input type='text'
                                    name='merchant'
                                    value={tax.merchant}
                                    onChange={handleInputchange}
                                />
                                <button type='submit'>Submit</button>

                            </form>
                        </div>
                    </Modal>
                </div>

                <p className='ms-5 text-gray-500'>Make sure that taxes aren't duplicated under the same name on the platform.<span className='text-red-700'> Two taxes under the same name cannot coexist.</span></p>
                <div>
                    <table className="bg-white mt-[45px] text-center w-full">
                        <thead>
                            <tr>
                                {[
                                    "Tax Id",
                                    "Tax Name",
                                    "Tax",
                                    "Fixed/Percentage",
                                    "Assign to Merchant",
                                    "Geofence",
                                    "Status"
                                ].map((header) => (
                                    <th
                                        key={header}
                                        className="py-2 px-4  bg-teal-800 text-center h-[70px] text-white"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className='bg-white'>

                            <tr key={tax.id}>
                                <td className="py-5 px-4 border-b  border-gray-100 underline underline-offset-2">
                                    {tax.id}
                                </td>
                                <td className="py-2 px-4 border-b border-gray-100">
                                    {tax.tax}
                                </td>
                                <td className="py-2 px-4 border-b border-gray-100">
                                    {tax.name}
                                </td>
                                <td className="py-2 px-4 border-b border-gray-100">
                                    {tax.fixed}
                                </td>
                                <td className="py-2 px-4 border-b border-gray-100">
                                    {tax.merchant}
                                </td>
                                <td className="py-2 px-4 border-b border-gray-100">
                                    {tax.geofence}
                                </td>
                                <td className="py-5 px-4 border-b flex gap-3 justify-end border-gray-100">
                                    <Switch className='text-teal-700 mt-2'
                                        checked={tax.status}
                                        onChange={() => handleToggle(tax.id)}
                                    />
                                    <EditOutlined className='bg-gray-200 p-3 rounded-lg' />
                                    <DeleteOutlined className='bg-gray-200 p-3 rounded-lg' />
                                </td>
                                <td className="py-2 px-4 border-b border-gray-300">
                                    {/* <div className="flex space-x-2 justify-center">
                      <CheckCircleOutlined
                        className={`text-2xl cursor-pointer ${
                          merchant.registrationApproval === "approved"
                            ? "text-green-500"
                            : "text-gray-500"
                        }`}
                        onClick={() => handleApprove(merchant.id)}
                      />
                      <CloseCircleOutlined
                        className={`text-2xl cursor-pointer ${
                          merchant.registrationApproval === "rejected"
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                        onClick={() => handleReject(merchant.id)}
                      />
                    </div> */}
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default Tax
