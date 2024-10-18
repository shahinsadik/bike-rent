import express, { Request, Response } from 'express';
import cors from 'cors';
import notFoundRoute from './middlewares/notFoundRoute';
import router from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';

export const app = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

// server route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Bike rental app');
});

// not found route
app.use(notFoundRoute);

// error handling for whole project
app.use(globalErrorHandler);
