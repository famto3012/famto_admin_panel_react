import React, { useState } from 'react'

const Radio = () => {
    const [selectedOption, setSelectedOption] = useState("sales");
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
      };
      const formSubmit = (e) => {
        e.preventDefault();
        console.log(selectedOption);
      };
  return (
    <div>
        <form onSubmit={formSubmit}>
        <div className="flex item-center space-x-2 w-2/3 gap-3">
                  <input
                    type="radio"
                    id="sales"
                    name="sales"
                    value="sales"
                    onChange={handleOptionChange}
                    checked={selectedOption === "sales"}
                    className=""
                  />
                  <label htmlFor="sales" className="mr-4">
                    Sales
                  </label>

                  <input
                    type="radio"
                    id="merchants"
                    name="merchants"
                    value="merchants"
                    onChange={handleOptionChange}
                    checked={selectedOption === "merchants"}
                    className=""
                  />
                  <label htmlFor="merchants" className="mr-4">
                    Merchants
                  </label>

                  <input
                    type="radio"
                    id="commission"
                    name="commission"
                    value="commission"
                    onChange={handleOptionChange}
                    checked={selectedOption === "commission"}
                    className="mr-2"
                  />
                  <label htmlFor="commission">Commission  (in)</label>
                  <input
                    type="radio"
                    id="subscription"
                    name="subscription"
                    value="subscription"
                    onChange={handleOptionChange}
                    checked={selectedOption === "subscription"}
                    className="mr-2"
                  />
                  <label htmlFor="subscription" className="mr-4">
                    Subscription (in)
                  </label>
                </div>
                <button
                  className="bg-teal-700 text-white py-2 px-10 rounded-md"
                  type="submit"
                  onClick={formSubmit}
                >
                  Add
                </button>

        </form>
    </div>
  )
}

export default Radio
