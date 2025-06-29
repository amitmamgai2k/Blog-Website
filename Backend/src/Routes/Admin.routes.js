
import express from 'express';
import { createBlog , getBlogs, deleteBlog,updateBlog} from '../Controllers/Admin.controller.js';

const router = express.Router();

// Route to create a blog post (Admin only)
router.post('/create-blog', createBlog);
router.get('/get-blogs',getBlogs)
router.delete('/:id',deleteBlog);
router.put('/:id',updateBlog);

export default router;
