import { useState } from 'react';
import { Link } from 'react-router-dom';
import { adsData } from './data';
import Modal from './Modal';

function Ads() {
  const [ads, setAds] = useState(adsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('همه');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    status: 'فعال',
    date: '',
  });

  // فیلتر کردن آگهی‌ها
  const filteredAds = ads.filter((ad) => {
    const matchTitle = ad.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'همه' || ad.status === statusFilter;
    return matchTitle && matchStatus;
  });

  const openAddModal = () => {
    setEditingAd(null);
    setFormData({ title: '', price: '', status: 'فعال', date: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (ad) => {
    setEditingAd(ad);
    setFormData({
      title: ad.title,
      price: ad.price,
      status: ad.status,
      date: ad.date,
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingAd) {
      setAds(ads.map((ad) =>
        ad.id === editingAd.id ? { ...ad, ...formData } : ad
      ));
    } else {
      const newAd = {
        id: ads.length + 1,
        ...formData,
      };
      setAds([...ads, newAd]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('آیا از حذف این آگهی مطمئن هستید؟')) {
      setAds(ads.filter((ad) => ad.id !== id));
    }
  };

  const getStatusClass = (status) => {
    if (status === 'فعال') return 'status-active';
    if (status === 'غیرفعال') return 'status-inactive';
    return 'status-sold';
  };

  return (
    <div className="ads-page">
      <div className="ads-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/" className="back-btn">← بازگشت</Link>
          <h1>مدیریت آگهی‌ها</h1>
        </div>
        <button className="add-ad-btn" onClick={openAddModal}>
          + افزودن آگهی جدید
        </button>
      </div>

      {/* بخش جستجو و فیلتر */}
      <div className="search-filter-container">
        <input
          type="text"
          className="search-input"
          placeholder="جستجوی آگهی..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="همه">همه وضعیت‌ها</option>
          <option value="فعال">فعال</option>
          <option value="غیرفعال">غیرفعال</option>
          <option value="فروش رفته">فروش رفته</option>
        </select>
      </div>

      <div className="ads-table-container">
        <table className="ads-table">
          <thead>
            <tr>
              <th>عنوان</th>
              <th>قیمت</th>
              <th>وضعیت</th>
              <th>تاریخ</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredAds.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>
                  هیچ آگهی‌ای با این مشخصات پیدا نشد.
                </td>
              </tr>
            ) : (
              filteredAds.map((ad) => (
                <tr key={ad.id}>
                  <td data-label="عنوان:">{ad.title}</td>
                  <td data-label="قیمت:">{ad.price}</td>
                  <td data-label="وضعیت:">
                    <span className={"status " + getStatusClass(ad.status)}>
                      {ad.status}
                    </span>
                  </td>
                  <td data-label="تاریخ:">{ad.date}</td>
                  <td data-label="عملیات:">
                    <button className="edit-btn" onClick={() => openEditModal(ad)}>
                      ویرایش
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(ad.id)}>
                      حذف
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* مودال افزودن/ویرایش */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAd ? 'ویرایش آگهی' : 'افزودن آگهی جدید'}
      >
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>عنوان</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>قیمت</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="مثلاً ۱۲,۰۰۰,۰۰۰"
              required
            />
          </div>
          <div className="form-group">
            <label>وضعیت</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="فعال">فعال</option>
              <option value="غیرفعال">غیرفعال</option>
              <option value="فروش رفته">فروش رفته</option>
            </select>
          </div>
          <div className="form-group">
            <label>تاریخ</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="مثلاً ۱۴۰۴/۰۱/۱۵"
              required
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
              انصراف
            </button>
            <button type="submit" className="btn-primary">
              {editingAd ? 'ویرایش' : 'افزودن'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Ads;