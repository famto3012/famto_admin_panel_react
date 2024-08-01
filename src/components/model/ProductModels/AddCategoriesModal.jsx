import { React, useState } from 'react'
import { Modal } from 'antd'
import { MdCameraAlt } from 'react-icons/md';

const AddCategoriesModal = (
  {
    isVisible,
    handleCancel,
    BASE_URL,
    token,
    role
  }
) => {
  const [category, setCategory] = useState({
    businessCategory: "",
    categoryName: "",
    description: "",
    type: "",
    imageUrl: "",
  });

  const handleCategory = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));s
  };

  const [adFile, setAdFile] = useState(null);
  const [adPreviewURL, setAdPreviewURL] = useState(null);

  const handleAdImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAdFile(file);
    setAdPreviewURL(URL.createObjectURL(file));
  };

  const submitCategory = () => {

  }
  return (
    <Modal
      title="Add Categories"
      onCancel={handleCancel}
      width="60rem"
      open={isVisible}
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
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddCategoriesModal
