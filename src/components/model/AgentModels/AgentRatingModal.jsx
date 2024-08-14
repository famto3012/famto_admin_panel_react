import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "antd";

const AgentRatingModal = ({
  isVisible,
  onCancel,
  BASE_URL,
  token,
  agentId,
}) => {
  const [allRatings, setAllRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAgentRatings = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          `${BASE_URL}/admin/agents/${agentId}/get-ratings-by-customer`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setAllRatings(response.data.data);
        }
      } catch (err) {
        console.log(`Error in fetching data`, err);
      } finally {
        setIsLoading(false);
      }
    };

    getAgentRatings();
  }, [agentId]);

  return (
    <Modal
      title="Ratings"
      centered
      width="600px"
      open={isVisible}
      onCancel={onCancel}
      className="w-[500px]"
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
              <th className="px-6 border-r-2 bg-teal-700 font-normal text-white text-left">
                Ratings and Review
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {isLoading && (
              <tr>
                <td colSpan={3}>
                  <p className="mb-0 text-center">Loading data...</p>
                </td>
              </tr>
            )}

            {!isLoading && allRatings.length === 0 && (
              <tr>
                <td colSpan={3}>
                  <p className="mb-0 text-center">No data Available</p>
                </td>
              </tr>
            )}

            {!isLoading &&
              allRatings?.map((rating) => (
                <tr
                  key={rating.id}
                  className="bg-gray-100 border border-gray-300 md:border-none md:table-row mb-2 md:mb-0"
                >
                  <td className="p-2 text-center md:table-cell">
                    {rating.customerId.id}
                  </td>
                  <td className="p-2 text-center md:table-cell">
                    {rating.customerId.fullName}
                  </td>
                  <td className="px-6 py-4 text-left md:table-cell">
                    <div className="flex items-center text-center">
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

export default AgentRatingModal;
