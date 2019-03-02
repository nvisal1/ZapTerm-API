import { EnvironmentDataStore } from './interfaces/EnvironmentDataStore';
import * as mysql from 'mysql';
import { MySql } from '../drivers/sql';
import { Environment } from './types/environment';
const util = require('util');
export class EnvironmentStore implements EnvironmentDataStore {

    private static instance: EnvironmentDataStore;
    private connection: mysql.Connection;

    private constructor() {
        this.connection = MySql.getConnection();
        this.connection.query = util.promisify(this.connection.query);
    }

    static getInstance(): EnvironmentDataStore {
        if (this.instance) {
            this.instance = new EnvironmentStore();
        }
        return this.instance;
    }

    async searchEnvironments(params: {
        docker: boolean,
        git: boolean,
        node: boolean,
        text: string;
    }): Promise<any> {
        const result = await this.connection.query({
            sql: 'SELECT name FROM `Environments` WHERE docker LIKE ? OR git LIKE ? OR node LIKE ? OR name LIKE ?',
            values: [
                params.docker,
                params.git,
                params.node,
                params.text,
            ],
        });
        return result;
    }

    async getUserEnvironments(params: {
        authorId: string;
    }): Promise<any> {
        const result = await this.connection.query({
            sql: 'SELECT * FROM `Environments` WHERE authorId = ?',
            values: [params.authorId],
        });
        return result;
    }

    async editEnvironment(params: {
        environment: Environment;
    }): Promise<void> {
        await this.connection.query({
            sql: 'UPDATE `Environments` SET docker = ?, git = ?, email = ?, node = ?, scripts = ?, name = ? WHERE id = ?',
            values: [
                params.environment.docker,
                params.environment.git,
                params.environment.node,
                params.environment.scripts,
                params.environment.name,
                params.environment.id,
             ],
        });
    }

    async deleteEnvironment(params: {
        id: string;
    }): Promise<void> {
        await this.connection.query({
            sql: 'DELETE FROM `Environments` WHERE id = ?',
            values: [params.id],
        });
    }

    async getEnvironment(params: {
        id: string;
    }): Promise<any> {
        const result = await this.connection.query({
            sql: 'SELECT * FROM `Environments` WHERE id = ?',
            values: [params.id],
        });
        return result;
    }

    async getUserEnvironmentCount(params: {
        authorId: string;
    }): Promise<any> {
        const result = await this.connection.query({
            sql: 'SELECT COUNT(authorId) FROM `Environments` WHERE authorId = ?',
            values: [params.authorId],
        });
        return result;
    }
}
