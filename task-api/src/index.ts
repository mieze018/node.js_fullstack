import express from 'express';
import tasksRouter from './routes/tasks';

const app = express();
app.use(express.json());

app.use('/tasks', tasksRouter);

app.listen(3003, () => {
	console.log('Server started on http://localhost:3003');
});
