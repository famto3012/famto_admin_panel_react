import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Ratings = () => {
  // Dummy data
  const data = [
    {
      id: 'ID',
      name: 'Name',
      review: 'This is 💯 one hundred percent the best lip mask duo ever !!! The scent is delicious and it\'s so smooth from the scrub & mask',
      rating: 5,
    },
    {
      id: 'ID',
      name: 'Name',
      review: 'This is 💯 one hundred percent the best lip mask duo ever !!! The scent is delicious and it\'s so smooth from the scrub & mask',
      rating: 5,
    },
    {
      id: 'ID',
      name: 'Name',
      review: 'This is 💯 one hundred percent the best lip mask duo ever !!! The scent is delicious and it\'s so smooth from the scrub & mask',
      rating: 5,
    },
    {
      id: 'ID',
      name: 'Name',
      review: 'This is 💯 one hundred percent the best lip mask duo ever !!! The scent is delicious and it\'s so smooth from the scrub & mask',
      rating: 5,
    },
    {
      id: 'ID',
      name: 'Name',
      review: 'This is 💯 one hundred percent the best lip mask duo ever !!! The scent is delicious and it\'s so smooth from the scrub & mask',
      rating: 5,
    },
  ];

  return (
    <div>
       <div className="font-poppins font-medium text-[25px]">
          <ArrowBackIcon  className=" m-5"/> Ratings and Review by customer
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse block md:table text-[25px] text-center">
        <thead className="block md:table-header-group">
          <tr className="border border-gray-300 md:border-none md:table-row">
            <th className="px-10 py-8 border-r-2 bg-teal-700 font-normal text-white">ID</th>
            <th className="px-20 py-8 border-r-2 bg-teal-700 font-normal text-white">Name</th>
            <th className="px-24 py-8 border-r-2 bg-teal-700 font-normal text-white text-left ">Ratings and Review</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {data.map((item, index) => (
            <tr key={index} className=" bg-gray-100 border border-gray-300 md:border-none md:table-row mb-2 md:mb-0">
              <td className="p-2 text-center  md:table-cell">{item.id}</td>
              <td className="p-2  text-center md:table-cell">{item.name}</td>
              <td className="px-24 py-8 text-left md:table-cell">
                <div className="flex items-center text-center">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-500 text-center"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049.467a1.003 1.003 0 011.902 0l1.454 4.553h4.769a1 1 0 01.593 1.807l-3.855 2.8 1.453 4.553a1 1 0 01-1.54 1.117L10 13.137l-3.855 2.8a1 1 0 01-1.54-1.117l1.453-4.553-3.855-2.8a1 1 0 01.593-1.807h4.77L9.05.467z"></path>
                    </svg>
                  ))}
                </div>
                <p className="mt-2 ">{item.review}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Ratings;