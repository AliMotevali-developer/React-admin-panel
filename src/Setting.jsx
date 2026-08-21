import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Settings() {
  // بارگذاری اطلاعات از localStorage
  const savedUser = localStorage.getItem('userInfo');
  const initialUser = savedUser
    ? JSON.parse(savedUser)
    : {
        name: 'علی متولی',
        email: 'ali@email.com',
        password: '',
        newPassword: '',
        confirmPassword: '',
      };

  const [userInfo, setUserInfo] = useState(initialUser);
  const [message, setMessage] = useState('');

  // ذخیره خودکار در localStorage با هر تغییر
  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userInfo.newPassword && userInfo.newPassword !== userInfo.confirmPassword) {
      setMessage('رمز عبور جدید و تکرار آن مطابقت ندارند.');
      return;
    }

    if (userInfo.newPassword) {
      setUserInfo({
        ...userInfo,
        password: userInfo.newPassword,
        newPassword: '',
        confirmPassword: '',
      });
    }

    setMessage('اطلاعات با موفقیت به‌روزرسانی شد.');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/" className="back-btn">← بازگشت</Link>
          <h1>تنظیمات پروفایل</h1>
        </div>
      </div>

      <div className="settings-container">
        {message && (
          <div className={'settings-message ' + (message.includes('موفقیت') ? 'success' : 'error')}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label className="form-label">نام کامل</label>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">ایمیل</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">رمز عبور فعلی</label>
            <input
              type="password"
              name="password"
              placeholder="رمز عبور فعلی را وارد کنید"
              value={userInfo.password}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">رمز عبور جدید</label>
            <input
              type="password"
              name="newPassword"
              placeholder="رمز عبور جدید را وارد کنید"
              value={userInfo.newPassword}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">تکرار رمز عبور جدید</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="رمز عبور جدید را دوباره وارد کنید"
              value={userInfo.confirmPassword}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <button type="submit" className="save-btn">ذخیره تغییرات</button>
        </form>
      </div>
    </div>
  );
}

export default Settings;