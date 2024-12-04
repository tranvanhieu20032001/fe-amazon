import React, { useEffect, useState } from "react";
import SummaryApi from "../../../common"; // Đảm bảo bạn đã khai báo đúng các API endpoint
import axios from "axios";
import { toast } from "react-toastify";
import DetailShopModal from "./DetailShopModal"; // Import component Modal

function ShopManagement() {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null); // Thêm state cho shop được chọn
  const [showModal, setShowModal] = useState(false); // State để điều khiển việc hiển thị modal

  const getShops = async () => {
    try {
      const dataResponse = await axios({
        url: SummaryApi.getAllShop.url,
        method: SummaryApi.getAllShop.method,
        headers: {
          "x-auth-token": sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      });

      const dataApi = dataResponse.data.shops;
      setShops(dataApi);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Đã xảy ra lỗi.");
    }
  };

  const handleEditClick = (shop) => {
    setSelectedShop(shop); // Lưu thông tin shop vào state
    setShowModal(true); // Hiển thị modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Đóng modal khi bấm nút Close
  };

  const handleDeleteClick = async (shopId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this shop?");
    if (!isConfirmed) return;
  
    try {
      // Sử dụng đúng URL xóa shop
      const url = SummaryApi.deleteShopById.url.replace(":id", shopId);
      console.log("API URL:", url); // Kiểm tra URL
  
      // Gửi yêu cầu xóa shop
      await axios({
        url: url,
        method: SummaryApi.deleteShopById.method,  // Chắc chắn đây là phương thức DELETE
        headers: {
          "x-auth-token": sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      });
  
      // Cập nhật lại danh sách shop sau khi xóa
      setShops(prevShops => prevShops.filter(shop => shop._id !== shopId));
      toast.success("Shop deleted successfully!");
    } catch (error) {
      console.error("Delete error: ", error); // Log error để xem chi tiết
      toast.error(error?.response?.data?.msg || "Error deleting shop.");
    }
  };
  

  useEffect(() => {
    getShops();
  }, []);

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <h1 className="p-4 text-xl font-semibold">Quản lý shop</h1>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
              ID
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
              Email
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
              Name
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
              Role
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {shops.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-2 px-4 text-center text-gray-800">
                No shops available
              </td>
            </tr>
          ) : (
            shops.map((shop) => (
              <tr key={shop._id} className="border-b">
                <td className="py-2 px-4 text-sm text-gray-800">{shop._id}</td>
                <td className="py-2 px-4 text-sm text-gray-800">
                  {shop.email}
                </td>
                <td className="py-2 px-4 text-sm text-gray-800">{shop.name}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{shop.type}</td>
                <td className="py-2 px-4 text-sm text-gray-800">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleEditClick(shop)} // Gọi hàm handleEditClick
                  >
                    view
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteClick(shop._id)} // Gọi hàm handleDeleteClick
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && selectedShop && (
        <DetailShopModal
          shop={selectedShop}
          onClose={handleCloseModal} // Đóng modal
        />
      )}
    </div>
  );
}

export default ShopManagement;
