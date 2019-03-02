import { MySql } from '../drivers/sql';
import { UserDataStore } from './interfaces/UserDataStore';
import * as mysql from 'mysql';
const util = require('util');

export class UserStore implements UserDataStore {
    private static instance: UserDataStore;
    private connection: mysql.Connection;

    private constructor() {
        this.connection = MySql.getConnection();
        this.connection.query = util.promisify(this.connection.query);
    }

    static getInstance(): UserDataStore {
        if (this.instance) {
            this.instance = new UserStore();
        }
        return this.instance;
    }

    async getUser(params: {
        id: string;
    }): Promise<any> {
        const result = await this.connection.query({
            sql: 'SELECT * FROM `Users` WHERE id = ?',
            values: [params.id],
        });
        return result;
    }
}
