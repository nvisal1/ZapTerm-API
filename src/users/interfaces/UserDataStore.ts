export interface UserDataStore {
    getUser(params: {
        id: string;
    }): Promise<any>;
}

