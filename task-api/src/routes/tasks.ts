import { Router, Request, Response } from 'express';
const router = Router();

type Task = {
	id: number;
	title: string;
	isDone: boolean;
};

let tasks: Task[] = [
	{ id: 1, title: '買い物', isDone: false },
	{ id: 2, title: '記事執筆', isDone: true },
];

// GET /tasks
router.get('/', (_req: Request, res: Response) => {
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
