// Express application — security, CORS, JSON parsing, routes, error handling.
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import env from './config/env.js';
import apiRouter from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser tools (curl, server-to-server) which send no Origin
      if (!origin) return callback(null, true);
      if (env.corsOrigin.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked: ${origin}`));
    },
    methods: ['GET', 'POST'],
    credentials: false,
  }),
);
app.use(express.json({ limit: '32kb' }));

app.use('/api', apiRouter);

// 404 + error handlers (must be last)
app.use(notFound);
app.use(errorHandler);

export default app;
