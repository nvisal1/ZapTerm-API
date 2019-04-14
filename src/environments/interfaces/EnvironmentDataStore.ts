import { Environment } from '../types/environment';

export interface EnvironmentDataStore {
    searchEnvironments(params: {
        docker: boolean;
        git: boolean;
        node: boolean;
        text: string;
    }): Promise<any>;
    getUserEnvironments(params: {
        authorId: string;
    }): Promise<any>;
    insertEnvironment(params: {
        environment: Environment,
    }): Promise<void>;
    editEnvironment(params: {
        environment: Environment;
    }): Promise<void>;
    deleteEnvironment(params: {
        id: string;
    }): Promise<void>;
    getEnvironment(params: {
        id: string;
    }): Promise<any>;
    getUserEnvironmentCount(params: {
        authorId: string;
    }): Promise<any>;
}
