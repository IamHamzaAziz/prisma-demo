import { Router, Request, Response } from 'express';
import prisma from '../prisma';

const router = Router();

// create user
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await prisma.user.create({
      data: { name, email }
    });
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// get all users
router.get('/', async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// get one user
router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({
      where: { id },
      include: { posts: true }  // include user's posts
    }
  );
  if (!user) return res.status(404).json({ error: 'not found' });
  res.json(user);
});

// update user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, email } = req.body;
    const user = await prisma.user.update({
      where: { id },
      data: { name, email }
    });
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// delete user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.user.delete({ where: { id }});
    res.json({ ok: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
