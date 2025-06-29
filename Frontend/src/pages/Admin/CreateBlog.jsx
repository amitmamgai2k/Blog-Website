import React, { useState, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import toast from 'react-hot-toast'
import axios from 'axios'

function CreateBlog() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    slug: ''
  })

  const [isLoading, setIsLoading] = useState(false)

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
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleContentChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast.error('Please enter a title')
      return
    }

    if (!formData.content.trim()) {
      toast.error('Please enter content')
      return
    }

    setIsLoading(true)

    try {
      console.log('FormData',formData);

   const response = await axios.post(
  `${import.meta.env.VITE_BASE_URL}/api/blogs/create-blog`,
  formData,
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
);

      if (response.status === 201) {
        toast.success('Blog post created successfully!')
        setFormData({ title: '', content: '', slug: '' })
      } else {
        throw new Error('Failed to create blog post')
      }
    } catch (error) {
      toast.error('Error creating blog post: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create New Blog Post</h1>
        <p className="text-white/70">Write and publish your blog content</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-white/90">Blog Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white"
            placeholder="Enter title"
            required
          />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-white/90">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            readOnly
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-gray-300"
          />
        </div>

        {/* TinyMCE Editor */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-white/90">Content *</label>
         <Editor
  apiKey="lqyumggpkrelza6tflquq6thej7oe78csnspic3l3pvboeec"
  value={formData.content}
  init={{
    height: 400,
    menubar: false,
    skin: 'oxide-dark',
    content_css: 'dark',

  }}
  onEditorChange={handleContentChange}
/>

        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition"
          >
            {isLoading ? 'Creating...' : 'Create Blog'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateBlog
