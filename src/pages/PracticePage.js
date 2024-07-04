import React, { useState } from 'react';
import PostList from '../components/Practice/PostList';
import PictureDescriptionForm from '../components/Practice/PictureDescriptionForm';
import EmailResponseForm from '../components/Practice/EmailResponseForm';
import EssayWritingForm from '../components/Practice/EssayWritingForm';
import LoginModal from '../components/Authen/LoginModal';
import RegisterModal from '../components/Authen/RegisterModal';
import './PracticePage.css'; // Import file CSS
import './Forms.css'; // Import file CSS

const PracticePage = () => {
    const [selectedTab, setSelectedTab] = useState('picture');
    const [showForm, setShowForm] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
  
    const toggleForm = () => {
      setShowForm(!showForm);
    };
  
    const renderTabContent = () => {
      switch (selectedTab) {
        case 'picture':
          return (
            <>
              <div className={`form-container ${showForm ? 'expanded' : ''}`}>
                <PictureDescriptionForm />
              </div>
              <PostList type="picture" />
            </>
          );
        case 'email':
          return (
            <>
              <div className={`form-container ${showForm ? 'expanded' : ''}`}>
                <EmailResponseForm />
              </div>
              <PostList type="email" />
            </>
          );
        case 'essay':
          return (
            <>
              <div className={`form-container ${showForm ? 'expanded' : ''}`}>
                <EssayWritingForm />
              </div>
              <PostList type="essay" />
            </>
          );
        default:
          return (
            <>
              <div className={`form-container ${showForm ? 'expanded' : ''}`}>
                <PictureDescriptionForm />
              </div>
              <PostList type="picture" />
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
        <div className="auth-buttons">
          <button className="login-button" onClick={() => setShowLoginModal(true)}>
            Login
          </button>
          <button className="register-button" onClick={() => setShowRegisterModal(true)}>
            Register
          </button>
        </div>
        <div>{renderTabContent()}</div>
        <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} />
        <RegisterModal show={showRegisterModal} onClose={() => setShowRegisterModal(false)} />
      </div>
    );
  };
  
  export default PracticePage;
  