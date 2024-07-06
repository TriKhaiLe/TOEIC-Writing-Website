import React, { useState } from 'react';
import axios from 'axios';
import './LoginModal.css';

const LoginModal = ({ show, onClose, onLoginSuccess }) => { // Thêm onLoginSuccess prop
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const [success, setSuccess] = useState(false); // Added success state

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('https://localhost:7184/LoginLearner', { userName, password });

      if (response.status === 200) {
        // localStorage.setItem('userName', userName);
        setSuccess(true);
        onLoginSuccess(userName); // Gọi hàm onLoginSuccess để cập nhật trạng thái đăng nhập
        setTimeout(onClose, 1000); // Đóng modal sau 1 giây sau khi đăng nhập thành công
      } else {
        setError('Login failed: ' + response.data);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Login failed: ' + (error.response?.data || 'Unknown error'));
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
          <p className="success">Login successful! Closing...</p>
        ) : (
        <form onSubmit={handleLogin}>
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
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
