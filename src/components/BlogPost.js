// src/components/BlogPost.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loadPosts, savePosts } from '../utils/mockAPI';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const posts = loadPosts();
  const post = posts.find(p => p.id === parseInt(id));

  const handleDelete = () => {
    const updatedPosts = posts.filter(p => p.id !== parseInt(id));
    savePosts(updatedPosts);
    navigate('/');
  };

  if (!post) return <p>Post not found</p>;

  return (
    <PostContainer>
      <Post>
        <h2>{post.title}</h2>
        <p>by {post.author}</p>
        <p>{post.date}</p>
        <Content>{post.content}</Content>
        <ButtonContainer>
          <Button onClick={() => navigate(`/edit/${post.id}`)}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </ButtonContainer>
      </Post>
    </PostContainer>
  );
};

const PostContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const Post = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  margin: 15px; /* Set equal margin on all sides */
  max-width: 800px;
  background-color: #fff; /* Ensure background color for contrast */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional: Add shadow for better appearance */
  border-radius: 8px; /* Optional: Add rounded corners */
`;

const Content = styled.div`
  white-space: pre-wrap; /* Handle line breaks */
  word-wrap: break-word; /* Handle long words */
  overflow-wrap: break-word; /* Handle overflow text */
  margin: 1rem 0;
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

export default BlogPost;
