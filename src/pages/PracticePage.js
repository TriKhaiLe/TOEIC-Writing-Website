import React, { useState } from 'react';
import PostList from '../components/Practice/PostList';
import PictureDescriptionForm from '../components/Practice/PictureDescriptionForm';
import EmailResponseForm from '../components/Practice/EmailResponseForm';
import EssayWritingForm from '../components/Practice/EssayWritingForm';
import LoginModal from '../components/Authen/LoginModal';
import RegisterModal from '../components/Authen/RegisterModal';
import './PracticePage.css'; // Import file CSS
import './Forms.css'; // Import file CSS

const PracticePage = ({ userName, onLoginSuccess }) => {
  const [selectedTab, setSelectedTab] = useState('picture');
  const [showForm, setShowForm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleLogout = () => {
    localStorage.removeItem('userName');
    onLoginSuccess(''); // Reset the userName in App component
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'picture':
        return (
          <>
            <div className={`form-container ${showForm ? 'expanded' : ''}`}>
              <PictureDescriptionForm />
            </div>
            <PostList type="picture" userName={userName} />
          </>
        );
      case 'email':
        return (
          <>
            <div className={`form-container ${showForm ? 'expanded' : ''}`}>
              <EmailResponseForm />
            </div>
            <PostList type="email" userName={userName} />
          </>
        );
      case 'essay':
        return (
          <>
            <div className={`form-container ${showForm ? 'expanded' : ''}`}>
              <EssayWritingForm />
            </div>
            <PostList type="essay" userName={userName} />
          </>
        );
      default:
        return (
          <>
            <div className={`form-container ${showForm ? 'expanded' : ''}`}>
              <PictureDescriptionForm />
            </div>
            <PostList type="picture" userName={userName} />
          </>
        );
    }
  };

  return (
    <div>
      <nav>
        <button 
          className={selectedTab === 'picture' ? 'selected' : ''} 
          onClick={() => setSelectedTab('picture')}
        >
          Picture Description
        </button>
        <button 
          className={selectedTab === 'email' ? 'selected' : ''} 
          onClick={() => setSelectedTab('email')}
        >
          Email Response
        </button>
        <button 
          className={selectedTab === 'essay' ? 'selected' : ''} 
          onClick={() => setSelectedTab('essay')}
        >
          Essay Writing
        </button>
      </nav>
      <button className='show-form-button' onClick={toggleForm}>
        {showForm ? 'Hide Form' : 'Add New Post'}
      </button>
      {userName ? (
        <div className="auth-section">
        <span className="welcome-message">Welcome, {userName}!</span>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    ) : (
        <div className="auth-buttons">
          <button className="login-button" onClick={() => setShowLoginModal(true)}>
            Login
          </button>
          <button className="register-button" onClick={() => setShowRegisterModal(true)}>
            Register
          </button>
        </div>
      )}
      <div>{renderTabContent()}</div>
      <LoginModal 
        show={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        onLoginSuccess={onLoginSuccess} // Pass onLoginSuccess to LoginModal
      />
      <RegisterModal 
        show={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)} 
        onLoginSuccess={onLoginSuccess} // Pass onLoginSuccess to RegisterModal
      />
    </div>
  );
};

export default PracticePage;
