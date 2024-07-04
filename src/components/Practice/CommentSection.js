import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommentSection.css'; // Import CSS file

const CommentSection = ({ comments, postId }) => {
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState(comments);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Giả định rằng thông tin người dùng đã được lưu trữ trong localStorage khi đăng nhập
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    const newCommentObj = {
      id: Date.now(),
      content: newComment,
      user: userName
    };
    setCommentList([...commentList, newCommentObj]);
    setNewComment('');

    // Nếu có API thực, sử dụng API này
    /*
    try {
      const response = await axios.post(`/api/posts/${postId}/comments`, { content: newComment, user: userName });
      setCommentList([...commentList, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
    */
  };

  return (
    <div className="comment-section">
      <h4>Comments</h4>
      <ul>
        {commentList.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.user}:</strong> {comment.content}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddComment}>
        <input 
          type="text" 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)} 
          placeholder="Add a comment" 
          required 
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
