import React, { useState, useEffect } from 'react';
import withAuth from '@/utils/withAuth';
import { NextPage } from 'next';
import { UserRole } from '@/enums/UserRole';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../services/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';

const ManageBlogs: NextPage = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', author: '' });
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const { role } = useAuth();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const router = useRouter();

  useEffect(() => {
    if (role !== UserRole.ADMIN) {
      router.push('/');
    } else {
      const fetchBlogs = async () => {
        const data = await getBlogs();
        setBlogs(data);
      };
      fetchBlogs();
    }
  }, [role, router]);

  useEffect(() => {
    if (editingBlog) {
      setNewBlog({
        title: editingBlog.title,
        content: editingBlog.content,
        author: editingBlog.author,
      });
    } else {
      setNewBlog({ title: '', content: '', author: '' });
    }
  }, [editingBlog]);

  const handleCreate = async () => {
    if (token) {
      await createBlog(token, newBlog);
      setNewBlog({ title: '', content: '', author: '' });
      const data = await getBlogs();
      setBlogs(data);
    }
  };

  const handleUpdate = async () => {
    if (token && editingBlog) {
      await updateBlog(token, editingBlog.id, newBlog);
      setEditingBlog(null);
      setNewBlog({ title: '', content: '', author: '' });
      const data = await getBlogs();
      setBlogs(data);
    }
  };

  const handleDelete = async (id: number) => {
    if (token) {
      await deleteBlog(token, id);
      const data = await getBlogs();
      setEditingBlog(null)
      setNewBlog({ title: '', content: '', author: '' });
      setBlogs(data);
    }
  };

  return (
    <div>
      <h1>Manage Blogs</h1>
      <div className="blog-form">
        <input
          type="text"
          placeholder="Title"
          value={newBlog.title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newBlog.content}
          onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBlog.author}
          onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
        />
        <div className="blog-form-controls">
          {editingBlog ? (
            <>
              <button onClick={handleUpdate}>Update Blog</button>
              <button onClick={() => setEditingBlog(null)}>Cancel</button>
            </>
          ) : (
            <button onClick={handleCreate}>Create Blog</button>
          )}
        </div>
      </div>
      {blogs.map(blog => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <p><strong>Author: </strong> {blog.author}</p>
          <button onClick={() => setEditingBlog(blog)}>Edit</button>
          <button onClick={() => handleDelete(blog.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default withAuth(ManageBlogs);
