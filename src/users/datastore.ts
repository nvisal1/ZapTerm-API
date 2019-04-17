import { MySql } from '../drivers/sql';
import { UserDataStore } from './interfaces/UserDataStore';
import * as mysql from 'mysql';
import { User } from './types/User';
const util = require('util');

export class UserStore implements UserDataStore {

    private static instance: UserDataStore;
    private connection: mysql.Connection;

    private constructor() {
        this.connection = MySql.getConnection();
        this.connection.query = util.promisify(this.connection.query);
    }

    static getInstance(): UserDataStore {
        if (!this.instance) {
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
        return result[0];
    }

    async getUserByUsername(params: {
        username: string,
    }): Promise<any> {
        const result = await this.connection.query({
            sql: 'SELECT * FROM `Users` WHERE username = ?',
            values: [params.username],
        });
        return result[0];
    }

    async searchUsers(params: {
        text: string;
    }): Promise<any> {
        const result = await this.connection.query({
            sql: 'SELECT username jobtype FROM `Users` WHERE name LIKE ? OR username LIKE ? OR email LIKE ? OR jobtype LIKE ? OR bio LIKE ?',
            values: [
                params.text,
                params.text,
                params.text,
                params.text,
                params.text,
            ],
        });
        return result;
    }
    async insertUser(params: {
        user: User;
    }): Promise<void> {
        await this.connection.query({
            sql: 'INSERT INTO `Users` (name, username, email, jobtype, bio, password) VALUES (?, ?, ?, ?, ?, ?)',
            values: [
                params.user.name,
                params.user.username,
                params.user.email,
                params.user.jobType,
                params.user.bio,
                params.user.password,
             ],
        });
    }
    async editUser(params: {
        user: User;
    }): Promise<void> {
        await this.connection.query({
            sql: 'UPDATE `Users` SET name = ?, username = ?, email = ?, jobType = ?, bio = ? WHERE id = ?',
            values: [
                params.user.name,
                params.user.username,
                params.user.email,
                params.user.jobType,
                params.user.bio,
                params.user.id,
            ],
        });
    }
    async deleteUser(params: {
        id: string;
    }): Promise<void> {
        await this.connection.query({
            sql: 'DELETE FROM `Users` WHERE id = ?',
            values: [params.id],
        });
    }
}
