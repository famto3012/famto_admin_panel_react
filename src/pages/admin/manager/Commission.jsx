import React from 'react'
import Sidebar from '../../../components/Sidebar'
import GlobalSearch from '../../../components/GlobalSearch'
import CommissionComponent from '../../../components/CommissionComponent'
import SubscriptionComponent from '../../../components/SubscriptionComponent'
import { BellOutlined, SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Commission = () => {

    const [isCommission, setIsCommission] = useState(false);

    const handleToggle = () => {
        setIsCommission(!isCommission);
    };

    return (
        <>
            <Sidebar />
            <div className='h-screen'>
                <nav className='p-5'><GlobalSearch /></nav>
                <div className='pl-[300px] bg-white px-10 flex justify-between'>
                    <div className='mx-5'>
                        <label htmlFor="Toggle3" className="inline-flex items-center p-1 outline-2  outline outline-gray-500 rounded-3xl border-gray-700 bg-gray-100  cursor-pointer">
                            <input
                                id="Toggle3"
                                type="checkbox"
                                className="hidden peer rounded-3xl"
                                onChange={handleToggle}
                            />
                            <span className={`px-4 py-2 rounded-3xl dark:bg-gray-100 ${isCommission ? 'peer-checked:dark:bg-teal-800 text-white' : 'peer-checked:dark:bg-gray-100'}`}>
                                Commission
                            </span>
                            <span className={`px-4 py-2 rounded-3xl dark:bg-teal-800 ${isCommission ? 'peer-checked:dark:bg-gray-100' : 'peer-checked:dark:bg-teal-800 text-white'}`}>
                                Subscription
                            </span>
                        </label>
                    </div>
                    <div>{isCommission ? <button className='bg-teal-800 p-3 rounded-xl text-white '><Link to="/view-commission"> View Commision log</Link></button>
                        :
                        <button className='bg-teal-800 p-3 rounded-xl text-white '><Link to="/view-subscription">View Subscription log</Link></button>
                    }
                    </div>
                </div>
                {isCommission ? <CommissionComponent /> : <SubscriptionComponent />}
            </div>

           

        </>





    )
}

export default Commission
