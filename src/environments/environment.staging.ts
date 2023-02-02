import { config } from 'dotenv';
import { environment as baseEnv } from './base.environment';

config();

const stagingEnv = {
  ...baseEnv,
  production: true,
};

export const environment = stagingEnv;
