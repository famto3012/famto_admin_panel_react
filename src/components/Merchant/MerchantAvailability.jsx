import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MerchantAvailability = ({ detail, onDataChange }) => {
  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

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
    // Ensure that only one of openAllDay, closedAllDay, or specificTime is true
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
            : null,
        endTime:
          field === "specificTime"
            ? detail?.merchantDetail?.availability?.specificDays?.[day]?.endTime
            : null,
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

  const availability = detail?.merchantDetail?.availability || {};

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
                checked={availability?.type === "Full-time"}
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
                checked={availability?.type === "Specific-time"}
                onChange={handleAvailabilityTypeChange}
                className="me-2"
              />
              Specific time
            </label>
          </div>
        </div>
      </div>
      {availability?.type === "Specific-time" && (
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
              {daysOfWeek.map((day, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 capitalize">{day}</td>
                  <td className="py-2 px-4 text-center">
                    <input
                      type="radio"
                      name={`${day}.availability`}
                      checked={
                        availability?.specificDays?.[day]?.openAllDay || false
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
                        availability?.specificDays?.[day]?.closedAllDay || false
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
                        availability?.specificDays?.[day]?.specificTime || false
                      }
                      onChange={() =>
                        handleSpecificDayChange(day, "specificTime", true)
                      }
                      className="mr-2"
                    />
                  </td>
                  {availability?.specificDays?.[day]?.specificTime && (
                    <>
                      <td>
                        <DatePicker
                          // selected={
                          //   availability?.specificDays?.[day]?.startTime
                          //     ? new Date(
                          //         `1970-01-01T${availability?.specificDays[day]?.startTime}:00`
                          //       )
                          //     : null
                          // }
                          selected={
                            availability?.specificDays?.[day]?.startTime &&
                            /^\d{2}:\d{2}$/.test(
                              availability.specificDays[day].startTime
                            )
                              ? new Date(
                                  `1970-01-01T${availability.specificDays[day].startTime}:00`
                                )
                              : null
                          }
                          onChange={(time) =>
                            handleTimeChange(
                              day,
                              "startTime",
                              time
                                ? time.toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  })
                                : ""
                            )
                          }
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          placeholderText="Start time"
                          className="border-2 p-2 rounded-lg cursor-pointer outline-none focus:outline-none w-full"
                        />
                        {/* <input
                          type="time"
                          name={`startTime`}
                          value={
                            availability?.specificDays?.[day]?.startTime || ""
                          }
                          onChange={(e) =>
                            handleTimeChange(day, "startTime", e.target.value)
                          }
                          className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:outline-none block w-full p-2.5"
                        /> */}
                      </td>
                      <td>
                        <DatePicker
                          // selected={
                          //   availability?.specificDays?.[day]?.endTime
                          //     ? new Date(
                          //         `1970-01-01T${availability?.specificDays[day]?.endTime}:00`
                          //       )
                          //     : null
                          // }
                          selected={
                            availability?.specificDays?.[day]?.endTime &&
                            /^\d{2}:\d{2}$/.test(
                              availability.specificDays[day].endTime
                            )
                              ? new Date(
                                  `1970-01-01T${availability.specificDays[day].endTime}:00`
                                )
                              : null
                          }
                          onChange={(time) =>
                            handleTimeChange(
                              day,
                              "endTime",
                              time
                                ? time.toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  })
                                : ""
                            )
                          }
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          placeholderText="End time"
                          className="border-2 p-2 rounded-lg cursor-pointer outline-none focus:outline-none w-fit"
                        />

                        {/* <input
                          type="time"
                          name={`endTime`}
                          value={
                            availability?.specificDays?.[day]?.endTime || ""
                          }
                          onChange={(e) =>
                            handleTimeChange(day, "endTime", e.target.value)
                          }
                          className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:outline-none block w-full p-2.5"
                        /> */}
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
