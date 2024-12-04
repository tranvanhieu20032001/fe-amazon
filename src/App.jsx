import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/page/Home';
import Login from './components/page/Login';
import Layout from './components/admin/Layout';
import ShopManagement from './components/admin/shopmanagement/ShopManagement';
import UserManagement from './components/admin/usermanagement/UserManagement';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      
      {/* Route chính /admin với Layout */}
      <Route path="/admin" element={<Layout />}>
        {/* Route mặc định khi vào /admin sẽ hiển thị ShopManagement */}
        <Route index element={<ShopManagement />} />
        <Route path="manage/shop" element={<ShopManagement />} />
        <Route path="manage/user" element={<UserManagement />} />
      </Route>
    </Routes>
  );
}

export default App;
