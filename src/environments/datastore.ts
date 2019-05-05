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
        if (!this.instance) {
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
        console.log(result);
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

    async insertEnvironment(params: {
        environment: Environment,
    }): Promise<void> {
        await this.connection.query({
            sql: 'INSERT INTO `Environments` (port, directoryName, frameworkId) VALUES (?, ?, ?)',
            values: [
                params.environment.port,
                params.environment.directoryName,
                params.environment.frameworkId,
            ],
        });
    }

    async editEnvironment(params: {
        environment: Environment;
    }): Promise<void> {
        console.log(params.environment);
        await this.connection.query({
            sql: 'UPDATE `Environments` SET port = ?, directoryName = ?, frameworkId = ?, id = ?',
            values: [
                params.environment.port,
                params.environment.directoryName,
                params.environment.frameworkId,
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

        return result[0];
    }

    async getUserEnvironmentCount(params: {
        authorId: string;
    }): Promise<any> {
        const result = await this.connection.query({
            sql: 'SELECT COUNT(authorId) FROM `Environments` WHERE authorId = ?',
            values: [params.authorId],
        });
        return result[0]['COUNT(authorId)'];
    }
}
