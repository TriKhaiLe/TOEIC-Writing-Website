import React, { useState } from 'react';
import './RegisterModal.css';
import axios from 'axios';

const RegisterModal = ({ show, onClose }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Gửi yêu cầu đăng ký đến API của bạn
      const response = await axios.post('/api/register', { userName, password });

      // Nếu đăng ký thành công, lưu tên người dùng vào localStorage
      if (response.data.success) {
        localStorage.setItem('userName', userName);
        onClose(); // Đóng modal sau khi đăng ký thành công
      }
    } catch (error) {
      console.error('Error registering:', error);
      setError('Registration failed');
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleRegister}>
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
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Confirm Password" 
            required 
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
