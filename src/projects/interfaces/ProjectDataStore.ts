import { Project } from '../types/project';

export interface ProjectDataStore {
    getProject(params: {
        id: string;
    }): Promise<any>;
}
