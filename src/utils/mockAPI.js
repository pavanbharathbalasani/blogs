export const loadPosts = () => {
    const posts = localStorage.getItem('posts');
    return posts ? JSON.parse(posts) : [];
  };
  
  export const savePosts = (posts) => {
    localStorage.setItem('posts', JSON.stringify(posts));
  };
  