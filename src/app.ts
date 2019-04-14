import { MySql } from'./drivers/sql';
import { Express } from './drivers/express';
import * as dotenv from 'dotenv';
dotenv.config();

MySql.build();
Express.initExpress();
