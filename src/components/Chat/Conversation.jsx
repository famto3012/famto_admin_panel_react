import { CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

const Conversation = () => {
  const [conversation, setConversation] = useState([]);
  const [isAllFocused, setIsAllFocused] = useState(false);
  const [isUnreadFocused, setIsUnreadFocused] = useState(false);
  return (
    <>
      <div className="relative">
        <input
          type="search"
          name="search"
          placeholder="Search People"
          className="bg-white border-[1px] border-gray-300 w-full h-10 pl-[40px]  rounded-xl text-sm focus:outline-none pr-3"
        />
        <button type="submit" className="absolute left-0 top-0 mt-2 ml-3">
          <SearchOutlined className="text-xl text-gray-500" />
        </button>
      </div>
      <div className="mt-[29px] mb-5">
        <button
          className="bg-teal-50 me-3 text-teal-600 focus:bg-teal-600 focus:text-white border-[1px] focus:border-transparent border-teal-600 px-4 py-2 rounded-lg"
          onFocus={() => setIsAllFocused(true)}
          onBlur={() => setIsAllFocused(false)}
        >
          All{" "}
          {isAllFocused && (
            <span className="pl-1 ">
              <CloseCircleOutlined
                className="text-md cursor-pointer focus:text-white"
                onClick={() => setIsAllFocused(false)}
              />
            </span>
          )}
        </button>
        <button
          className="bg-teal-50 text-teal-600 focus:bg-teal-600 focus:text-white border-[1px] focus:border-transparent border-teal-600 px-4 py-2 rounded-lg"
          onFocus={() => setIsUnreadFocused(true)}
          onBlur={() => setIsUnreadFocused(false)}
        >
          Unread{" "}
          <span
            className={`${
              isUnreadFocused
                ? "bg-white text-teal-600"
                : "bg-teal-600 text-white"
            } font-bold text-[15px] pt-1 pb-1 pl-2 pr-2 ml-2 rounded-full`}
          >
            4
          </span>
        </button>
      </div>

      <div className="bg-white h-[418px] w-full rounded-xl border-[1px] border-gray-300 overflow-y-auto">
        {/* {conversation.map((data) => { */}
        <div className="flex rounded-xl h-[73px] pt-3 pb-3 pl-4 focus:bg-teal-50">
          <div className="w-[50px] h-[50px] rounded-full me-3">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2FGroup%20427320384.svg?alt=media&token=0be47a53-43f3-4887-9822-3baad0edd31e"
              alt="profile pic"
            />
          </div>
          <div className="d-block">
            <p className="text-[17px] font-semibold">User name</p>
            <p className="text-[13px] text-gray-500">Message</p>
          </div>
          <div className="ml-auto pr-4">
            <p className="text-gray-500 text-[14px] mb-1">6min ago</p>
            <p className="text-white text-[15px] text-center font-bold bg-teal-600 w-[24px] rounded-full ml-auto">
              1
            </p>
          </div>
        </div>
        <span className="block w-full h-[1px] bg-gray-200"></span>
        {/* })} */}
      </div>
    </>
  );
};

export default Conversation;
