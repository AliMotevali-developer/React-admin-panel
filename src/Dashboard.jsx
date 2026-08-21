import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../src/App.css';
import Agahi from './agahi.jsx';
import Slidebar from './Slidebar.jsx';
import Table from './Table.jsx';
import { adsData, usersData } from './data';

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  // آمار واقعی
  const totalAds = adsData.length;
  const totalUsers = usersData.length;
  const activeAds = adsData.filter((ad) => ad.status === 'فعال').length;

  return (
    <div className="app-layout">
      <Slidebar isOpen={isOpen} toggleMenu={toggleMenu} onLogout={handleLogout} />

      <div className="main-contetnt">
        <header className="header">
          <h1>پنل مدیریت</h1>
        </header>

        <div className="grids">
          <Agahi title="تعداد آگهی‌ها" value={totalAds} />
          <Agahi title="آگهی‌های فعال" value={activeAds} />
          <Agahi title="تعداد کاربران" value={totalUsers} />
        </div>

        <Table />
      </div>
    </div>
  );
}

export default Dashboard;