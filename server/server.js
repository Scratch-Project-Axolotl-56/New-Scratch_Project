import path from 'path';
import express from 'express';
import wordRouter from './routes/words.js';

const app = express();
app.use(express.json());

app.use(express.static(path.resolve(import.meta.dirname, 'build')));
app.use('/api/words', wordRouter);

app.listen(3000, () => {
  console.log('👌👌👌👌 Server running on port 3000');
});
