import app from './app';
import 'dotenv/config';

app.listen(3333, () =>
  console.log('> Server started at http://localhost:3333')
);
