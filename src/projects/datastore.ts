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
        if (!this.instance) {
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
        return result[0];
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
            // tslint:disable-next-line:max-line-length
            sql: 'SELECT Projects.id, Projects.authorId, Users.username, Users.name, Users.email, Projects.url, Projects.name, Projects.description, Projects.thumbnail FROM `Projects` INNER JOIN `Users` ON Projects.authorId = Users.id WHERE Projects.name LIKE ? OR Projects.url LIKE ? OR Projects.description LIKE ? OR Users.name LIKE ? OR Users.email LIKE ? OR Users.username LIKE ?',
            values: [
                params.text,
                params.text,
                params.text,
                params.text,
                params.text,
                params.text,
            ],
        });
        return result;
    }

    async insertProject(params: {
        project: Project,
    }): Promise<void> {
        const id = await this.connection.query({
            sql: 'SELECT id FROM `Environments` WHERE id = (SELECT max(id) FROM `Environments`)',
        });

        await this.connection.query({
            sql: 'INSERT INTO `Projects` (name, url, authorId, description, thumbnail, environmentId) VALUES (?, ?, ?, ?, ?, ?)',
            values: [
                params.project.name,
                params.project.url,
                params.project.authorId,
                params.project.description,
                params.project.thumbnail,
                id[0].id,
            ],
        });
    }

    async insertEnvironment(params: {
        port: string,
        directoryName: string,
        frameworkId: string,
    }): Promise<void> {
        await this.connection.query({
            sql: 'INSERT INTO `Environments` (port, directoryName, frameworkId) VALUES (?, ?, ?)',
            values: [
                params.port,
                params.directoryName,
                params.frameworkId,
            ],
        });
    }

    async editEnvironment(params: {
        port: string,
        directoryName: string,
        frameworkId: string,
        id: string,
    }): Promise<void> {
        await this.connection.query({
            sql: 'UPDATE `Environments` SET port = ?, directoryName = ?, frameworkId = ? WHERE id = ?',
            values: [
                params.port,
                params.directoryName,
                params.frameworkId,
                params.id,
            ],
        });
    }

    async editProject(params: {
        project: Project;
    }): Promise<void> {
        await this.connection.query({
            sql: 'UPDATE `Projects` SET name = ?, url = ?, description = ? WHERE id = ?',
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
            sql: 'DELETE FROM `Projects` WHERE id = ?',
            values: [params.id],
        });
    }

    async getUserProjectCount(params: {
        authorId: string;
    }): Promise<any> {
        const result = await this.connection.query({
            sql: 'SELECT COUNT(authorId) FROM `Projects` WHERE authorId = ?',
            values: [params.authorId],
        });
        return result[0]['COUNT(authorId)'];
    }
}
