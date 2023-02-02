import { config } from 'dotenv';
import { environment as baseEnv } from './base.environment';

config();

const prodEnv = {
  ...baseEnv,
  production: true,
};

export const environment = prodEnv;
