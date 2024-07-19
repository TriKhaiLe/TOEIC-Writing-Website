import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommentSection.css';
import config from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import useSampleSentences from '../../hooks/useSampleSentences';

const CommentSection = ({ comments, postId, userName, onUnhideContent }) => {
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState(comments);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentences, setSentences, classification, setProficiencySum] = useSampleSentences();

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
    setIsSubmitting(true);
    const formattedTime = new Date(timer * 1000).toISOString().substr(11, 8);
    const newCommentObj = {
      postId: postId,
      content: `${newComment} (Time: ${formattedTime})`,
      userName: userName,
      classification: classification
    };

    try {
      await axios.post(`${config.apiUrl}/CreateComment`, newCommentObj);
      setCommentList([...commentList, newCommentObj]);
      setNewComment('');
      setIsTimerStarted(false);

      const sentencesToUpdate = sentences.filter(sentence => newComment.includes(sentence.sentence));
      for (const sentence of sentencesToUpdate) {
        await axios.put(`${config.apiUrl}/UpdateProficiency`, {
          userName: userName,
          sampleSentenceId: sentence.id,
          proficiencyIncrement: 1
        });
        const updatedSentence = { ...sentence, proficiency: sentence.proficiency + 1 };
        setSentences(prev => prev.map(s => (s.id === sentence.id ? updatedSentence : s)));
        
        // Update the proficiency sum
        setProficiencySum(prevSum => prevSum + 1);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
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

  const getBorderClass = (classification) => {
    switch (classification) {
      case 'Inox':
        return 'comment-inox';
      case 'Bronze':
        return 'comment-bronze';
      case 'Gold':
        return 'comment-gold';
      case 'Emerald':
        return 'comment-emerald';
      case 'Ruby':
        return 'comment-ruby';
      case 'Diamond':
        return 'comment-diamond';
      default:
        return 'comment-inox';
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
          {commentList.map((comment) => {
            return (
              <li key={comment.id} className={getBorderClass(comment.classification)}>
                <strong>{comment.userName}:</strong>
                <pre>{comment.content}</pre>
              </li>
            );
          })}
        </ul>
      )}

      <form onSubmit={handleAddComment}>
        <textarea 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)} 
          onKeyDown={handleKeyDown} 
          placeholder="Start timer and add a Submission here..." 
          rows="5"
          required 
          disabled={!isTimerStarted || isSubmitting}
        ></textarea>

        <button type="submit" disabled={!isTimerStarted || isSubmitting}>
          <FontAwesomeIcon className="icon-paper-plane" icon={faPaperPlane} />
          {isSubmitting ? 'Submitting...' : `Submit (Time: ${new Date(timer * 1000).toISOString().substr(11, 8)})`}
        </button>
        <button type="button" onClick={handleStartTimer} disabled={isTimerStarted || isSubmitting}>
          <FontAwesomeIcon className='icon-timer' icon={faStopwatch} />
          Start Timer
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
