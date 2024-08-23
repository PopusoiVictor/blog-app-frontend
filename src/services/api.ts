import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
console.log(api)

export const getBlogs = async () => {
  const response = await api.get('/blogs');
  return response.data;
};

export const getBlogById = async (id: number) => {
  const response = await api.get(`/blogs/${id}`);
  return response.data;
};

export const createBlog = async (token: string, blog: { title: string; content: string; author: string }) => {
  const response = await api.post('/blogs', blog, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateBlog = async (token: string, id: number, blog: { title: string; content: string; author: string }) => {
  const response = await api.put(`/blogs/${id}`, blog, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteBlog = async (token: string, id: number) => {
  await api.delete(`/blogs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
