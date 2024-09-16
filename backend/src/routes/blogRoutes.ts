import { Router } from 'express';
import { editBlog, getBlogById, getBlogs,  } from '../controllers/blogController';
import { protect } from '../middleware/authMiddleware';

export const blogRoute = Router();
blogRoute.get('/', protect, getBlogs);
blogRoute.put('/', protect, editBlog);
blogRoute.get('/:id', protect, getBlogById);

