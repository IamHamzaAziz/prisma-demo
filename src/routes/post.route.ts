import { Router, Request, Response } from 'express';
import prisma from "../prisma";

const router = Router();

// create post
router.post('/', async (req: Request, res: Response) => {
    try {
        const { title, content, userId } = req.body;
            const post = await prisma.post.create({
            data: { title, content, userId }
        });
        res.status(201).json(post);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// get all posts
router.get('/', async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit

    const posts = await prisma.post.findMany({
        include: { user: true },  // include user data with each post
        orderBy: { createdAt: 'desc' }, // sort by latest posts first
        take: limit,  // limit for pagination
        skip: skip    // skip for pagination
    });
    res.json(posts);
});

export default router;
