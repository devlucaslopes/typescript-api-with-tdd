import 'reflect-metadata';
import 'dotenv/config';

import { TypeORMHelper } from '@/infra/typeorm/helpers/TypeORMHelper';

TypeORMHelper.connect().then(async () => {
  const { app } = await import('./config/app');

  app.listen(3333, () => {
    console.log('⚡️ Server started on port 3333!');
  });
});
