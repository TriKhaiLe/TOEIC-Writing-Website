import React, { useState } from 'react';
import './RegisterModal.css';
import axios from 'axios';
import config from '../../config'; // Import config file

const RegisterModal = ({ show, onClose, onLoginSuccess }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const [success, setSuccess] = useState(false); // Added success state

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Gửi yêu cầu đăng ký đến API của bạn
      const response = await axios.post(`${config.apiUrl}/RegisterLearner`, { userName, password });

      // Nếu đăng ký thành công, lưu tên người dùng vào localStorage
      if (response.status === 200) {
        setSuccess(true);
        onLoginSuccess(userName); // Gọi hàm onLoginSuccess để cập nhật trạng thái đăng nhập
        setTimeout(onClose, 1000); // Đóng modal sau 2 giây sau khi đăng ký thành công
      } else {
        setError('Registration failed: ' + error.message + error.response?.data);
      }
    } catch (error) {
      console.error('Error registering:', error.message);
      setError('Registration failed: ' + (error.message + error.response?.data || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {success ? (
          <p className="success">Registration successful! Closing...</p>
        ) : (
          <form onSubmit={handleRegister}>
            <input 
              type="text" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)} 
              placeholder="User Name" 
              required 
              disabled={loading} // Disable input fields while loading
            />
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              required 
              disabled={loading} // Disable input fields while loading
            />
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="Confirm Password" 
              required 
              disabled={loading} // Disable input fields while loading
            />
            {error && <p className="error">{error}</p>}
            <button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterModal;
