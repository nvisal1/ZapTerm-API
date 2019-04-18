import { FrameworkDataStore } from './interfaces/FrameworkDataStore';
import * as mysql from 'mysql';
import { MySql } from '../drivers/sql';
const util = require('util');

export class FrameworkStore implements FrameworkDataStore {

    private static instance: FrameworkDataStore;
    private connection: mysql.Connection;

    private constructor() {
        this.connection = MySql.getConnection();
        this.connection.query = util.promisify(this.connection.query);
    }

    static getInstance(): FrameworkDataStore {
        if (!this.instance) {
            this.instance = new FrameworkStore();
        }
        return this.instance;
    }

    async getAllFrameworks(): Promise<any> {
        const results = await this.connection.query({
            sql: 'SELECT * FROM `Frameworks`',
        });
        return results;
    }
}
