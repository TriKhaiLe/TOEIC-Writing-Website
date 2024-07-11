import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config'; // Import config file

const EssayWritingForm = ({onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000); // Reset message after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set isSubmitting to true when form is submitted
    try {
      // Prepare post data
      const postData = {
        title,
        description,
        type: 'Essay',
        userName: localStorage.getItem('userName')
      };

      // Send post data to backend
      await axios.post(`${config.apiUrl}/CreatePost`, postData);
      
      // Thông báo thành công
      setMessage('Post created successfully!');

      // Gọi callback để thêm post mới vào danh sách
      onPostCreated();

      // Clear form
      setTitle('');
      setDescription('');

    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false); // Set isSubmitting to false after post creation
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title" 
        required 
      />
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description" 
        required 
      ></textarea>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default EssayWritingForm;
