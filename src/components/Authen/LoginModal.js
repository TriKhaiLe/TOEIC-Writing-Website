import React, { useState } from 'react';
import './LoginModal.css';
import axios from 'axios';

const LoginModal = ({ show, onClose }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Gửi yêu cầu đăng nhập đến API của bạn
      const response = await axios.post('/api/login', { userName, password });

      // Nếu đăng nhập thành công, lưu tên người dùng vào localStorage
      if (response.data.success) {
        localStorage.setItem('userName', userName);
        onClose(); // Đóng modal sau khi đăng nhập thành công
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
            placeholder="User Name" 
            required 
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
  