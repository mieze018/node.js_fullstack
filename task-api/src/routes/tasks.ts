import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
const router = Router();

type Task = {
	id: number;
	title: string;
	isDone: boolean;
};

// GET /tasks
router.get('/', async (_req: Request, res: Response): Promise<void> => {
	const tasks = await prisma.task.findMany({
		orderBy: { createdAt: 'desc' },
	});
	res.json(tasks);
});

// POST /tasks
router.post('/', (req: Request, res: Response) => {
	const { title } = req.body;

	if (typeof title !== 'string' || title.trim() === '') {
		res.status(400).json({ error: 'タイトルは必須です' });
		return;
	}

	const newTask: Task = {
		id: Date.now(), // 一旦仮でユニークに
		title: title.trim(),
		isDone: false,
	};

	tasks.push(newTask);
	res.status(201).json(newTask);
});

export default router;
