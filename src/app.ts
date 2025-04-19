import express, { Application } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/students/student.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

//application StudentRoutes
app.use('/api/v1/students', StudentRoutes);

export default app;
