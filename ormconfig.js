
require("dotenv/config");

const devConfig = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    logging: false,
    synchroize: true,
    migrationsRun: true,

    entities: [
      "./src/infra/typeorm/entities/*.ts"
    ],
    migrations: [
      "./src/infra/typeorm/migrations/*.ts"
    ],
    cli: {
      "migrationsDir": "./src/infra/typeorm/migrations"
    }
  }
];

const testConfig = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.POSTGRES_TEST_HOST,
    port: 5432,
    username: process.env.POSTGRES_TEST_USER,
    password: process.env.POSTGRES_TEST_PASSWORD,
    database: process.env.POSTGRES_TEST_DATABASE,
    dropSchema: true,
    logging: false,
    synchroize: true,
    migrationsRun: true,

    entities: [
      "./src/infra/typeorm/entities/*.ts"
    ],
    migrations: [
      "./src/infra/typeorm/migrations/*.ts"
    ],
    cli: {
      "migrationsDir": "./src/infra/typeorm/migrations"
    }
  }
];

const prodConfig = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    logging: false,
    synchroize: true,
    migrationsRun: true,

    entities: [
      "./src/infra/typeorm/entities/*.ts"
    ],
    migrations: [
      "./src/infra/typeorm/migrations/*.ts"
    ],
    cli: {
      "migrationsDir": "./src/infra/typeorm/migrations"
    }
  }
];

if (process.env.NODE_ENV === 'development') {
  module.exports = devConfig;
} else if (process.env.NODE_ENV === 'test') {
  module.exports = testConfig;
} else {
  module.exports = prodConfig;
}


