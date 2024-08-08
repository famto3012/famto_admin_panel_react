const MerchantAvailability = ({ detail, onDataChange }) => {
  const handleAvailabilityTypeChange = (e) => {
    const { value } = e.target;
    onDataChange({
      ...detail,
      merchantDetail: {
        ...detail.merchantDetail,
        availability: {
          ...detail.merchantDetail.availability,
          type: value,
        },
      },
    });
  };

  const handleSpecificDayChange = (day, field, value) => {
    // Only one of openAllDay, closedAllDay, or specificTime should be true
    const newSpecificDays = {
      ...detail.merchantDetail.availability.specificDays,
      [day]: {
        openAllDay: field === "openAllDay" ? value : false,
        closedAllDay: field === "closedAllDay" ? value : false,
        specificTime: field === "specificTime" ? value : false,
        startTime:
          field === "specificTime"
            ? detail?.merchantDetail?.availability?.specificDays?.[day]
                ?.startTime
            : "",
        endTime:
          field === "specificTime"
            ? detail?.merchantDetail?.availability?.specificDays?.[day]?.endTime
            : "",
      },
    };

    onDataChange({
      ...detail,
      merchantDetail: {
        ...detail.merchantDetail,
        availability: {
          ...detail.merchantDetail.availability,
          specificDays: newSpecificDays,
        },
      },
    });
  };

  const handleTimeChange = (day, timeType, value) => {
    onDataChange({
      ...detail,
      merchantDetail: {
        ...detail.merchantDetail,
        availability: {
          ...detail.merchantDetail.availability,
          specificDays: {
            ...detail.merchantDetail.availability.specificDays,
            [day]: {
              ...detail.merchantDetail.availability.specificDays[day],
              [timeType]: value,
            },
          },
        },
      },
    });
  };

  return (
    <>
      <div className="mb-6 flex mt-10">
        <h3 className="text-gray-700 font-bold mb-2">Time wise availability</h3>
        <div className="mb-4">
          <div className="flex items-center justify-center ml-[11rem] gap-16">
            <label className="mr-4 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="Full-time"
                checked={
                  detail?.merchantDetail?.availability?.type === "Full-time"
                }
                onChange={handleAvailabilityTypeChange}
                className="me-2"
              />
              Full time
            </label>
            <label className="mr-4 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="Specific-time"
                checked={
                  detail?.merchantDetail?.availability?.type === "Specific-time"
                }
                onChange={handleAvailabilityTypeChange}
                className="me-2"
              />
              Specific time
            </label>
          </div>
        </div>
      </div>
      {detail?.merchantDetail?.availability?.type === "Specific-time" && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 text-start">Week day</th>
                <th className="py-2 px-4">Open all day</th>
                <th className="py-2 px-4">Close all day</th>
                <th className="py-2 px-4">Specific Time</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(
                detail?.merchantDetail?.availability?.specificDays || {}
              ).map((day, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 capitalize">{day}</td>
                  <td className="py-2 px-4 text-center">
                    <input
                      type="radio"
                      name={`${day}.availability`}
                      checked={
                        detail?.merchantDetail?.availability?.specificDays?.[
                          day
                        ]?.openAllDay || false
                      }
                      onChange={() =>
                        handleSpecificDayChange(day, "openAllDay", true)
                      }
                      className="mr-2"
                    />
                  </td>
                  <td className="py-2 px-4 text-center">
                    <input
                      type="radio"
                      name={`${day}.availability`}
                      checked={
                        detail?.merchantDetail?.availability?.specificDays?.[
                          day
                        ]?.closedAllDay || false
                      }
                      onChange={() =>
                        handleSpecificDayChange(day, "closedAllDay", true)
                      }
                      className="mr-2"
                    />
                  </td>
                  <td className="py-2 px-4 text-center">
                    <input
                      type="radio"
                      name={`${day}.availability`}
                      checked={
                        detail?.merchantDetail?.availability?.specificDays?.[
                          day
                        ]?.specificTime || false
                      }
                      onChange={() =>
                        handleSpecificDayChange(day, "specificTime", true)
                      }
                      className="mr-2"
                    />
                  </td>

                  {detail?.merchantDetail?.availability?.specificDays?.[day]
                    ?.specificTime && (
                    <>
                      <td>
                        <input
                          type="time"
                          name={`startTime`}
                          value={
                            detail?.merchantDetail?.availability
                              ?.specificDays?.[day]?.startTime || ""
                          }
                          onChange={(e) =>
                            handleTimeChange(day, "startTime", e.target.value)
                          }
                          className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:outline-none block w-full p-2.5"
                        />
                      </td>
                      <td>
                        <input
                          type="time"
                          name={`endTime`}
                          value={
                            detail?.merchantDetail?.availability
                              ?.specificDays?.[day]?.endTime || ""
                          }
                          onChange={(e) =>
                            handleTimeChange(day, "endTime", e.target.value)
                          }
                          className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:outline-none block w-full p-2.5"
                        />
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default MerchantAvailability;
