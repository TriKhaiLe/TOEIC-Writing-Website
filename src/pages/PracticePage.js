import React, { useState } from 'react';
import PostList from '../components/Practice/PostList';
import PictureDescriptionForm from '../components/Practice/PictureDescriptionForm';
import EmailResponseForm from '../components/Practice/EmailResponseForm';
import EssayWritingForm from '../components/Practice/EssayWritingForm';
import './PracticePage.css'; // Import file CSS

const PracticePage = () => {
  const [selectedTab, setSelectedTab] = useState('picture');
  const [showForm, setShowForm] = useState(false);

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'picture':
        return (
          <>
            {showForm && <PictureDescriptionForm />}
            <PostList type="picture" />
          </>
        );
      case 'email':
        return (
          <>
            {showForm && <EmailResponseForm />}
            <PostList type="email" />
          </>
        );
      case 'essay':
        return (
          <>
            {showForm && <EssayWritingForm />}
            <PostList type="essay" />
          </>
        );
      default:
        return (
          <>
            {showForm && <PictureDescriptionForm />}
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
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add New Post'}
      </button>
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default PracticePage;
