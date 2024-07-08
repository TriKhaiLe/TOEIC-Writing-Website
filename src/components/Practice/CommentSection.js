import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommentSection.css'; // Import CSS file

const CommentSection = ({ comments, postId, userName }) => { // Add userName prop
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState(comments);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false); // State for comment visibility

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

  const toggleCommentsVisibility = () => {
    setIsCommentsVisible((prevState) => !prevState);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      setNewComment((prevComment) => prevComment.substring(0, start) + "\t" + prevComment.substring(end));
      e.target.selectionStart = e.target.selectionEnd = start + 1;
    }
  };

  return (
    <div className="comment-section">
      <h4>Comments</h4>
      <button onClick={toggleCommentsVisibility}>
        {isCommentsVisible ? 'Hide Comments' : 'Show Comments'}
      </button>
      {isCommentsVisible && (
        <ul>
          {commentList.map((comment) => (
            <li key={comment.id}>
              <strong>{comment.userName}:</strong>
              <pre>{comment.content}</pre> {/* Use <pre> to preserve formatting */}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleAddComment}>
        <textarea 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)} 
          onKeyDown={handleKeyDown} 
          placeholder="Start timer and add a comment" 
          rows="5" // Adjust the number of rows as needed
          required 
          disabled={!isTimerStarted}
        ></textarea>

        <button type="submit" disabled={!isTimerStarted}>Add Comment (Time: {new Date(timer * 1000).toISOString().substr(11, 8)})</button>
        <button type="button" onClick={handleStartTimer} disabled={isTimerStarted}>
          Start Timer
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
