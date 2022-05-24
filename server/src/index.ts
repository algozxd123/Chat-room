import dotenv from 'dotenv-safe';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from '@src/routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
