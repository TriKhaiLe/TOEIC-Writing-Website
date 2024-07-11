import React, { useState, useRef } from 'react';
import axios from 'axios';
import config from '../../config'; // Import config file

const PictureDescriptionForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      try {
        console.log('Upload Preset:', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
        console.log('Cloudinary URL:', process.env.REACT_APP_CLOUDINARY_URL);
  
        // Upload image to Cloudinary
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET); // Use environment variable

        const response = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData); // Use environment variable
        const cloudinaryUrl = response.data.secure_url;

        // Prepare post data
        const postData = {
          title,
          content: cloudinaryUrl, // Use the Cloudinary URL as the content
          description,
          type: 'Picture',
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
        setImage(null);
        setImageUrl('');
        setDescription('');
        fileInputRef.current.value = null;

      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        setImage(file);
        setImageUrl(URL.createObjectURL(file));
      }
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <form onSubmit={handleSubmit} onPaste={handlePaste}>
      <div>(You can paste a picture on text box)</div>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title" 
        required 
      />
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange} 
        required={!image}
        placeholder="Or you can paste an image here"
      />
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Preview" width="200" />
          <button type="button" onClick={handleRemoveImage}>Remove Image</button>
        </div>
      )}
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

export default PictureDescriptionForm;
