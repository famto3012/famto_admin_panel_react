import { Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const CustomerRatingModal = ({
  isVisible,
  onCancel,
  BASE_URL,
  token,
  customerId,
}) => {
  const [ratings, setRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BASE_URL}/admin/customers/ratings/${customerId}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setRatings(response.data.data);
          console.log(response.data.data);
        }
      } catch (err) {
        console.log(`Error in fetching ratings`, err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRatings();
  }, [customerId]);

  return (
    <Modal
      title="Ratings"
      centered
      width="600px"
      open={isVisible}
      onCancel={onCancel}
      footer={null}
    >
      <div className="overflow-auto max-h-[30rem]">
        <table className="min-w-full border-collapse block md:table text-center rounded-lg mt-4">
          <thead className="block md:table-header-group sticky top-0">
            <tr className="border border-gray-300 md:border-none md:table-row">
              <th className="p-2 px-5 border-r-2 bg-teal-700 font-normal text-white">
                ID
              </th>
              <th className="p-2 px-8 border-r-2 bg-teal-700 font-normal text-white">
                Name
              </th>
              <th className="px-6 border-r-2 bg-teal-700 font-normal text-white text-center">
                Ratings and Review
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {isLoading && (
              <tr>
                <td colSpan={3}>
                  <p className="mb-0 text-center">Loading Data...</p>
                </td>
              </tr>
            )}

            {!isLoading && ratings.length === 0 && (
              <tr>
                <td colSpan={3}>
                  <p className="mb-0 text-center">No ratings available</p>
                </td>
              </tr>
            )}

            {!isLoading &&
              ratings?.map((rating) => (
                <tr
                  key={rating.id}
                  className="bg-gray-100 border border-gray-200 md:border-none md:table-row mb-2 md:mb-0 odd:bg-gray-200"
                >
                  <td className="p-2 text-center md:table-cell w-1/5">
                    {rating.agentId.id}
                  </td>

                  <td className="p-2 text-center md:table-cell w-1/5">
                    {rating.agentId.fullName}
                  </td>

                  <td className="px-6 py-4 text-center md:table-cell w-3/5">
                    <div className="flex items-center justify-center text-center">
                      {Array.from({ length: rating.rating }).map((_, i) => (
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
                    <p className="mt-2">{rating.review}</p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default CustomerRatingModal;
