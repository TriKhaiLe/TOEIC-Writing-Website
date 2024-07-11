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
  const [selectedTab, setSelectedTab] = useState('Picture');
  const [showForm, setShowForm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleLogout = () => {
    localStorage.removeItem('userName');
    onLoginSuccess(''); // Reset the userName in App component
  };

  const handlePostCreated = () => {
    // Increment the refreshKey to trigger a re-render
    setRefreshKey(prevKey => prevKey + 1);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'Picture':
        return (
          <>
            <div className={`form-container ${showForm ? 'expanded' : ''}`}>
              <PictureDescriptionForm onPostCreated={handlePostCreated} />
            </div>
            <PostList key={refreshKey} type="Picture" userName={userName} />
          </>
        );
      case 'Email':
        return (
          <>
            <div className={`form-container ${showForm ? 'expanded' : ''}`}>
              <EmailResponseForm onPostCreated={handlePostCreated} />
            </div>
            <PostList key={refreshKey} type="Email" userName={userName} />
          </>
        );
      case 'Essay':
        return (
          <>
            <div className={`form-container ${showForm ? 'expanded' : ''}`}>
              <EssayWritingForm onPostCreated={handlePostCreated} />
            </div>
            <PostList key={refreshKey} type="Essay" userName={userName} />
          </>
        );
      default:
        return (
          <>
            <div className={`form-container ${showForm ? 'expanded' : ''}`}>
              <PictureDescriptionForm onPostCreated={handlePostCreated} />
            </div>
            <PostList key={refreshKey} type="Picture" userName={userName} />
          </>
        );
    }
  };

  return (
    <div>
      <nav>
        <button 
          className={selectedTab === 'Picture' ? 'selected' : ''} 
          onClick={() => setSelectedTab('Picture')}
        >
          Picture Description
        </button>
        <button 
          className={selectedTab === 'Email' ? 'selected' : ''} 
          onClick={() => setSelectedTab('Email')}
        >
          Email Response
        </button>
        <button 
          className={selectedTab === 'Essay' ? 'selected' : ''} 
          onClick={() => setSelectedTab('Essay')}
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
