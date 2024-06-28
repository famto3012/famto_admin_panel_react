import React from 'react'
import Sidebar from './Sidebar'
import ModeEditOutlined from '@mui/icons-material/ModeEditOutlined'
import { Col, Row } from 'antd'

const Merchants = () => {

    const merchants =
  {
    name: 'Sarath',
    address: 'Trivandrum',
    owner: 'Nandhu',
    email: 'sarath@gmailcom',
    phone: '123456789',
    password: '1234',
  }


  return (
    <section>
        <Sidebar/>
        {/* main div */}
        <div className="p-6 bg-gray-100  ml-[16rem] h-screen overflow-x-auto">
        <div className="mb-4">

<button type="button" className=" font-medium">&lt; {merchants.name} #ID</button>


</div>
<Row className='gap-5'>
<Col span={8}>
  <div className="mb-4 flex justify-between">

    <label className="block  ">ID</label>
    <p className="font-bold">Lorem Ipsum</p>
  </div>

  <div className="mb-4 flex justify-between">

    <label className="block text-gray-700">Merchant Name*</label>
    <p className="font-bold">{merchants.name}</p>

  </div>

  <div className="mb-4 flex justify-between">
    <label className="block text-gray-700 ">Display Address*</label>
    <p className="font-bold">{merchants.address}</p>
  </div>
  <div className="mb-4 flex justify-between">
    <label className="block text-gray-700">Name of owner*</label>
    <p className="font-bold">{merchants.owner}</p>
  </div>

</Col>
<Col span={8}>
  <div className="mb-4 flex justify-between">
    <label className="block text-gray-700">E-mail</label>
    <p className="font-bold">{merchants.email}</p>
  </div>
  <div className="mb-4 flex justify-between">
    <label className="block text-gray-700">Phone</label>
    <p className="font-bold">{merchants.phone}</p>
  </div>
  <div className="mb-4 flex justify-between">
    <label className="block text-gray-700">Registration Status</label>
    <p className="font-bold">Pending</p>
  </div>

</Col>
<Col span={3}>
  <img id="preview_img" className="h-24 w-24 relative object-cover rounded-lg bg-gray-100" src="https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c" alt="Current profile photo" />
  <label>

    {/* <input type="file" id="file_input" accept=".png" /> */}
  </label>
</Col>
<Col span={3}>
<button  className='bg-teal-700 w-[9rem] rounded-lg right-0 h-7'><ModeEditOutlined />Edit Merchant</button>
</Col>
</Row >
        </div>
        {/* main div  */}
    </section>
  )
}

export default Merchants
