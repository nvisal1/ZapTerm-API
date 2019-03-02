import { UserStore } from './datastore';

export function getUser(params: {
    id: string;
}): Promise<User> {
    return getDataStore().getUser({
        id: params.id,
    });
}

function getDataStore() {
    return UserStore.getInstance();
}
