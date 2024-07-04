import React, { useState } from 'react';
import axios from 'axios';

const EmailResponseForm = () => {
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/posts', {
        title,
        email,
        description,
        type: 'email'
      });
      // Sau khi tạo thành công, làm mới danh sách bài post hoặc thông báo cho người dùng
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
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        required 
      ></textarea>
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description" 
        required 
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EmailResponseForm;
