import { MySql } from '../drivers/sql';
import * as mysql from 'mysql';
import { ProjectDataStore } from './interfaces/ProjectDataStore';
const util = require('util');

export class ProjectStore implements ProjectDataStore {
    private static instance: ProjectDataStore;
    private connection: mysql.Connection;

    private constructor() {
        this.connection = MySql.getConnection();
        this.connection.query = util.promisify(this.connection.query);
    }

    static getInstance(): ProjectDataStore {
        if (this.instance) {
            this.instance = new ProjectStore();
        }
        return this.instance;
    }

    async getProject(params: {
        id: string;
    }): Promise<any> {
        const result = await this.connection.query({
            sql: 'SELECT * FROM `Projects` WHERE id = ?',
            values: [params.id],
        });
        return result;
    }

    async getUserProjects(params: {
        authorId: string;
    }): Promise<any> {
        const result = await this.connection.query({
            sql: 'SELECT * FROM `Projects` WHERE authorId = ?',
            values: [params.authorId],
        });
        return result;
    }
}
