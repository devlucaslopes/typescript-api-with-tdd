import { createConnection, getConnection } from 'typeorm';

export const TypeORMHelper = {
  async connect(): Promise<void> {
    await createConnection();
  },

  async disconnect(): Promise<void> {
    await getConnection().close();
  },

  async clear(): Promise<void> {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async entity => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`TRUNCATE TABLE ${entity.tableName}`);
    });
  },
};
