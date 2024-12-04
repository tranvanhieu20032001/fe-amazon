import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdCategory,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { AiOutlineControl, AiOutlineProduct } from "react-icons/ai";
import { FaUsersGear } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
import { useSelector } from "react-redux";
import { FaUserFriends } from "react-icons/fa";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    // {
    //   label: "Bảng điều khiển",
    //   icon: <AiOutlineControl size={25} />,
    //   link: "/admin",
    // },
    {
      label: "Quản lý shop",
      icon: <FaUsersGear size={25} />,
      link: "/admin/manage/shop",
    },
    {
      label: "Quản lý user",
      icon: <FaUserFriends size={25} />,
      link: "/admin/manage/user",
    },
    // {
    //   label: "Quản lý sản phẩm",
    //   icon: <AiOutlineProduct size={25} />,
    //   link: "/admin/products",
    // },
    // {
    //   label: "Quản lý danh mục",
    //   icon: <MdCategory size={25} />,
    //   link: "/admin/categories",
    // },
  ];

  return (
    <div
      className={`${
        sidebarOpen ? "w-52" : "w-20"
      } text-white shadow-md transition-all duration-300`}
    >
      <div className="relative flex justify-center">
        <NavLink to="/">
          <img
            // src={logo}
            alt="Ondia Logo"
            className={`${sidebarOpen ? "h-14" : "h-10"} my-2 w-auto `}
          />
        </NavLink>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute bg-white text-primary p-1 rounded-full border hover:text-white hover:bg-primary mb-4 top-2 -right-3"
        >
          {sidebarOpen ? (
            <MdOutlineKeyboardDoubleArrowLeft size={20} />
          ) : (
            <MdOutlineKeyboardDoubleArrowRight size={20} />
          )}
        </button>
      </div>

      {/* Sidebar Menu */}
      <ul className="my-4 px-2 text-[13px]">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`flex items-center ${
              sidebarOpen ? "justify-start" : "justify-center"
            } gap-2 py-2 cursor-pointer text-gray-500 border-b border-b-transparent hover:text-primary hover:border-b-primary`}
          >
            <NavLink
              to={item.link}
              className="flex items-center gap-2 py-2 px-4 rounded"
            >
              {item.icon}
              <span
                className={`${
                  !sidebarOpen
                    ? "hidden opacity-0 transform scale-75"
                    : "opacity-100 transform scale-100"
                } transition-all duration-300`}
              >
                {item.label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
