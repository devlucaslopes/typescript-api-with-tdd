import 'reflect-metadata';

import { createConnection } from 'typeorm';

createConnection().then(async () => {
  const { app } = await import('./config/app');

  app.listen(3333, () => {
    console.log('⚡️ Server started on port 3333!');
  });
});
