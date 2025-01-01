import { useState, useEffect } from "react";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function Orders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Processing");
  const [dayFilter, setDayFilter] = useState(7); 
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`https://basic-orders-api.onrender.com/api/orders?status=${statusFilter}`)
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, [statusFilter]);

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.orderDate);
    const currentDate = new Date();
    const dateDifference = (currentDate - orderDate) / (1000 * 60 * 60 * 24); 

    return (
      (statusFilter === "All" || order.orderStatus === statusFilter) &&
      dateDifference <= dayFilter &&
      (order.orderId.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="ml-16 flex-1 p-6 bg-gray-100 overflow-y-auto">
      <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by Order ID or Customer"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
          />
        </div>

        <div className="flex items-center space-x-6 ml-6">
          <button className="text-gray-600 hover:text-blue-600 flex items-center space-x-2">
            <i className="fas fa-wallet text-lg"></i>
            <span className="hidden sm:inline">968.01</span>
          </button>
          <button className="text-gray-600 hover:text-blue-600 flex items-center space-x-2">
            <i className="fas fa-coins text-lg"></i>
            <span className="hidden sm:inline">Recharge Wallet</span>
          </button>
          <button className="text-gray-600 hover:text-blue-600">
            <i className="fas fa-bell text-lg"></i>
          </button>
          <button className="text-gray-600 hover:text-blue-600">
            <i className="fas fa-cog text-lg"></i>
          </button>
          <button className="text-gray-600 hover:text-blue-600">
            <i className="fas fa-user-circle text-lg"></i>
          </button>
        </div>
      </div>

      <div className="space-y-4 mb-4 bg-white p-4 rounded-md shadow-sm">
        <h1><b>Orders</b></h1>
        <div className="flex items-center justify-between">
          <div className="flex space-x-6">
            {["Pending", "Processing", "Cancelled", "Delivered", "Return"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`relative pb-2 text-sm font-medium ${
                  statusFilter === status
                    ? "text-gray-800 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md shadow-sm overflow-x-auto">
   


        
        <div className="mt-4 flex items-center gap-2  mx-4 ">
          <div className="ml-4 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-500">
          <CalendarTodayIcon className="text-gray-500" />
          <label className="text-gray-600"></label>
          <select
            value={dayFilter}
            onChange={(e) => setDayFilter(Number(e.target.value))}
            className=" p-2 "
          >
            <option value={10}>Select the option</option>
            <option value={7}>Last 7 Days</option>
            <option value={14}>Last 14 Days</option>
            <option value={30}>Last 30 Days</option>
          </select>
          
          </div>
          <div className="">
        
          <label className="text-gray-600"></label>
          <button
         
            className="ml-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-500 space-x-4"
          ><FilterAltIcon className="text-gray-500" />Filter
    
          </button>
          </div>
        </div>

        <br></br>
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Action</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Order ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Order Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Order Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Customer</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Payment</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Order Amount</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Store Front</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.orderId} className="hover:bg-gray-100">
                <td className="px-4 py-2 text-sm text-blue-500 cursor-pointer">View</td>
                <td className="px-4 py-2 text-sm">{order.orderId}</td>
                <td className="px-4 py-2 text-sm">{order.orderStatus}</td>
                <td className="px-4 py-2 text-sm">{order.orderDate}</td>
                <td className="px-4 py-2 text-sm">{order.customer}</td>
                <td className="px-4 py-2 text-sm">{order.payment}</td>
                <td className="px-4 py-2 text-sm">{order.orderAmount}</td>
                <td className="px-4 py-2 text-sm">{order.storefront}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="p-4 text-gray-500 text-center">No orders found</div>
        )}
      </div>
    </div>
  );
}

export default Orders;
