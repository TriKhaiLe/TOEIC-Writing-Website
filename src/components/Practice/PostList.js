import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentSection from './CommentSection'; // Import component CommentSection
import './PostList.css'; // Import CSS file

const PostList = ({ type }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      // Sử dụng dữ liệu giả nếu không có API thực
      const fakePosts = [
        {
          id: 1,
          title: 'Fake Post 1',
          content: 'This is a fake post for type ' + type,
          comments: [
            { id: 1, content: 'This is a fake comment.' },
            { id: 2, content: 'This is another fake comment.' }
          ]
        },
        {
          id: 2,
          title: 'Fake Post 2',
          content: 'This is another fake post for type ' + type,
          comments: [
            { id: 3, content: 'Yet another fake comment.' }
          ]
        },
      ];
      setPosts(fakePosts);

      // Nếu có API thực, sử dụng API này
      /*
      try {
        const response = await axios.get(`/api/posts?type=${type}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      */
    };

    fetchPosts();
  }, [type]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <CommentSection comments={post.comments} postId={post.id} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
