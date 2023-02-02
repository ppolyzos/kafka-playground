import { config } from 'dotenv';

config();

const env = process.env;
export const environment = {
  name: 'playground',
  version: env.CIRCLE_TAG || '1.0.0',
  sha1: env.CIRCLE_SHA1 || undefined,
  production: ['staging', 'production'].includes(env.ENVIRONMENT),
  stage: env.ENVIRONMENT,
  app: env.APP || 'api',
  api: {
    logging: env.API_LOGGING,
  },
};
