import { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { ArrowDownOutlined, SearchOutlined } from "@ant-design/icons";
import { FilterAltOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import StarRating from "../../../components/model/StarRating";
import GlobalSearch from "../../../components/GlobalSearch";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import GIFLoader from "../../../components/GIFLoader";
import { CSVLink } from "react-csv";
import { allCustomerCSVDataHeading } from "../../../utils/DefaultData";
import { Pagination } from "@mui/material";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [allGeofence, setAllGeofence] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const [geofenceFilter, setGeofenceFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [pagination, setPagination] = useState({});

  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [customersResponse, geofenceResponse] = await Promise.all([
          axios.get(`${BASE_URL}/admin/customers/get-all`, {
            params: { page, limit },
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (customersResponse.status === 200) {
          setCustomers(customersResponse.data.data);
          setPagination(customersResponse.data);
        }
        if (geofenceResponse.status === 200) {
          setAllGeofence(geofenceResponse.data.geofences);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, role, navigate, page, limit]);

  const handleFilterChange = async (filterType, value) => {
    try {
      setIsTableLoading(true);

      const params =
        filterType === "geofence"
          ? { filter: value, page, limit }
          : { query: value, page, limit };

      const response = await axios.get(
        `${BASE_URL}/admin/customers${
          filterType === "geofence" ? "" : "/search"
        }`,
        {
          params,
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setCustomers(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      console.log(`Error in fetching customers: ${err}`);
    } finally {
      setIsTableLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getItemAriaLabel = (type, page, selected) => {
    switch (type) {
      case "page":
        return `${selected ? "" : "Go to "}page ${page}`;
      case "first":
        return "Go to first page";
      case "last":
        return "Go to last page";
      case "next":
        return "Go to next page";
      case "previous":
        return "Go to previous page";
      default:
        return "";
    }
  };

  return (
    <div>
    {isLoading ? (
      <GIFLoader/>
    ) : (
    <>
      <Sidebar />
      <main className="w-full h-screen pl-[290px] bg-gray-100">
        <nav className="p-5">
          <GlobalSearch />
        </nav>

        <div className="flex items-center justify-between mx-8 mt-5">
          <h1 className="text-lg font-bold">Customers</h1>
          <button className="bg-cyan-100 text-black rounded-md px-4 py-2 font-semibold flex items-center space-x-2">
            <CSVLink
              data={customers}
              headers={allCustomerCSVDataHeading}
              filename={"All_Customer_Data.csv"}
            >
              <ArrowDownOutlined /> <span>CSV</span>
            </CSVLink>
          </button>
        </div>
        <div className="mx-8 rounded-lg mt-5 flex p-6 bg-white justify-between">
          <select
            name="type"
            value={geofenceFilter}
            className="bg-blue-50 px-4 outline-none rounded-lg focus:outline-none"
            onChange={(e) => {
              setGeofenceFilter(e.target.value);
              handleFilterChange("geofence", e.target.value);
            }}
          >
            <option hidden value="">
              Geofence
            </option>
            {allGeofence.map((geoFence) => (
              <option value={geoFence._id} key={geoFence._id}>
                {geoFence.name}
              </option>
            ))}
          </select>
          <div className="relative">
            <FilterAltOutlined className="text-gray-400" />
            <input
              type="search"
              name="search"
              placeholder="Search customer"
              className="bg-gray-100 h-10 px-5 pr-2 rounded-full ml-4 w-72 text-sm focus:outline-none"
              value={searchFilter}
              onChange={(e) => {
                setSearchFilter(e.target.value);
                handleFilterChange("search", e.target.value);
              }}
            />
            <button type="submit" className="absolute right-2 top-2">
              <SearchOutlined className="text-xl text-gray-500" />
            </button>
          </div>
        </div>
        <div className="overflow-auto mt-[20px] w-full">
          <table className="text-start w-full">
            <thead>
              <tr>
                {[
                  "ID",
                  "Name",
                  "Email",
                  "Phone",
                  "Last Platform Used",
                  "Registration Date",
                  "Rating",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="bg-teal-800 text-center text-white py-[20px] border-r-2 border-[#eee]/50"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isTableLoading && (
                <tr>
                  <td colSpan={7} className="text-center h-20">
                    Loading Data...
                  </td>
                </tr>
              )}
              {!isTableLoading && customers?.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    <p className="flex items-center justify-center h-20">
                      No data available
                    </p>
                  </td>
                </tr>
              )}
              {!isTableLoading &&
                customers.map((customer) => (
                  <tr
                    key={customer._id}
                    className="align-middle border-b border-gray-300 text-center"
                  >
                    <td className="p-4">
                      <Link
                        to={`/customer-detail/${customer._id}`}
                        className="underline underline-offset-4"
                      >
                        {customer._id}
                      </Link>
                    </td>
                    <td>{customer.fullName}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>{customer.lastPlatformUsed}</td>
                    <td>{customer.registrationDate}</td>
                    <td>
                      <StarRating rating={customer.rating} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="my-[30px] flex justify-center">
        <Pagination
              count={pagination.totalPages || 0}
              page={pagination.currentPage || page}
              onChange={handlePageChange}
              shape="rounded"
              siblingCount={0}
              hidePrevButton={!pagination.hasPrevPage}
              hideNextButton={!pagination.hasNextPage}
              getItemAriaLabel={getItemAriaLabel}
            />
        </div>
      </main>
    </>
    )}
    </div>
  );
};

export default Customers;
