import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommentSection.css'; // Import CSS file
import config from '../../config'; // Import config file

const CommentSection = ({ comments, postId, userName, onUnhideContent }) => { // Add userName prop
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState(comments);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false); // State for comment visibility
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    onUnhideContent(postId);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    setIsRunning(false);
    setIsSubmitting(true); // Set isSubmitting to true when form is submitted
    const formattedTime = new Date(timer * 1000).toISOString().substr(11, 8);
    const newCommentObj = {
      postId: postId,
      content: `${newComment} (Time: ${formattedTime})`,
      userName: userName,
    };

    try {
      await axios.post(`${config.apiUrl}/CreateComment`, newCommentObj);
      setCommentList([...commentList, newCommentObj]);
      setNewComment('');
      setIsTimerStarted(false); // Enable the start button again
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false); // Set isSubmitting to false after post creation
    }
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
      <h4>Submissions</h4>
      <button onClick={toggleCommentsVisibility}>
        {isCommentsVisible ? 'Hide' : 'Show'}
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
          placeholder="Start timer and add a Submission here..." 
          rows="5" // Adjust the number of rows as needed
          required 
          disabled={!isTimerStarted || isSubmitting}
        ></textarea>

        <button type="submit" disabled={!isTimerStarted || isSubmitting}>
          {isSubmitting ? 'Submitting...' : `Submit (Time: ${new Date(timer * 1000).toISOString().substr(11, 8)})`}
        </button>
        <button type="button" onClick={handleStartTimer} disabled={isTimerStarted || isSubmitting}>
          Start Timer
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
