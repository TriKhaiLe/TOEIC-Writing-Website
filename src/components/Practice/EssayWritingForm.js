import React, { useState } from 'react';
import axios from 'axios';
// import './Forms.css'; // Đường dẫn tới CSS file

const EssayWritingForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/posts', {
        title,
        description,
        type: 'essay'
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
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description" 
        required 
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EssayWritingForm;
