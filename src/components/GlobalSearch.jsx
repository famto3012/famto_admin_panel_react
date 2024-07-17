import { SearchOutlined } from "@ant-design/icons";
import { IoMdLogOut } from "react-icons/io";
import { CgBell } from "react-icons/cg";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const GlobalSearch = () => {
  const { setToken, setRole } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    setRole(null);

    navigate("/auth/login");
  };

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
      <IoMdLogOut size={24} onClick={handleLogout} />
    </div>
  );
};

export default GlobalSearch;
