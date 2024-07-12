import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentSection from './CommentSection'; // Import component CommentSection
import './PostList.css'; // Import CSS file
import config from '../../config'; // Import config file

const PostList = ({ type, userName }) => { // Added userName prop
  const [posts, setPosts] = useState([]);
  const page = 1;
  const [pageSize, setPageSize] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visiblePostId, setVisiblePostId] = useState(null); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/GetPosts?pageNumber=${page}&pageSize=${pageSize}&type=${type}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [pageSize, type]);

  const handleUnhideContent = (postId) => {
    setVisiblePostId(postId); // Set the visible post ID
  };

  const handleLoadMore = async () => {
    setIsSubmitting(true);
    setPageSize((prevPageSize) => prevPageSize + 1);
    setIsSubmitting(false);
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h3>{post.userName}: {post.title}</h3>
          {visiblePostId !== post.id ? (
            <p className='content-hidden'> Start Timer to display the content </p>
          ) : type === 'Picture' ? (
            <>
              <img src={post.content} alt={post.title} className="post-image" />
              <p className='requirement-description'>{post.requestDescription}</p>
            </>
          ) : type === 'Email' ? (
            <>
              <p>{post.content}</p>
              <p>{post.requestDescription}</p>
            </>
          ) : type === 'Essay' ? (
            <p>{post.requestDescription}</p>
          ) : null}
          <CommentSection comments={post.comments} postId={post.id} userName={userName} onUnhideContent={handleUnhideContent}/> {/* Pass userName to CommentSection */}
        </div>
      ))}
      <button onClick={handleLoadMore} disabled={isSubmitting}>
        {isSubmitting ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
};

export default PostList;
