import cookieParser from 'cookie-parser';
import cors from 'cors';

import dotenv from 'dotenv';
import express from 'express';
import AuthMiddleware from './middlewares/AuthMiddleware.js';
import ErrorMiddleware from './middlewares/ErrorMiddleware.js';
import AuthRouter from './routes/AuthRouter.js';
import BookmarkRouter from './routes/BookmarkRouter.js';

dotenv.config();

const PORT = process.env.BACKEND_DOCKER_PORT || 5000;
const app = new express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:5001' }));

app.use('/api/auth', AuthRouter);
app.use('/api/bookmarks', AuthMiddleware, BookmarkRouter);

app.use(ErrorMiddleware);

app.listen(PORT, () => {
  console.log('Server on', PORT);
});
