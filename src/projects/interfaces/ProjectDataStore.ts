import { Project } from '../types/project';

export interface ProjectDataStore {
    getProject(params: {
        id: string;
    }): Promise<any>;
    getUserProjects(params: {
        authorId: string;
    }): Promise<any>;
}
