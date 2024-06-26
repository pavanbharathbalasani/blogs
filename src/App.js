import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import BlogPostList from './components/BlogPostList';
import BlogPost from './components/BlogPost';
import AddEditPost from './components/AddEditPost';
import './styles/animations.css'; // Import CSS for animations

// Main application component
const App = () => {
  return (
    <Router>
      <GlobalStyle /> {/* Apply global styles */}
      <Nav>
        <Title>Blogging Platform</Title>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/new">Add New Post</NavLink>
        </NavLinks>
      </Nav>
      <AnimatedRoutes /> {/* Render animated routes */}
    </Router>
  );
};

// Component to handle route transitions with animations
const AnimatedRoutes = () => {
  const location = useLocation(); // Get the current location

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<BlogPostList />} /> {/* Route for the blog post list */}
          <Route path="/post/:id" element={<BlogPost />} /> {/* Route for viewing a single blog post */}
          <Route path="/edit/:id" element={<AddEditPost />} /> {/* Route for editing a blog post */}
          <Route path="/new" element={<AddEditPost />} /> {/* Route for adding a new blog post */}
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

// Styled component for the navigation bar
const Nav = styled.nav`
  background: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

// Styled component for the site title
const Title = styled.h1`
  margin: 0;
`;

// Styled component for the navigation links container
const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

// Styled component for each navigation link
const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default App;
