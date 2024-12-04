import React, { useEffect, useState } from "react";
import SummaryApi from "../../../common"; // Đảm bảo bạn đã khai báo đúng các API endpoint
import axios from "axios";
import { toast } from "react-toastify";
import DetailUserModal from "./DetailUserModal"; // Import component Modal

function UserManagement() {
  const [user, setUser] = useState([]);  // Sử dụng state 'user' thay vì 'shops'
  const [selectedUser, setSelectedUser] = useState(null); // Đổi tên thành selectedUser
  const [showModal, setShowModal] = useState(false); // State để điều khiển việc hiển thị modal

  const getUsers = async () => {  // Thay đổi hàm lấy dữ liệu thành getUsers
    try {
      const dataResponse = await axios({
        url: SummaryApi.getAllUser.url,
        method: SummaryApi.getAllUser.method,
        headers: {
          "x-auth-token": sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      });

      const dataApi = dataResponse.data.users; // Đảm bảo trả về 'users' chứ không phải 'shops'
      setUser(dataApi);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Đã xảy ra lỗi.");
    }
  };

  const handleEditClick = (user) => {  // Đổi 'shop' thành 'user'
    setSelectedUser(user); // Lưu thông tin user vào state
    setShowModal(true); // Hiển thị modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Đóng modal khi bấm nút Close
  };

  const handleDeleteClick = async (userId) => {  // Đổi 'shopId' thành 'userId'
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) return;

    try {
      // Sử dụng đúng URL xóa người dùng
      const url = SummaryApi.deleteUserById.url.replace(":id", userId); // Thay 'shopId' thành 'userId'
      console.log("API URL:", url); // Kiểm tra URL

      // Gửi yêu cầu xóa người dùng
      await axios({
        url: url,
        method: SummaryApi.deleteUserById.method,  // Chắc chắn đây là phương thức DELETE
        headers: {
          "x-auth-token": sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      });

      // Cập nhật lại danh sách user sau khi xóa
      setUser(prevUsers => prevUsers.filter(user => user._id !== userId)); // Thay 'shop' thành 'user'
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Delete error: ", error); // Log error để xem chi tiết
      toast.error(error?.response?.data?.msg || "Error deleting user.");
    }
  };

  useEffect(() => {
    getUsers();  // Gọi hàm getUsers thay vì getShops
  }, []);

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <h1 className="p-4 text-xl font-semibold">Quản lý người dùng</h1>
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
          {user.length === 0 ? (  // Thay 'shops' thành 'user'
            <tr>
              <td colSpan="5" className="py-2 px-4 text-center text-gray-800">
                No users available
              </td>
            </tr>
          ) : (
            user.map((user) => (  // Thay 'shop' thành 'user'
              <tr key={user._id} className="border-b">
                <td className="py-2 px-4 text-sm text-gray-800">{user._id}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{user.email}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{user.name}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{user.role}</td>
                <td className="py-2 px-4 text-sm text-gray-800">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleEditClick(user)} // Gọi hàm handleEditClick
                  >
                    view
                  </button>
                  {/* Nếu user là 'supadmin', vô hiệu hóa nút xóa */}
                  {user.type !== "supadmin" && (
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteClick(user._id)} // Gọi hàm handleDeleteClick
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && selectedUser && (  // Thay 'selectedShop' thành 'selectedUser'
        <DetailUserModal
          user={selectedUser}  // Thay 'shop' thành 'user'
          onClose={handleCloseModal} // Đóng modal
        />
      )}
    </div>
  );
}

export default UserManagement;
