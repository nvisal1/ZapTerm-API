import { Project } from '../types/project';

export interface ProjectDataStore {
    getProject(params: {
        id: string;
    }): Promise<any>;
    getUserProjects(params: {
        authorId: string;
    }): Promise<any>;
    searchProjects(params: {
        text: string;
    }): Promise<any>;
    insertProject(params: {
        project: Project,
    }): Promise<void>;
    editProject(params: {
        project: Project;
    }): Promise<void>;
    deleteProject(params: {
        id: string;
    }): Promise<void>;
    getUserProjectCount(params: {
        authorId: string;
    }): Promise<any>;
}
