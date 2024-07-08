import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentSection from './CommentSection'; // Import component CommentSection
import './PostList.css'; // Import CSS file

const PostList = ({ type, userName }) => { // Added userName prop
  const [posts, setPosts] = useState([]);
  const page = 1;
  const [pageSize, setPageSize] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://localhost:7184/GetPosts?pageNumber=${page}&pageSize=${pageSize}&type=${type}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [pageSize, type]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          {type === 'Picture' ? (
            <img src={post.content} alt={post.title} className="post-image" />
          ) : (
            <p>{post.content}</p>
          )}
          <CommentSection comments={post.comments} postId={post.id} userName={userName} /> {/* Pass userName to CommentSection */}
        </div>
      ))}
      <button onClick={() => setPageSize((prev) => prev + 1)}>Load More</button>
    </div>
  );
};

export default PostList;
