import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, Edit3, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import EditBlog from './updateBlog';

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const[id,setId]=useState('');
  const navigate = useNavigate();


     const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/blogs/get-blogs`);
        setBlogs(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error.message);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const stripHtml = (html) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  };

  const getExcerpt = (content, maxLength = 200) => {
    const text = stripHtml(content);
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/blogs/${blogId}`);
        setBlogs(blogs.filter(blog => blog._id !== blogId));
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog post');
      }
    }
  };
  const handleEdit = (blogId) => {
    setEdit(true);
    setId(blogId);

    // navigate(`/editblog/${blogId}`, { state: { blogId } });
  }

  return (
     edit ? (
    <EditBlog blogId={id}  setEdit={setEdit} fetchBlogs={fetchBlogs}/>
  ) : (
    <div className="animate-fadeIn bg-black/40 backdrop-blur-sm rounded-3xl p-8"  >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">All Blog Posts</h1>
        <p className="text-white/70">Manage your published content</p>
        <p className="text-white/60 text-sm mt-2">
          {blogs.length} {blogs.length === 1 ? 'post' : 'posts'} total
        </p>
      </div>

      {/* Blog List */}
      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-white/50 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">No blogs found</h3>
            <p className="text-white/60 text-sm">Start by creating your first blog post</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 w-full">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Blog Info */}
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white mb-2">
                    {blog.title}
                  </h2>

                  <p className="text-white/70 text-sm mb-3 leading-relaxed max-w-none">
                    {getExcerpt(blog.content)}
                  </p>

                  <div className="flex items-center space-x-4 text-white/50 text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                    <div className="inline-flex items-center px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full">
                      /blog/{blog.slug}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    onClick={() => navigate(`/blog/${blog.slug}`, { state: { blog } })}
                    className="p-2 text-green-400 hover:text-green-300 hover:bg-green-400/10 rounded-lg transition-all"
                    title="View Blog"
                  >
                    <Eye className="h-6 w-6" />
                  </button>

                  <button
                    onClick={() => handleEdit(blog._id)}
                    className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-all"
                    title="Edit Blog"
                  >
                    <Edit3 className="h-6 w-6" />
                  </button>

                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all"
                    title="Delete Blog"
                  >
                    <Trash2 className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
  );
}

export default AllBlogs;