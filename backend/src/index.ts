import express, { Request, Response } from 'express';
import { createServer } from 'http';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

const server = createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});