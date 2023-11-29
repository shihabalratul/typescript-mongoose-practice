/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFound } from './app/middlewares/notFound';
import router from './app/routes';

const app = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/', router);

const test = (req: Request, res: Response) => {
    const a = 10;
    res.send(a);
};

app.get('/', test);

// Error handling
app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;
