import Post from "../Models/Blog.model.js";


export const createBlog = async (req, res) => {
  try {
    const { title, content, slug } = req.body;
    console.log("📥 Blog Data:", title, content, slug);

    if (!title || !content || !slug) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const blog = await Post.create({ title, content, slug });
    res.status(201).json({ success: true, blog });
  } catch (error) {
    console.error("🔥 Blog creation error:", error);

    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: "Slug already exists" });
    }

    res.status(500).json({ success: false, error: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Post.find({});
    res.status(200).json(blogs);
  } catch (error) {
    console.error("🔥 Error fetching blogs:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    await Post.findByIdAndDelete(blogId);
    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("🔥 Error deleting blog:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    console.log("📥 Blog ID:", blogId);

    // Filter out fields that are empty strings
    const rawUpdates = req.body;
    const updates = {};

    for (const key in rawUpdates) {
      if (rawUpdates[key] !== "") {
        updates[key] = rawUpdates[key];
      }
    }

    console.log("📥 Cleaned Updates:", updates);

    const updatedBlog = await Post.findByIdAndUpdate(blogId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    res.status(200).json({ success: true, message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
    console.error("❌ Update Blog Error:", error);

    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: 'Slug already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, error: error.message });
    }

    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

