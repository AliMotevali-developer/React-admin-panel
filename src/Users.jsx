import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usersData } from './data';
import Modal from './Modal';

function Users() {
  const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'کاربر',
    status: 'فعال',
  });

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'کاربر', status: 'فعال' });
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingUser) {
      setUsers(users.map((user) =>
        user.id === editingUser.id ? { ...user, ...formData } : user
      ));
    } else {
      const newUser = {
        id: users.length + 1,
        ...formData,
      };
      setUsers([...users, newUser]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('آیا از حذف این کاربر مطمئن هستید؟')) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const getStatusClass = (status) => {
    if (status === 'فعال') return 'status-active';
    return 'status-inactive';
  };

  return (
    <div className="ads-page">
      <div className="ads-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/" className="back-btn">← بازگشت</Link>
          <h1>مدیریت کاربران</h1>
        </div>
        <button className="add-ad-btn" onClick={openAddModal}>
          + افزودن کاربر جدید
        </button>
      </div>

      <div className="search-filter-container">
        <input
          type="text"
          className="search-input"
          placeholder="جستجوی کاربر بر اساس نام یا ایمیل..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="ads-table-container">
        <table className="ads-table">
          <thead>
            <tr>
              <th>نام</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>
                  هیچ کاربری با این مشخصات پیدا نشد.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td data-label="نام:">{user.name}</td>
                  <td data-label="ایمیل:">{user.email}</td>
                  <td data-label="نقش:">{user.role}</td>
                  <td data-label="وضعیت:">
                    <span className={"status " + getStatusClass(user.status)}>
                      {user.status}
                    </span>
                  </td>
                  <td data-label="عملیات:">
                    <button className="edit-btn" onClick={() => openEditModal(user)}>
                      ویرایش
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>
                      حذف
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? 'ویرایش کاربر' : 'افزودن کاربر جدید'}
      >
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>نام کامل</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>ایمیل</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>نقش</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="مدیر">مدیر</option>
              <option value="کارشناس">کارشناس</option>
              <option value="کاربر">کاربر</option>
            </select>
          </div>
          <div className="form-group">
            <label>وضعیت</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="فعال">فعال</option>
              <option value="غیرفعال">غیرفعال</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
              انصراف
            </button>
            <button type="submit" className="btn-primary">
              {editingUser ? 'ویرایش' : 'افزودن'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Users;