import { User } from '../types/User';

export interface UserDataStore {
    getUser(params: {
        id: string;
    }): Promise<any>;
    getUserByUsername(params: {
        username: string;
    }): Promise<any>;
    searchUsers(params: {
        text: string;
    }): Promise<any>;
    insertUser(params: {
        user: User;
    }): Promise<void>;
    editUser(params: {
        user: User,
    }): Promise<void>;
    deleteUser(params: {
        id: string;
    }): Promise<void>;
    addToFavorites(params: {
        userId: string,
        projectId: string,
    }): Promise<void>;
}

