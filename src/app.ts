
import express, { Application,} from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import router from './app/routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

//application StudentRoutes
app.use('/api/v1',router);


//error handlere
app.use(globalErrorHandler)

export default app;
