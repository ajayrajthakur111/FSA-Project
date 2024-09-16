import { Request, response, Response } from 'express';
import Blog from '../models/Blog';
import mongoose from 'mongoose';

export const getBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find()
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch blogs' });
    }
};


export const getBlogById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username } = req.query;
        console.log("id", id, "username", username)
        const currentTime = new Date();

        const accessBlock = await Blog.findById(id);
        console.log("accessBlock", accessBlock)
        if (accessBlock?.isLocked && (accessBlock?.lockedBy !== null && accessBlock?.lockedBy?.toString() !== username?.toString())) {
            return res.status(403).json({ message: 'You do not have permission to edit this blog' })
        }
        else {
            const blog = await Blog.findByIdAndUpdate(
                id,
                {
                    isLocked: true,
                    lockedAt: currentTime,
                    lockedBy:username
                },
                { new: true }
            );
            if (!blog) return res.status(404).json({ message: 'Blog not found' });
            setTimeout(async () => {
                await Blog.findByIdAndUpdate(
                    id,
                    { isLocked: false, lockedAt: null },
                    { new: true }
                );
            }, 30 * 60 * 1000);
            return res.json({
                blog
            });
        }
    } catch (error) {
        console.error("Error in getBlogById:", error);
        res.status(500).json({ message: 'Failed to lock blog' });
    }
};


export const editBlog = async (req: Request, res: Response) => {
    const { id, content, username } = req.body;
    console.log("firstsddsdff", id, username)
    try {
        const blog = await Blog.findByIdAndUpdate(id,
            {
                content: content,
                lastEditedBy: username,
                isLocked: false,
                lockedBy: username,
                lockedAt: null
            }
        );
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        return res.json({ message: "succesfully updated blog" })
    } catch (error) {
        res.status(500).json({ message: 'Failed to edit blog' });
    }
};
