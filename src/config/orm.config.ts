import { environment } from '@app/environment';
import { DataSourceOptions, LoggerOptions } from 'typeorm';

const { db } = environment;

const loggerOptions = (environment.db.logging || '').split(',').filter((c) => c.length > 0) as LoggerOptions;

// Check typeORM documentation for more information.
const config: DataSourceOptions = {
  type: 'mysql',
  host: db.host,
  port: Number(db.port),
  username: db.user,
  password: db.password,
  database: db.name,
  charset: 'utf8mb4',
  entities: [],
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  extra: {
    supportBigNumbers: true,
    bigNumberStrings: false,
    dateStrings: false,
    decimalNumbers: true,
  },

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logger: !environment.production ? 'simple-console' : 'file',
  logging: environment.production ? ['error', 'log'] : loggerOptions,

  // allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev
  migrations: [],
};

export = config;
