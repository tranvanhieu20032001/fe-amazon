import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import LoadingPage from "../../components/loading/LoadingPage";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails } from "../../store/userSlice"; // Import action để set user vào Redux
import ROLE from "../../common/role";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user); // Lấy thông tin người dùng từ Redux
  const [loading, setLoading] = useState(true); // State để theo dõi việc tải thông tin người dùng
  const navigate = useNavigate();

  useEffect(() => {
    const userFromStorage = JSON.parse(sessionStorage.getItem("user"));
    const tokenFromStorage = sessionStorage.getItem("token");

    if (userFromStorage && !user) {
      // Nếu có user trong sessionStorage và chưa có user trong Redux, dispatch vào Redux
      dispatch(setUserDetails(userFromStorage)); // Lưu thông tin user vào Redux
    }

    setTimeout(() => setLoading(false), 800);
  }, [dispatch, user, navigate]);

  // Nếu chưa có user trong Redux và đang tải dữ liệu, hiển thị trang loading
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex h-screen w-full">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 p-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
