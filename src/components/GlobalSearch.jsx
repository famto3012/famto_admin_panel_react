import { SearchOutlined } from "@ant-design/icons";
import { CgBell } from "react-icons/cg";

const GlobalSearch = () => {
  return (
    <div className="flex items-center justify-end gap-[20px]">
      <CgBell className="text-gray-500 text-xl" />

      <div className="relative">
        <input
          type="search"
          name="search"
          placeholder="Search"
          className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
        />
        <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
          <SearchOutlined className="text-xl text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default GlobalSearch;
