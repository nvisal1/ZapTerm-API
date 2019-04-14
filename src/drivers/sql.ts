import * as mysql from 'mysql';
import { ResourceError, ResourceErrorReason } from '../errors';

export class MySql {

    private static connection: mysql.Connection;

    private constructor() {}

    static async build(): Promise<void | ResourceError> {
        if (!this.connection) {
            const driver = new MySql();
            driver.connect();
        } else {
            return Promise.reject(
                new ResourceError(
                    'A database connection already exists',
                    ResourceErrorReason.BAD_REQUEST,
                ),
            );
        }
    }

    private async connect(): Promise<void> {
        MySql.connection = mysql.createConnection({
            host : process.env.HOST,
            user : process.env.USERNAME,
            password : process.env.PASSWORD,
            database: process.env.DB,
        });
    }

    async disconnect(): Promise<void> {
        MySql.connection.end();
    }

    static getConnection() {
        return this.connection;
    }
}


