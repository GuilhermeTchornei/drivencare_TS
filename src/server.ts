import express, { json } from 'express';
import cors from 'cors';
import mainRouter from './routes/index.routes.js';
import handleApplicationErrors from './middleware/error.middleware.js';

const app = express();
app.use(json());
app.use(cors());

app.use(mainRouter);
app.use(handleApplicationErrors);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}`));
