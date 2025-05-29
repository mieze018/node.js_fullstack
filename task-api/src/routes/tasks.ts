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
router.post('/', async (req: Request, res: Response): Promise<void> => {
	const { title } = req.body;

	if (typeof title !== 'string' || title.trim() === '') {
		res.status(400).json({ error: 'タイトルは必須です' });
		return;
	}

	try {
		const newTask = await prisma.task.create({
			data: {
				title: title.trim(),
				user: {
					connect: { id: 1 }, // 認証導入前なので仮にユーザーID=1で固定
				},
			},
		});

		res.status(201).json(newTask);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'サーバーエラー' });
	}
});


export default router;
