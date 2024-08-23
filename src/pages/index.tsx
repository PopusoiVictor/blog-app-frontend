import { useEffect, useState } from 'react';
import { getBlogs } from '../services/api';
import { useAuth } from '@/context/AuthContext';

const HomePage = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      if (isAuthenticated) {
        const data = await getBlogs();
        setBlogs(data);
      }
    };
    fetchBlogs();
  }, [isAuthenticated]);

  return (
    <div>
      <h1>Blog Posts</h1>
      {isAuthenticated ? (
        <ul>
          {blogs.map((blog: any) => (
            <li key={blog.id}>
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>
              <p><strong>Author: </strong> {blog.author}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You need to be logged in to view the blog posts.</p>
      )}
    </div>
  );
};

export default HomePage;
