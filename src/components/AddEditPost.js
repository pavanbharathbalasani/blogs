// src/components/AddEditPost.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { loadPosts, savePosts } from '../utils/mockAPI';

const AddEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    date: '',
  });

  useEffect(() => {
    if (id) {
      const posts = loadPosts();
      const post = posts.find(p => p.id === parseInt(id));
      if (post) setFormData(post);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const posts = loadPosts();
    if (id) {
      const updatedPosts = posts.map(p => (p.id === parseInt(id) ? formData : p));
      savePosts(updatedPosts);
    } else {
      const newPost = { ...formData, id: Date.now() };
      savePosts([...posts, newPost]);
    }
    navigate('/');
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>
        <label>
          Author:
          <input type="text" name="author" value={formData.author} onChange={handleChange} required />
        </label>
        <label>
          Content:
          <textarea name="content" value={formData.content} onChange={handleChange} required></textarea>
        </label>
        <label>
          Date:
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </label>
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  label {
    margin: 1rem 0;
    font-size: 1.1rem;
  }
  input, textarea {
    width: 100%;
    padding: 0.75rem;
    margin: 0.5rem 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
  textarea {
    resize: vertical;
    min-height: 150px;
  }
`;

const SubmitButton = styled.button`
  width: 100%; 
  max-width:600px;
  padding: 0.75rem;
  margin: 1.5rem 0;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

export default AddEditPost;
