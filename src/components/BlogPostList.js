import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { loadPosts } from '../utils/mockAPI';

const BlogPostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = loadPosts();
    setPosts(storedPosts);
  }, []);

  return (
    <ListContainer>
      <List>
        {posts.map(post => (
          <ListItem key={post.id} to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
            <p>by {post.author}</p>
            <small>{post.date}</small>
            <Summary>{post.summary}</Summary>
          </ListItem>
        ))}
      </List>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
`;

const ListItem = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 15px 0; /* Equal margin on top and bottom */
  background-color: #fff; /* Ensure background color for contrast */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional: Add shadow for better card appearance */
  border-radius: 8px; /* Optional: Add rounded corners */
  transition: background-color 0.3s;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Summary = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default BlogPostList;
