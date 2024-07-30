import { Modal } from "antd";

const RatingModal = ({ isVisible, toggleModal, data }) => {
  return (
    <>
      <Modal
        title="Ratings"
        open={isVisible}
        onCancel={toggleModal}
        className="w-[600px] max-h-[600px] overflow-y-auto"
        footer={null}
        centered
      >
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse block md:table text-center mt-4">
            <thead className="block md:table-header-group">
              <tr className="border border-gray-300 md:border-none md:table-row">
                <th className="p-2 px-5 border-r-2 bg-teal-700 font-normal text-white">
                  ID
                </th>
                <th className="p-2 px-8 border-r-2 bg-teal-700 font-normal text-white">
                  Name
                </th>
                <th className="px-6 border-r-2 bg-teal-700 font-normal text-white text-center ">
                  Ratings and Review
                </th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {data?.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-[20px] bg-gray-50">
                    No data available
                  </td>
                </tr>
              )}

              {data?.map((item, index) => (
                <tr
                  key={index}
                  className=" bg-gray-100 border border-gray-300 md:border-none md:table-row mb-2 md:mb-0"
                >
                  <td className="p-2 text-center  md:table-cell">{item.id}</td>
                  <td className="p-2  text-center md:table-cell">
                    {item.name}
                  </td>
                  <td className=" px-6 py-4 text-left md:table-cell">
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
      </Modal>
    </>
  );
};

export default RatingModal;
