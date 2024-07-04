import React, { useState } from 'react';
import axios from 'axios';

const PictureDescriptionForm = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('description', description);

    try {
      await axios.post('/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
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
      <input 
        type="file" 
        onChange={(e) => setImage(e.target.files[0])} 
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

export default PictureDescriptionForm;
