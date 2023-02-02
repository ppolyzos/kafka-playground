import { config } from 'dotenv';
import { environment as baseEnv } from './base.environment';

config();

export const environment = baseEnv;
