import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import { StatusCodes } from 'http-status-codes';

const app: Application = express();

// parser

app.use(express.json());
app.use(cors());

// application router
// all route
app.use('/api', router);

app.get('/', (req, res) => {
  res.json({ message: 'welcome to my backend project' });
});
app.use(globalErrorHandler);

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    StatusCode: StatusCodes.NOT_FOUND,
    message: 'Route not found',
  });
});
export default app;
