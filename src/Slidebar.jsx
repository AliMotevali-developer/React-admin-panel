import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Slidebar({ isOpen, toggleMenu, onLogout }) {
  const location = useLocation();

  return (
    <>
      <div className="sidebar-wrapper">
        <button className="hamburger" onClick={toggleMenu}><FaBars /></button>
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
          {isOpen && (
            <button className="close-sidebar" onClick={toggleMenu}><FaTimes /></button>
          )}
          <div className="sidebar-header">
            <h2>پنل مدیریت</h2>
          </div>
          
          <nav className="sidebar-nav">
            <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
              داشبورد
            </Link>
            <Link to="/ads" className={`nav-item ${location.pathname === '/ads' ? 'active' : ''}`}>
              آگهی‌ها
            </Link>
            <Link to="/users" className={`nav-item ${location.pathname === '/users' ? 'active' : ''}`}>
              کاربران
            </Link>
            <Link to="/settings" className={`nav-item ${location.pathname === '/settings' ? 'active' : ''}`}>
              تنظیمات
            </Link>
            <button className="nav-item logout" onClick={onLogout}>
              خروج
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Slidebar;