import React, { useState } from 'react';
import { AddOutlined, DeleteOutline } from '@mui/icons-material';

const MyForm = () => {
  const [items, setItems] = useState([
    { type: '', length: '', width: '', height: '', weight: '' },
  ]);

  const handleInputChange = (index, event) => {
    const values = [...items];
    values[index][event.target.name] = event.target.value;
    setItems(values);
  };

  const handleAddItem = () => {
    setItems([...items, { type: '', length: '', width: '', height: '', weight: '' }]);
  };

  const handleRemoveItem = (index) => {
    const values = [...items];
    values.splice(index, 1);
    setItems(values);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="bg-gray-100 mx-6 p-10 rounded-lg mb-4">
          <div className="flex">
            <label className="w-1/3">Item type</label>
            <select
              name="type"
              value={item.type}
              onChange={(e) => handleInputChange(index, e)}
              className="w-1/2 p-3"
            >
              <option value="">Select</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </div>
          <div className="flex mt-5">
            <label className="w-1/3">Dimensions (in cm)</label>
            <div className="w-1/2 gap-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="length"
                  value={item.length}
                  onChange={(e) => handleInputChange(index, e)}
                  className="outline-none focus:outline-none border border-gray-200 p-3 rounded w-1/3"
                  placeholder="Length"
                />
                <input
                  type="text"
                  name="width"
                  value={item.width}
                  onChange={(e) => handleInputChange(index, e)}
                  className="outline-none focus:outline-none border border-gray-200 p-3 rounded w-1/3"
                  placeholder="Width"
                />
                <input
                  type="text"
                  name="height"
                  value={item.height}
                  onChange={(e) => handleInputChange(index, e)}
                  className="outline-none focus:outline-none border border-gray-200 p-3 rounded w-1/3"
                  placeholder="Height"
                />
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  name="weight"
                  value={item.weight}
                  onChange={(e) => handleInputChange(index, e)}
                  className="outline-none focus:outline-none border border-gray-200 p-3 rounded w-full"
                  placeholder="Approximate / Exact Weight (in Kg)"
                />
              </div>
              <div className="mx-3 flex justify-between mt-3 gap-3">
                <button
                  type="button"
                  className="bg-zinc-200 w-1/2 rounded-md p-2"
                  onClick={handleAddItem}
                >
                  <AddOutlined /> Add Item
                </button>
                <button
                  type="button"
                  className="bg-red-100 w-1/2 rounded-md p-2"
                  onClick={() => handleRemoveItem(index)}
                >
                  <DeleteOutline className="text-red-500" /> Delete Item
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyForm;
