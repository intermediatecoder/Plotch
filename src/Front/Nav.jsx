import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CloudIcon from "@mui/icons-material/Cloud";
import { Link } from "react-router-dom";

import logoPlotchai from "../assets/logo-plotchai.png";
import logoSmallPlotchai from "../assets/logo-small-plotchai.png";

const Nav = () => {
  
  const [expandedOrders, setExpandedOrders] = useState(false);


  const [expandedAccountPayable, setExpandedAccountPayable] = useState(false);


  const [sidebarHover, setSidebarHover] = useState(false);

 
  const handleToggleOrders = () => {
    setExpandedOrders((prev) => !prev);
  };

 
  const handleToggleAccountPayable = () => {
    setExpandedAccountPayable((prev) => !prev);
  };

  return (
    <div
      className={`${
        sidebarHover ? "w-64" : "w-16"
      } bg-[#16475f] text-white h-full fixed transition-all duration-300 overflow-hidden z-10`}
      onMouseEnter={() => setSidebarHover(true)}
      onMouseLeave={() => setSidebarHover(false)}>
      <nav className="flex flex-col items-center md:items-start p-4 space-y-4">
        {
          <div className="flex w-full h-24 items-center justify-center">
            {sidebarHover && (
              <img
                src={logoPlotchai}
                className="h-8"
              />
            )}

            {!sidebarHover && (
              <img
                src={logoSmallPlotchai}
                className="h-6"
              />
            )}
          </div>
        }

     
        <Link
          to="/"
          className="flex items-center space-x-3 w-full hover:bg-gray-700  p-2 rounded-md transition">
          <HomeIcon />
          {sidebarHover && <span>Home</span>}
        </Link>

       
        <div>
          <Link
            to="/orders"
            onClick={handleToggleOrders} 
            className="flex items-center space-x-3 w-full hover:bg-gray-700 p-2 rounded-md transition cursor-pointer">
            <ShoppingCartIcon />
            {sidebarHover && <span>Orders</span>}
          </Link>

          {sidebarHover && expandedOrders && (
            <div className="ml-4 space-y-2">
              <a
                href="#fulltime-orders"
                className="flex items-center space-x-3 w-full hover:bg-gray-700 p-2 rounded-md transition">
                <span>Fulltime Orders</span>
              </a>
              <a
                href="#order-items"
                className="flex items-center space-x-3 w-full hover:bg-gray-700 p-2 rounded-md transition">
                <span>Order Items</span>
              </a>
              <a
                href="#shipments"
                className="flex items-center space-x-3 w-full hover:bg-gray-700 p-2 rounded-md transition">
                <span>Shipments</span>
              </a>
              <a
                href="#returns"
                className="flex items-center space-x-3 w-full hover:bg-gray-700 p-2 rounded-md transition">
                <span>Returns</span>
              </a>
            </div>
          )}
        </div>

       
        <a
          href="#products"
          className="flex items-center space-x-3 w-full hover:bg-gray-700 p-2 rounded-md transition">
          <GroupIcon />
          {sidebarHover && <span>Products</span>}
        </a>

       
        <div>
          <Link
            to="#"
            onClick={handleToggleAccountPayable} 
            className="flex items-center space-x-3 w-full hover:bg-gray-700 p-2 rounded-md transition cursor-pointer">
            <CurrencyRupeeIcon />
            {sidebarHover && <span>Account Payable</span>}
          </Link>

          {sidebarHover && expandedAccountPayable && (
            <div className="ml-4 space-y-2">
              <a
                href="#payable-pages"
                className="flex items-center space-x-3 w-full hover:bg-gray-700 p-2 rounded-md transition">
                <span>Pages</span>
              </a>
              
              <a
                href="#invoices"
                className="flex items-center space-x-3 w-full hover:bg-gray-700 p-2 rounded-md transition">
                <span>Invoices</span>
              </a>
            </div>
          )}
        </div>

     
        <a
          href="#instances"
          className="flex items-center space-x-3 w-full hover:bg-gray-700 p-2 rounded-md transition">
          <CloudIcon />
          {sidebarHover && <span>Instances</span>}
        </a>
      </nav>
    </div>
  );
};

export default Nav;
