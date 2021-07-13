import express from 'express';
import tasksRouter from './routes/tasks.js';
import { promises as fs } from 'fs';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './doc.js';
import cors from 'cors';

const { readFile, writeFile } = fs;

const app = express();
app.use(express.json());
app.use(cors());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/task', tasksRouter);

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, async () => {
  try {
    await readFile('tasks.json');
    console.log('API Started!');
  } catch (error) {
    const initialJson = {
      nextId: 1,
      tasks: [],
    };
    writeFile('tasks.json', JSON.stringify(initialJson))
      .then(() => {
        console.log('API Started and File Created!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
