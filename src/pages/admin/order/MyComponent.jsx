import React, { useState } from 'react';

function YourComponent() {
    const [isActiveCustomer, setIsActiveCustomer] = useState(false);
    const [isActiveMerchant, setIsActiveMerchant] = useState(false);

    const toggleDropdown = (type) => {
        if (type === 'customer') {
            setIsActiveCustomer(true);
            setIsActiveMerchant(false);
        } else if (type === 'merchant') {
            setIsActiveCustomer(false);
            setIsActiveMerchant(true);
        }
    };

    return (
        <div className='flex items-center gap-2'>
            <button
                onClick={() => toggleDropdown('customer')}
                className={`py-2 px-4 rounded ${
                    isActiveCustomer ? 'bg-gray-200 text-black': 'bg-teal-500 text-white'
                } font-bold`}
            >
                Add Customer
            </button>
    
            <button
                onClick={() => toggleDropdown('merchant')}
                className={`py-2 px-4 rounded ${
                    isActiveMerchant ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black'
                } font-bold`}
            >
                Add Merchant
            </button>
        </div>
    );
}

export default YourComponent;
