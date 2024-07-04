import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommentSection.css'; // Import CSS file

const CommentSection = ({ comments, postId }) => {
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState(comments);
  const [userName, setUserName] = useState('');
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isTimerStarted, setIsTimerStarted] = useState(false);

  useEffect(() => {
    // Giả định rằng thông tin người dùng đã được lưu trữ trong localStorage khi đăng nhập
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartTimer = () => {
    setTimer(0);
    setIsRunning(true);
    setIsTimerStarted(true);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    // Stop the timer
    setIsRunning(false);

    // Format the timer into HH:MM:SS
    const formattedTime = new Date(timer * 1000).toISOString().substr(11, 8);

    const newCommentObj = {
      id: Date.now(),
      content: `${newComment} (Time: ${formattedTime})`,
      user: userName,
    };
    setCommentList([...commentList, newCommentObj]);
    setNewComment('');
    setIsTimerStarted(false); // Enable the start button again

    // Nếu có API thực, sử dụng API này
    /*
    try {
      const response = await axios.post(`/api/posts/${postId}/comments`, { content: `${newComment} (Time: ${formattedTime})`, user: userName });
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
        <button type="submit" disabled={!isTimerStarted}>Add Comment (Time: {new Date(timer * 1000).toISOString().substr(11, 8)})</button>
        <button type="button" onClick={handleStartTimer} disabled={isTimerStarted}>
          Start Timer
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
