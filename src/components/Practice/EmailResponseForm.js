import React, { useState } from 'react';
import axios from 'axios';
import config from '../../config'; // Import config file

const EmailResponseForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare post data
      const postData = {
        title,
        content,
        description,
        type: 'Email',
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
      setContent('');
      setDescription('');

    } catch (error) {
      console.error('Error creating post:', error);
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
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        placeholder="Email Content" 
        required 
      ></textarea>
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description" 
        required 
      ></textarea>
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default EmailResponseForm;
