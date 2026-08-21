import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 import '../src/App.css';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // اطلاعات ثابت برای تست (بعداً به API وصل می‌شه)
    if (username === 'admin' && password === '1234') {
        localStorage.setItem("isLoggedIn" , "true")
      navigate('/'); // هدایت به داشبورد
    } else {
      setError('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">ورود به پنل مدیریت</h2>
        {error && <p className='err'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label">نام کاربری</label>
            <input
              className="login-input"
              type="text"
              placeholder="نام کاربری را وارد کنید"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="login-field">
            <label className="login-label">رمز عبور</label>
            <input
              className="login-input"
              type="password"
              placeholder="رمز عبور را وارد کنید"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login-button" type="submit">ورود</button>
        </form>
      </div>
    </div>
  );
}

export default Login;