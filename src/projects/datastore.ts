import { MySql } from '../drivers/sql';
import * as mysql from 'mysql';
import { ProjectDataStore } from './interfaces/ProjectDataStore';
import { Project } from './types/project';
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

    async searchProjects(params: {
        text: string;
    }): Promise<any> {
        const result = await this.connection.query({
            sql: 'SELECT name FROM `Projects` WHERE name LIKE ? OR url LIKE ? OR description LIKE ?',
            values: [
                params.text,
                params.text,
                params.text,
            ],
        });
        return result;
    }

    async editProject(params: {
        project: Project;
    }): Promise<void> {
        await this.connection.query({
            sql: 'UPDATE `Projects` SET name = ?, url = ?, email = ?, description = ? WHERE id = ?',
            values: [
                params.project.name,
                params.project.url,
                params.project.description,
                params.project.id,
             ],
        });
    }

    async deleteProject(params: {
        id: string;
    }): Promise<void> {
        await this.connection.query({
            sql: 'SDELETE FROM `Projects` WHERE id = ?',
            values: [params.id],
        });
    }
}
