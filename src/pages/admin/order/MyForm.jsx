import { ColorPicker } from 'antd';
import React, { useState } from 'react';
import { FaPalette } from 'react-icons/fa';

const MyForm = () => {
//   const [color, setColor] = useState('#ff0000'); // default color

//   const handleColorChange = (event) => {
//     setColor(event.target.value);
//   };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <label className="block text-lg font-medium text-gray-700 mb-1">Colour</label>
      {/* <div className="relative">
        <input 
          type="color" 
          className="appearance-none w-full h-12 rounded-3xl cursor-pointer "
          
          value={color}
          onChange={handleColorChange}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <FaPalette className="text-black text-[35px]" />
        </div>
      </div> */}
      <ColorPicker defaultValue="#4321a0"/>
      
    </div>
  );
};

export default MyForm;
