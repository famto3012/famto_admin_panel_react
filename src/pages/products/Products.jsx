import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import GlobalSearch from '../../components/GlobalSearch'
import { DeleteOutlined, EditOutlined, InfoCircleOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Switch, Modal } from 'antd'
import { MdCameraAlt } from 'react-icons/md'
import { RiDeleteBinLine } from "react-icons/ri";

const Products = () => {

    const [addData, setAddData] = useState({
        name: "",
        price: "",
        availableQty: "",
        alertQty: "",
        minQty: "",
        maxQty: "",
        costPrice: "",
        sku: "",
        discount: "",
        boughtTogether: "",
        preparationTime: "",
        searchTag: "",
        description: "",
        longDescription: "",
        type: "",
        imageUrl: ""
    })

    const [category, setCategory] = useState({
        businessCategory: "",
        categoryName: "",
        description: "",
        type: "",
        imageUrl: ""
    })

    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        quantity: "",
        alerts: "",
        variant: ""
    })





    const shakes = [
        "sharjah",
        "karikk",
        "shamam"
    ]

    const handleCategory = (e) => {
        const { name, value } = e.target;
        setCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value,
        }));
    };

    // const handleRadio = (event) => {
    //     setCategory({
    //         ...category,
    //         type: event.target.value,
    //     });
    // };

    const submitCategory = (e) => {
        e.preventDefault()
        console.log("Categoty", category)
    }

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(product);
    }

    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = [
        'Most Popular',
        'Chef’s Special',
        'Punjabi Food',
        'Shakes',
        'Extras',
    ];

    const categoryChange = () => {

        console.log(`Selected Category: ${selectedCategory}`);
    };

    const [isFormVisible, setFormVisible] = useState(false);

    const toggleFormVisibility = () => {
        setFormVisible(!isFormVisible);
    };


    const [variants, setVariants] = useState([
        { name: 'Small', price: 10 },
        { name: 'Medium', price: 10 },
    ]);

    const addVariant = () => {
        setVariants([...variants, { name: '', price: '' }]);
    };

    const removeVariant = (index) => {
        const newVariants = [...variants];
        newVariants.splice(index, 1);
        setVariants(newVariants);
    };

    const handleChangeVariant = (index, field, value) => {
        const newVariants = [...variants];
        newVariants[index][field] = value;
        setVariants(newVariants);
    };

    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = () => {
        setIsModalVisible(true);
    }

    const showModalOk = () => {
        setIsModalVisible(false)
    }

    const showModalCancel = () => {
        setIsModalVisible(false)
    }

    const [isModalVisibleCategory, setIsModalVisibleCategory] = useState(false)

    const showModalCategory = () => {
        setIsModalVisibleCategory(true);
    }

    const showModalOkCategory = () => {
        setIsModalVisibleCategory(false)
    }

    const showModalCancelCategory = () => {
        setIsModalVisibleCategory(false)
    }

    const [isModalVisibleChange, setIsModalVisibleChange] = useState(false)

    const showModalChange = () => {
        setIsModalVisibleChange(true);
    }

    const showModalOkChange = () => {
        setIsModalVisibleChange(false)
    }

    const showModalCancelChange = () => {
        setIsModalVisibleChange(false)
    }

    const [isModalVisibleItems, setIsModalVisibleItems] = useState(false);

    const showModalItems = () => {
        setIsModalVisibleItems(true);
    }

    const showModalOkItems = () => {
        setIsModalVisibleItems(false);
    }

    const showModalCancelItems = () => {
        setIsModalVisibleItems(false);
    }

    const [isModalVisibleItemsEdit, setIsModalVisibleItemsEdit] = useState(false);

    const showModalItemsEdit = () => {
        setIsModalVisibleItemsEdit(true);
    }

    const showModalOkItemsEdit = () => {
        setIsModalVisibleItemsEdit(false);
    }

    const showModalCancelItemsEdit = () => {
        setIsModalVisibleItemsEdit(false);
    }

    const handleInputChange = (e) => {
        setAddData({ ...addData, [e.target.name]: e.target.value })
    }

    const signupAction = (e) => {
        e.preventDefault();
        console.log(addData)
    }

    const [agentFile, setAgentFile] = useState(null);
    const [agentPreviewURL, setAgentPreviewURL] = useState(null);

    const handleAgentImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setAgentFile(file);
        setAgentPreviewURL(URL.createObjectURL(file));
    };

    const [agentFileEdit, setAgentFileEdit] = useState(null);
    const [agentPreviewURLEdit, setAgentPreviewURLEdit] = useState(null);

    const handleAgentImageChangeEdit = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setAgentFileEdit(file);
        setAgentPreviewURLEdit(URL.createObjectURL(file));
    };

    const [adFile, setAdFile] = useState(null);
    const [adPreviewURL, setAdPreviewURL] = useState(null);

    const handleAdImageChange = (e) => {
        e.preventDefault()
        const file = e.target.files[0];
        setAdFile(file);
        setAdPreviewURL(URL.createObjectURL(file));
    };


    return (
        <>
            <Sidebar />
            <div className='pl-[300px] bg-gray-100'>
                <nav className='p-5'><GlobalSearch /></nav>
                <div className='flex justify-between bg-white p-5 mx-5 rounded-md'>
                    <select
                        name='name'
                        value="merchant"
                        className='bg-blue-50 p-2 rounded'
                    >
                        <option value="option 1">Merchant Name</option>
                    </select>
                    <div>
                        <input
                            type='search'
                            name='search'
                            className='bg-gray-100 relative p-2 rounded-2xl'
                            placeholder='Search records'
                        />
                        <SearchOutlined className='absolute -ml-7 mt-3' />
                    </div>
                </div>
                <div className='flex'>
                    <div className='w-1/5 bg-white rounded-md m-5 mr-0'>
                        <div className='border-b-2 '>
                            <h1 className='font-semibold pb-5 p-8 text-[18px]'>Categories</h1>
                        </div>
                        {categories.map((category) => (
                            <ul className='px-10 py-3'>{category}</ul>
                        ))}
                        <div>
                            <PlusOutlined className='rounded-full bg-teal-800 text-white p-3 ml-[40%] mt-24' onClick={showModal} />
                            <button className='text-gray-500 ml-[20%]' > Add Categories</button>
                            <Modal
                                title="Add Categories"
                                onCancel={showModalCancel}
                                onOk={showModalOk}
                                width="60rem"
                                open={isModalVisible}
                                footer={null}
                            >
                                <form onSubmit={submitCategory}>
                                    <div className="flex flex-col gap-4 mt-5">
                                        <div className="flex mt-5 gap-4">
                                            <label
                                                className="w-1/2 text-gray-500"
                                                htmlFor="businessCategory"
                                            >
                                                Business Category
                                            </label>
                                            <select
                                                name="businessCategory"
                                                id="businessCategory"
                                                value={category.businessCategory}
                                                onChange={handleCategory}
                                                className="border-2 border-gray-100 rounded p-2 focus:outline-none w-full"
                                            >
                                                <option value="select" hidden selected>
                                                    Business Category
                                                </option>
                                                <option value="Option 1">Option 1</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center">
                                            <label
                                                className="w-1/3 text-gray-500"
                                                htmlFor="categoryName"
                                            >
                                                Category Name
                                            </label>
                                            <input
                                                className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                type="text"
                                                value={category.categoryName}
                                                id="categoryName"
                                                name="categoryName"
                                                onChange={handleCategory}
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <label
                                                className="w-1/3 text-gray-500"
                                                htmlFor="description"
                                            >
                                                Description
                                            </label>
                                            <input
                                                className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                type="text"
                                                value={category.description}
                                                id="description"
                                                name="description"
                                                onChange={handleCategory}
                                            ></input>
                                        </div>
                                        <div className="flex items-center">
                                            <label className="w-1/3 text-gray-500">Veg/Non-veg</label>
                                            <div>
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value="veg"
                                                    checked={category.type === "veg"}
                                                    onChange={handleCategory}
                                                    className="border-2 border-gray-100 rounded p-2 mr-3 focus:outline-none"
                                                />
                                                <label> Veg</label>
                                            </div>
                                            <input
                                                type="radio"
                                                name="type"
                                                value="non-veg"
                                                checked={category.type === "non-veg"}
                                                onChange={handleCategory}
                                                className="border-2 border-gray-100 ml-5 rounded p-2 mr-3 focus:outline-none"
                                            />
                                            <label>Non-Veg</label>

                                            <input
                                                type="radio"
                                                name="type"
                                                value="both"
                                                checked={category.type === "both"}
                                                onChange={handleCategory}
                                                className="border-2 border-gray-100 ml-5 rounded p-2 mr-3 focus:outline-none"
                                            />
                                            <label> Both</label>
                                        </div>
                                        <div className="flex items-center">
                                            <label className=" w-1/3">Photos</label>
                                            <div className="flex items-center gap-[30px]">
                                                {!adPreviewURL && (
                                                    <div className="bg-cyan-50 shadow-md mt-3 h-16 w-16 rounded-md" />
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

                                        <div className="flex justify-end gap-4 mt-6">
                                            <button
                                                className="bg-cyan-50 py-2 px-4 rounded-md"
                                                type="button"
                                                onClick={() => setAdPreviewURL(null)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="bg-teal-700 text-white py-2 px-4 rounded-md focus:outline-none"
                                                type="submit"
                                                onClick={showModalOk}
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </Modal>
                        </div>
                    </div>
                    <div className='w-4/5 bg-white rounded-md m-5 ml-2'>
                        <div className='border-b-2 flex justify-between p-5'>
                            <h1 className='font-semibold flex ml-3 items-center text-[18px]'>Shakes</h1>
                            <div className='flex gap-2 items-center'>
                                Disabled <Switch /> Enable
                                <button className='bg-zinc-100 p-2 rounded' onClick={showModalCategory}><EditOutlined />{" "}Edit</button>
                                <Modal

                                    onCancel={showModalCancelCategory}
                                    onOk={showModalOkCategory}
                                    width="60rem"
                                    closeIcon={null}
                                    open={isModalVisibleCategory}
                                    footer={null}
                                >
                                    <form onClick={submitCategory}>
                                        <div className='flex justify-between'>
                                            <b>Edit Category name</b>
                                            <button className='flex bg-red-100 rounded-md p-2 outline-none focus:outline-none'>
                                                <RiDeleteBinLine className=" text-[18px] text-red-900 mr-1" />{""}Delete
                                            </button>
                                        </div>
                                        <div className="flex flex-col gap-4 mt-5">
                                            <div className="flex mt-5  gap-4">
                                                <label className="w-1/2 text-gray-500" htmlFor="businessCategory">Business Category</label>
                                                <select
                                                    name="businessCategory"
                                                    id="businessCategory"
                                                    value={category.businessCategory}
                                                    onChange={handleCategory}
                                                    className="border-2 border-gray-100 rounded p-2 focus:outline-none w-full"
                                                >
                                                    <option value="select" hidden selected>
                                                        Business Category
                                                    </option>
                                                    <option value="Option 1">Option 1</option>
                                                </select>
                                            </div>
                                            <div className="flex items-center">
                                                <label className="w-1/3 text-gray-500" htmlFor="categoryName">
                                                    Category Name
                                                </label>
                                                <input
                                                    className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                    type="text"
                                                    value={category.categoryName}
                                                    id="categoryName"
                                                    name="categoryName"
                                                    onChange={handleCategory}
                                                />
                                            </div>
                                            <div className="flex items-center">
                                                <label className="w-1/3 text-gray-500" htmlFor="description">
                                                    Description
                                                </label>
                                                <input
                                                    className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                    type="text"
                                                    value={category.description}
                                                    id="description"
                                                    name="description"
                                                    onChange={handleCategory}
                                                >

                                                </input>
                                            </div>
                                            <div className="flex items-center">
                                                <label className="w-1/3 text-gray-500">
                                                    Veg/Non-veg
                                                </label>
                                                <label className="mr-4 ml-[12.5rem] text-teal-700  ">
                                                    <input
                                                        type="radio"
                                                        name="type"
                                                        id="veg"
                                                        value="veg"
                                                        checked={category.type === "veg"}
                                                        onChange={handleCategory}
                                                        className="mr-2 text-teal-600 focus:ring-teal-500"
                                                    />{" "}
                                                    Veg
                                                </label>
                                                <label className="mr-4">
                                                    <input
                                                        type="radio"
                                                        name="type"
                                                        id="non-veg"
                                                        value="non-veg"
                                                        checked={category.type === "non-veg"}
                                                        onChange={handleCategory}
                                                        className="mr-2  text-teal-600 focus:ring-teal-500"
                                                    />{" "}
                                                    Non-Veg
                                                </label>
                                                <label className="mr-4">
                                                    <input
                                                        type="radio"
                                                        name="type"
                                                        id='both'
                                                        value="both"
                                                        checked={category.type === "both"}
                                                        onChange={handleCategory}
                                                        className="mr-2 text-teal-600 focus:ring-teal-500"
                                                    />{" "}
                                                    Both
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <label className=" w-1/3">
                                                    Photos
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
                                                    <label
                                                        htmlFor="adImage"
                                                        className="cursor-pointer"
                                                    >
                                                        <MdCameraAlt
                                                            className="bg-teal-800 text-[30px] text-white p-4 h-16 w-16 mt-3 rounded-md"
                                                            size={30}
                                                        />
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="flex justify-end gap-4 mt-6">
                                                <button
                                                    className="bg-cyan-50 py-2 px-4 rounded-md"
                                                    type="button"
                                                    onClick={showModalCancelCategory}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="bg-teal-700 text-white py-2 px-4 rounded-md focus:outline-none"
                                                    type="submit"
                                                    onClick={showModalOkCategory}
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </Modal>
                                <button className='bg-red-100 p-2 rounded'><DeleteOutlined />{" "}Delete</button>
                            </div>
                        </div>
                        <div className='flex'>
                            <div className=' border border-gray-200 w-1/3'>
                                {shakes.map((shake) => (
                                    <ul className='px-10 py-3'>{shake}</ul>
                                ))}
                                <div className='grid justify-center'>
                                    <PlusOutlined className='rounded-full bg-teal-800 text-white p-3 ml-[40%] mt-24' onClick={showModalItems} />
                                    <p className='text-gray-500'> Add Items</p>
                                    <Modal
                                        title="Add Products"
                                        onCancel={showModalCancelItems}
                                        onOk={showModalOkItems}
                                        width="60rem"
                                        footer={null}
                                        open={isModalVisibleItems}
                                    >
                                        <form onSubmit={signupAction}
                                            className='max-h-[30rem] overflow-auto'>
                                            <div className="flex flex-col gap-4 mt-5">
                                                <div className="flex items-center">
                                                    <label className="w-1/3 text-gray-500" htmlFor="name">
                                                        Product Name
                                                    </label>
                                                    <input
                                                        className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                        type="text"
                                                        value={addData.name}
                                                        id="name"
                                                        name="name"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="flex items-center">
                                                    <label className="w-1/3 text-gray-500" htmlFor="price">
                                                        Price
                                                    </label>
                                                    <input
                                                        className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                        type="text"
                                                        value={addData.price}
                                                        id="price"
                                                        name="price"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="flex items-center">
                                                    <label className="w-1/3 text-gray-500" htmlFor="availableQty">
                                                        Available Quantity
                                                    </label>
                                                    <input
                                                        className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                        type="text"
                                                        value={addData.availableQty}
                                                        id="availableQty"
                                                        name="availableQty"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="flex items-center">
                                                    <label className="w-1/3 text-gray-500" htmlFor="alertQty">
                                                        Alert Quantity
                                                    </label>
                                                    <input
                                                        className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                        type="text"
                                                        value={addData.alertQty}
                                                        id="alertQty"
                                                        name="alertQty"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="flex items-center">
                                                    <label
                                                        className="w-1/3 text-gray-500 " htmlFor="minQty"
                                                    >
                                                        Minimum Quantity to Order
                                                    </label>
                                                    <input
                                                        className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                        type="text"
                                                        value={addData.minQty}
                                                        id="minQty"
                                                        name="minQty"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="flex items-center">
                                                    <label className="w-1/3 text-gray-500" htmlFor="maxQty">
                                                        Maximum Quantity to Order
                                                    </label>
                                                    <input
                                                        className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                        type="text"
                                                        value={addData.maxQty}
                                                        id="maxQty"
                                                        name="maxQty"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="flex items-center">
                                                    <label className="w-1/3 text-gray-500" htmlFor="costPrice">
                                                        Cost Price
                                                    </label>
                                                    <input
                                                        className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                        type="text"
                                                        value={addData.costPrice}
                                                        id="costPrice"
                                                        name="costPrice"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="flex items-center">
                                                    <label className="w-1/3 text-gray-500" htmlFor="sku">
                                                        SKU
                                                    </label>
                                                    <input
                                                        className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                        type="text"
                                                        value={addData.sku}
                                                        id="sku"
                                                        name="sku"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="flex mt-5  gap-4">
                                                    <label className="w-1/2 text-gray-500" htmlFor="discount">Discount</label>
                                                    <select
                                                        name="discount"
                                                        id="discount"
                                                        value={addData.discount}
                                                        onChange={handleInputChange}
                                                        className="border-2 border-gray-100 rounded p-2 focus:outline-none w-full"
                                                    >
                                                        <option value="select" hidden selected>
                                                            Discount
                                                        </option>
                                                        <option value="Option 1">Option 1</option>
                                                    </select>
                                                </div>
                                                <div className="flex mt-5  gap-4">
                                                    <label className="w-1/2 text-gray-500" htmlFor="boughtTogether">Often bought together</label>
                                                    <select
                                                        name="boughtTogether"
                                                        id="boughtTogether"
                                                        value={addData.boughtTogether}
                                                        onChange={handleInputChange}
                                                        className="border-2 border-gray-100 rounded p-2 focus:outline-none w-full"
                                                    >
                                                        <option value="select" hidden selected>
                                                            often bought Together
                                                        </option>
                                                        <option value="Option 1">Option 1</option>
                                                    </select>
                                                </div>
                                                <div className="flex items-center">
                                                    <label className="w-1/3 text-gray-500" htmlFor="preparationTime">
                                                        Preparation Time
                                                    </label>
                                                    <input
                                                        className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                        type="text"
                                                        value={addData.preparationTime}
                                                        id="preparationTime"
                                                        name="preparationTime"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="flex items-center">
                                                    <label className="w-1/3 text-gray-500" htmlFor="searchTag">
                                                        Search Tag
                                                    </label>
                                                    <input
                                                        className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                        type="text"
                                                        value={addData.searchTag}
                                                        id="searchTag"
                                                        name="searchTag"
                                                        onChange={handleInputChange}
                                                    >
                                                    </input>
                                                </div>
                                                <div className="flex items-center">
                                                    <label className="w-1/3 text-gray-500" htmlFor="description">
                                                        Description
                                                    </label>
                                                    <input
                                                        className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                        type="text"
                                                        value={addData.description}
                                                        id="description"
                                                        name="description"
                                                        onChange={handleInputChange}
                                                    >

                                                    </input>
                                                </div>
                                                <div className="flex items-center">
                                                    <label className="w-1/3 text-gray-500" htmlFor="longDescription">
                                                        Long description
                                                    </label>
                                                    <input
                                                        className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                        type="text"
                                                        value={addData.longDescription}
                                                        id="longDescription"
                                                        name="longDescription"
                                                        onChange={handleInputChange}
                                                    >

                                                    </input>
                                                </div>
                                                <div className="flex items-center">
                                                    <label className="w-1/3 text-gray-500" htmlFor="type">
                                                        Veg/Non-veg
                                                    </label>
                                                    <input
                                                        className="border-2 border-gray-100 rounded p-2 mr-3 focus:outline-none"
                                                        type="radio"
                                                        value="veg"
                                                        checked={addData.type === "veg"}

                                                        name="type"
                                                        onChange={handleInputChange}
                                                    />Veg
                                                    <input
                                                        className="border-2 border-gray-100 rounded p-2 mr-3 ml-5 focus:outline-none"
                                                        type="radio"
                                                        value="non-veg"
                                                        checked={addData.type === "non-veg"}

                                                        name="type"
                                                        onChange={handleInputChange}
                                                    />non-veg


                                                </div>
                                                <div className='flex items-center'>
                                                    <label className="w-1/3 text-gray-500" htmlFor="photos">
                                                        Photos
                                                    </label>

                                                    <div className=" flex items-center gap-[30px]">

                                                        {!agentPreviewURL && (
                                                            <div className="bg-gray-400  mt-5 h-16 w-16 rounded-md" />
                                                        )}
                                                        {agentPreviewURL && (
                                                            <figure className=" mt-5 h-16 w-16 rounded-md relative">
                                                                <img
                                                                    src={agentPreviewURL}
                                                                    alt="profile"
                                                                    className="w-full rounded h-full object-cover "
                                                                />
                                                            </figure>
                                                        )}
                                                        <input
                                                            type="file"
                                                            name="agentImage"
                                                            id="agentImage"
                                                            className="hidden"
                                                            onChange={handleAgentImageChange}
                                                        />
                                                        <label htmlFor="agentImage" className="cursor-pointer ">
                                                            <MdCameraAlt
                                                                className=" bg-teal-800  text-[40px] text-white p-6 h-16 w-16 mt-5 rounded"
                                                                size={30}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="flex justify-end gap-4 mt-6">
                                                    <button
                                                        className="bg-cyan-50 py-2 px-4 rounded-md"
                                                        type="button"
                                                        onClick={showModalCancelItems}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className="bg-teal-700 text-white py-2 px-4 rounded-md focus:outline-none"
                                                        type="submit"
                                                        onClick={showModalOkItems}
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </Modal>
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className='p-5 flex justify-between'>
                                    <div className='flex w-2/3 gap-3'>
                                        <img src='shake.svg' />
                                        <div>
                                            <p className='font-semibold'>Ice Nutella Shake</p>
                                            <p className='text-teal-800 font-bold'>₹ 12.00</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button className='bg-yellow-50 p-3 font-medium rounded-lg' onClick={showModalChange}>Change Category</button>
                                        <Modal
                                            title="Add Categories"
                                            onCancel={showModalCancelChange}
                                            onOk={showModalOkChange}
                                            width="60rem"
                                            open={isModalVisibleChange}
                                            footer={null}
                                        >
                                            <form onChange={categoryChange}>
                                                <div className="space-y-4">
                                                    {categories.map((category, index) => (
                                                        <label key={index} className="flex items-center space-x-2">
                                                            <input
                                                                type="radio"
                                                                name="category"
                                                                value={category}
                                                                checked={selectedCategory === category}
                                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                                className="text-teal-600"
                                                            />
                                                            <span className="text-gray-700">{category}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                                <div className="mt-8 flex justify-end space-x-4">
                                                    <button
                                                        className="bg-gray-200 px-4 py-2 rounded-md"
                                                        onClick={() => setSelectedCategory('')}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className="bg-teal-600 text-white px-4 py-2 rounded-md"
                                                        onClick={categoryChange}
                                                    >
                                                        Save
                                                    </button>
                                                </div>


                                            </form>
                                        </Modal>
                                    </div>
                                </div>
                                <div className='flex justify-between p-5 items-center'>
                                    <p className='font-semibold'>Product Details</p>
                                    <div className='flex gap-5 items-center'>
                                        Inventory<Switch />
                                        <button className='bg-zinc-100 p-2 rounded' onClick={showModalItemsEdit}><EditOutlined />{" "}Edit</button>
                                        <Modal
                                            onCancel={showModalCancelItemsEdit}
                                            onOk={showModalOkItemsEdit}
                                            width="60rem"
                                            closeIcon={null}
                                            footer={null}
                                            open={isModalVisibleItemsEdit}
                                        >
                                            <form onSubmit={signupAction} className='max-h-[30rem] overflow-auto'>
                                                <div className='flex justify-between'>
                                                    <b>Edit Category name</b>
                                                    <button className='flex bg-red-100 rounded-md p-2 outline-none focus:outline-none'>
                                                        <RiDeleteBinLine className=" text-[18px] text-red-900 mr-1" />{""}Delete
                                                    </button>
                                                </div>
                                                <div className="flex flex-col gap-4 mt-5">
                                                    <div className="flex items-center">
                                                        <label className="w-1/3 text-gray-500" htmlFor="name">
                                                            Product Name
                                                        </label>
                                                        <input
                                                            className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                            type="text"
                                                            value={addData.name}
                                                            id="name"
                                                            name="name"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="flex items-center">
                                                        <label className="w-1/3 text-gray-500" htmlFor="price">
                                                            Price
                                                        </label>
                                                        <input
                                                            className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                            type="text"
                                                            value={addData.price}
                                                            id="price"
                                                            name="price"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="flex items-center">
                                                        <label className="w-1/3 text-gray-500" htmlFor="availableQty">
                                                            Available Quantity
                                                        </label>
                                                        <input
                                                            className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                            type="text"
                                                            value={addData.availableQty}
                                                            id="availableQty"
                                                            name="availableQty"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="flex items-center">
                                                        <label className="w-1/3 text-gray-500" htmlFor="alertQty">
                                                            Alert Quantity
                                                        </label>
                                                        <input
                                                            className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                            type="text"
                                                            value={addData.alertQty}
                                                            id="alertQty"
                                                            name="alertQty"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="flex items-center">
                                                        <label
                                                            className="w-1/3 text-gray-500 " htmlFor="minQty"
                                                        >
                                                            Minimum Quantity to Order
                                                        </label>
                                                        <input
                                                            className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                            type="text"
                                                            value={addData.minQty}
                                                            id="minQty"
                                                            name="minQty"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="flex items-center">
                                                        <label className="w-1/3 text-gray-500" htmlFor="maxQty">
                                                            Maximum Quantity to Order
                                                        </label>
                                                        <input
                                                            className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                            type="text"
                                                            value={addData.maxQty}
                                                            id="maxQty"
                                                            name="maxQty"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="flex items-center">
                                                        <label className="w-1/3 text-gray-500" htmlFor="costPrice">
                                                            Cost Price
                                                        </label>
                                                        <input
                                                            className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                            type="text"
                                                            value={addData.costPrice}
                                                            id="costPrice"
                                                            name="costPrice"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="flex items-center">
                                                        <label className="w-1/3 text-gray-500" htmlFor="sku">
                                                            SKU
                                                        </label>
                                                        <input
                                                            className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                            type="text"
                                                            value={addData.sku}
                                                            id="sku"
                                                            name="sku"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="flex mt-5  gap-4">
                                                        <label className="w-1/2 text-gray-500" htmlFor="discount">Discount</label>
                                                        <select
                                                            name="discount"
                                                            id="discount"
                                                            value={addData.discount}
                                                            onChange={handleInputChange}
                                                            className="border-2 border-gray-100 rounded p-2 focus:outline-none w-full"
                                                        >
                                                            <option value="select" hidden selected>
                                                                Discount
                                                            </option>
                                                            <option value="Option 1">Option 1</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex mt-5  gap-4">
                                                        <label className="w-1/2 text-gray-500" htmlFor="boughtTogether">Often bought together</label>
                                                        <select
                                                            name="boughtTogether"
                                                            id="boughtTogether"
                                                            value={addData.boughtTogether}
                                                            onChange={handleInputChange}
                                                            className="border-2 border-gray-100 rounded p-2 focus:outline-none w-full"
                                                        >
                                                            <option value="select" hidden selected>
                                                                often bought Together
                                                            </option>
                                                            <option value="Option 1">Option 1</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <label className="w-1/3 text-gray-500" htmlFor="preparationTime">
                                                            Preparation Time
                                                        </label>
                                                        <input
                                                            className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                            type="text"
                                                            value={addData.preparationTime}
                                                            id="preparationTime"
                                                            name="preparationTime"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="flex items-center">
                                                        <label className="w-1/3 text-gray-500" htmlFor="searchTag">
                                                            Search Tag
                                                        </label>
                                                        <input
                                                            className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                            type="text"
                                                            value={addData.searchTag}
                                                            id="searchTag"
                                                            name="searchTag"
                                                            onChange={handleInputChange}
                                                        >
                                                        </input>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <label className="w-1/3 text-gray-500" htmlFor="description">
                                                            Description
                                                        </label>
                                                        <input
                                                            className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                            type="text"
                                                            value={addData.description}
                                                            id="description"
                                                            name="description"
                                                            onChange={handleInputChange}
                                                        >

                                                        </input>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <label className="w-1/3 text-gray-500" htmlFor="longDescription">
                                                            Long description
                                                        </label>
                                                        <input
                                                            className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                            type="text"
                                                            value={addData.longDescription}
                                                            id="longDescription"
                                                            name="longDescription"
                                                            onChange={handleInputChange}
                                                        >

                                                        </input>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <label className="w-1/3 text-gray-500" htmlFor="type">
                                                            Veg/Non-veg
                                                        </label>
                                                        <input
                                                            className="border-2 border-gray-100 rounded p-2 mr-3 focus:outline-none"
                                                            type="radio"
                                                            id="veg"
                                                            value="veg"
                                                            checked={addData.type === "veg"}

                                                            name="type"
                                                            onChange={handleInputChange}
                                                        />Veg
                                                        <input
                                                            className="border-2 border-gray-100 rounded p-2 mr-3 ml-5 focus:outline-none"
                                                            type="radio"
                                                            id="non-veg"
                                                            value="non-veg"
                                                            checked={addData.type === "non-veg"}

                                                            name="type"
                                                            onChange={handleInputChange}
                                                        />non-veg


                                                    </div>
                                                    <div className='flex items-center'>
                                                        <label className="w-1/3 text-gray-500" htmlFor="preparationTime">
                                                            Preparation Time
                                                        </label>

                                                        <div className=" flex items-center gap-[30px]">

                                                            {!agentPreviewURLEdit && (
                                                                <div className="bg-gray-400  mt-5 h-16 w-16 rounded-md" />
                                                            )}
                                                            {agentPreviewURLEdit && (
                                                                <figure className=" mt-5 h-16 w-16 rounded-md relative">
                                                                    <img
                                                                        src={agentPreviewURLEdit}
                                                                        alt="profile"
                                                                        className="w-full rounded h-full object-cover "
                                                                    />
                                                                </figure>
                                                            )}
                                                            <input
                                                                type="file"
                                                                name="agentImageEdit"
                                                                id="agentImageEdit"
                                                                className="hidden"
                                                                onChange={handleAgentImageChangeEdit}
                                                            />
                                                            <label htmlFor="agentImageEdit" className="cursor-pointer ">
                                                                <MdCameraAlt
                                                                    className=" bg-teal-800  text-[40px] text-white p-6 h-16 w-16 mt-5 rounded"
                                                                    size={30}
                                                                />
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-end gap-4 mt-6">
                                                        <button
                                                            className="bg-cyan-50 py-2 px-4 rounded-md"
                                                            type="button"
                                                            onClick={showModalCancelItemsEdit}
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            className="bg-teal-700 text-white py-2 px-4 rounded-md focus:outline-none"
                                                            type="submit"
                                                            onClick={showModalOkItemsEdit}
                                                        >
                                                            Add
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </Modal>
                                        <button className='bg-red-100 p-2 rounded'><DeleteOutlined />{" "}Delete</button>
                                    </div>
                                </div>
                                <div>
                                    <form onSubmit={handleSubmit}>
                                        <div className='p-5 flex justify-between'>
                                            <label className='w-1/3 text-gray-700 items-center mt-2'>
                                                Product Name
                                            </label>
                                            <input
                                                type='text'
                                                name='name'
                                                value={product.name}
                                                placeholder='Product Name'
                                                onChange={handleChange}
                                                className='border-gray-300 border rounded-md outline-none focus:outline-none w-2/3 p-2'
                                            />
                                        </div>
                                        <div className='p-5 flex justify-between'>
                                            <label className='w-1/3 text-gray-700 items-center mt-2'>
                                                Product Price
                                            </label>
                                            <input
                                                type='text'
                                                name='price'
                                                value={product.price}
                                                placeholder='Product Price'
                                                onChange={handleChange}
                                                className='border-gray-300 border rounded-md outline-none focus:outline-none w-2/3 p-2'
                                            />
                                        </div>
                                        <div className='p-5 flex justify-between'>
                                            <label className='w-1/3 text-gray-700 items-center mt-2'>
                                                Description
                                            </label>
                                            <input
                                                type='text'
                                                name='description'
                                                value={product.description}
                                                placeholder='Description'
                                                onChange={handleChange}
                                                className='border-gray-300 border rounded-md outline-none focus:outline-none w-2/3 p-2'
                                            />
                                        </div>
                                        <div className='p-5 flex justify-between'>
                                            <label className='w-1/3 text-gray-700 items-center mt-2'>
                                                Available Qty
                                            </label>
                                            <input
                                                type='text'
                                                name='quantity'
                                                value={product.quantity}
                                                placeholder='quantity'
                                                onChange={handleChange}
                                                className='border-gray-300 border rounded-md outline-none focus:outline-none w-2/3 p-2'
                                            />
                                        </div>
                                        <div className='p-5 flex justify-between'>
                                            <label className='w-1/3 text-gray-700 items-center mt-2'>
                                                Alerts {" "}<InfoCircleOutlined />
                                            </label>
                                            <input
                                                type='text'
                                                name='alerts'
                                                value={product.alerts}
                                                placeholder='Alerts'
                                                onChange={handleChange}
                                                className='border-gray-300 border rounded-md outline-none focus:outline-none w-2/3 p-2'
                                            />
                                        </div>
                                        {/* <div className="max-w-md mx-auto p-4"> */}
                                        <div className='p-5 flex justify-between'>
                                            <label className='w-1/3 text-gray-700 items-center mt-2'>
                                                Variants
                                            </label>
                                            <select
                                                id="variants"
                                                className='border-gray-300 border rounded-md outline-none focus:outline-none w-2/3 p-2'                                            >
                                                <option>Chocolate</option>

                                            </select>
                                        </div>
                                        <button className="ml-64" onClick={toggleFormVisibility}>
                                            Add Variant
                                        </button>
                                        {isFormVisible && (

                                            <div className="bg-gray-100 p-4 w-2/3 ms-auto mt-5 rounded-lg shadow-md">
                                                <h2 className="text-lg font-semibold mb-4">Add Variants</h2>
                                                <div className='pb-5 flex justify-between'>
                                                    <label className='w-1/3 text-gray-700 items-center mt-2'>
                                                        Variant Name
                                                    </label>
                                                    <input
                                                        type='text'
                                                        name='variant'
                                                        value={product.variant}
                                                        placeholder='variant'
                                                        onChange={handleChange}
                                                        className='border-gray-300 border rounded-md outline-none focus:outline-none w-2/3 p-2'
                                                    />
                                                </div>
                                                <div className='flex justify-between w-2/3'>
                                                    <p>Variant 1</p>
                                                    <p>value</p>
                                                </div>
                                                {variants.map((variant, index) => (
                                                    <div key={index} className="flex items-center mb-2">
                                                        <input
                                                            type="text"
                                                            placeholder={`Variant ${index + 1}`}
                                                            value={variant.name}
                                                            onChange={(e) => handleChangeVariant(index, 'name', e.target.value)}
                                                            className="w-full p-2 border border-gray-300 rounded-md mr-2"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Price"
                                                            value={`₹${variant.price}`}
                                                            onChange={(e) => handleChangeVariant(index, 'price', e.target.value)}
                                                            className="w-full p-2 border border-gray-300 rounded-md mr-2"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeVariant(index)}
                                                            className="text-red-600"
                                                        >
                                                            <DeleteOutlined />
                                                        </button>
                                                    </div>
                                                ))}
                                                <div className='flex justify-between gap-3 mx-3'>
                                                    <button
                                                        type="submit"
                                                        className="w-1/2 bg-zinc-200 p-2 rounded-md mt-4"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={addVariant}
                                                        className="w-1/2 bg-teal-800 text-white p-2 rounded-md mt-4"
                                                    >
                                                        Add variant
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products
