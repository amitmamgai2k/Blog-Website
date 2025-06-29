import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import toast from 'react-hot-toast';


function EditBlog({ blogId,setEdit,fetchBlogs }) {

  console.log(blogId);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    slug: ''
  });
 useEffect(() => {
    if (formData.title) {
      const generatedSlug = formData.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')

      setFormData(prev => ({
        ...prev,
        slug: generatedSlug
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        slug: ''
      }))
    }
  }, [formData.title])


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (newContent) => {
    setFormData({ ...formData, content: newContent });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/api/blogs/${blogId}`, formData);
      toast.success('Blog updated successfully!');

      setEdit(false);
      fetchBlogs();
    } catch (error) {
      toast.error('Failed to update blog');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-white border-2 border-gray-800  rounded-xl shadow-x3l">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>

      <input
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Blog Title"
        className="w-full p-2 mb-4 rounded border border-gray-800"
      />

      <input
        name="slug"
        value={formData.slug}
        onChange={handleInputChange}
        placeholder="Blog Slug"
        className="w-full p-2 mb-4 rounded border border-gray-800"
      />

      <Editor
        apiKey="lqyumggpkrelza6tflquq6thej7oe78csnspic3l3pvboeec"
        value={formData.content}
        onEditorChange={handleContentChange}
        init={{
          height: 300,
          menubar: false,
          skin: 'oxide-dark',
          content_css: 'dark',
          plugins: [
            'advlist autolink lists link image charmap preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
          block_formats: 'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3',
        }}
      />

      <button onClick={handleUpdate} className="mt-4 bg-blue-600 px-4 py-2 text-white rounded">
        Update Blog
      </button>
    </div>
  );
}

export default EditBlog;
