import React, { useState } from 'react'

const Sarath = () => {
    const [selectedOption, setSelectedOption] = useState("sales");
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
      };


    const submitSettings = (e) => {
        e.preventDefault();

        console.log(selectedOption)
    }

  return (

    <form onSubmit={submitSettings}>
      
     <div>
    <label className='text-[18px] font-semibold'>set auto allocation</label>
    <div className='flex items-center '>
    <input
                    type="radio"
                    id="send-to-all"
                    name="send-to-all"
                    value="send-to-all"
                    onChange={handleOptionChange}
                    checked={selectedOption === "send-to-all"}
                    className=""
                  />
                  <label htmlFor="send-to-all" className="mx-4">
                    Send-to-all
                  </label>
</div>
<div  className='flex items-center '>
                  <input
                    type="radio"
                    id="nearest-available"
                    name="nearest-available"
                    value="nearest-available"
                    onChange={handleOptionChange}
                    checked={selectedOption === "nearest-available"}
                    className=""
                  />
                  <label htmlFor="nearest-available" className="mx-4">
                    Nearest Available
                  </label>
                  </div>
                
                 <button
                  className="bg-teal-700 text-white py-2 px-10 rounded-md "
                  type="submit"
                  onClick={submitSettings}
                >
                  Add
                </button>
        



</div>
</form>

  )
}

export default Sarath
