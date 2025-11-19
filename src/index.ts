import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes';
import postRouter from './routes/post.route';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/posts', postRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server on http://localhost:${port}`);
});
