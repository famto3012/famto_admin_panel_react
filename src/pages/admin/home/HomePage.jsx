import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import GlobalSearch from '../../../components/GlobalSearch'
import HomeComponents from '../../../components/HomeComponents';
import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'
import { LineChart } from '@saas-ui/charts'

const HomePage = () => {

    const [selectedOption, setSelectedOption] = useState("sales");
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    console.log(selectedOption)

    const data = [
        {
            date: 'Jan 1',
            Revenue: 1475,
        },
        {
            date: 'Jan 8',
            Revenue: 1936,
        },
        {
            date: 'Jan 15',
            Revenue: 1555,
        },
        {
            date: 'Jan 22',
            Revenue: 1557,
        },
        {
            date: 'Jan 29',
            Revenue: 1977,
        },
        {
            date: 'Feb 5',
            Revenue: 2315,
        },
        {
            date: 'Feb 12',
            Revenue: 1736,
        },
        {
            date: 'Feb 19',
            Revenue: 1981,
        },
        {
            date: 'Feb 26',
            Revenue: 2581,
        },
        {
            date: 'Mar 5',
            Revenue: 2592,
        },
        {
            date: 'Mar 12',
            Revenue: 2635,
        },
        {
            date: 'Mar 19',
            Revenue: 2074,
        },
        {
            date: 'Mar 26',
            Revenue: 2984,
        },
        {
            date: 'Apr 2',
            Revenue: 2254,
        },
        {
            date: 'Apr 9',
            Revenue: 3159,
        },
        {
            date: 'Apr 16',
            Revenue: 2804,
        },
        {
            date: 'Apr 23',
            Revenue: 2602,
        },
        {
            date: 'Apr 30',
            Revenue: 2840,
        },
        {
            date: 'May 7',
            Revenue: 3299,
        },
        {
            date: 'May 14',
            Revenue: 3487,
        },
        {
            date: 'May 21',
            Revenue: 3439,
        },
        {
            date: 'May 28',
            Revenue: 3095,
        },
        {
            date: 'Jun 4',
            Revenue: 3252,
        },
        {
            date: 'Jun 11',
            Revenue: 4096,
        },
        {
            date: 'Jun 18',
            Revenue: 4193,
        },
        {
            date: 'Jun 25',
            Revenue: 4759,
        },
    ]

    const valueFormatter = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value)
    }

    return (
        <>
            <Sidebar />
            <div className='bg-gray-100 pl-[300px] w-full'>
                <nav className='p-5'><GlobalSearch /></nav>
                <div className='flex justify-between mx-5 mt-5'>
                    <div>
                        <p>Hi</p>
                        <p className='text-[20px] text-gray-500'>Designation</p>
                    </div>
                    <div>
                        <select
                            name='day'
                            className='bg-blue-50 p-3'
                        >
                            <option>Today</option>
                        </select>
                    </div>
                </div>
                <div className='bg-white p-2 mt-5 mx-5'>
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

                    <div>
                        <Card>
                            <CardHeader pb="0">
                                <Heading as="h4" fontWeight="medium" size="md">
                                    Revenue over time
                                </Heading>
                            </CardHeader>
                            <CardBody>
                                <LineChart
                                    data={data}
                                    categories={['Revenue']}
                                    valueFormatter={valueFormatter}
                                    yAxisWidth={80}
                                    height="300px"
                                    colors={['#5188ff']}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <div className='flex'>
                    <HomeComponents />
                </div>
            </div>
        </>
    )
}

export default HomePage
