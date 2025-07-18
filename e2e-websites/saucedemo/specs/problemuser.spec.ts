import { test, expect } from '@playwright/test';

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../envs/.envs.saucedemo') });
