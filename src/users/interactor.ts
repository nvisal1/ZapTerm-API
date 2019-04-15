import { UserStore } from './datastore';
import { User } from './types/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export function getUser(params: {
    id: string;
}): Promise<User> {
    return getDataStore().getUser({
        id: params.id,
    });
}

export async function getToken(params: {
    username: string,
    password: string,
}): Promise<{token: string}> {
    const user = await getDataStore().getUserByUsername({
        username: params.username,
    });

    if (!user) {
        throw Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(params.password, user.password);
    if (!passwordMatch) {
        throw new Error('Incorrect Password');
    }

    const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: {...user, password: null},
        },
        // tslint:disable-next-line:align
        'secret',
    );

    return {token};
}

export async function insertUser(params: {
    user: User,
}): Promise<{token: string}> {
    const passwordHash = await bcrypt.hash(params.user.password, 10);

    await getDataStore().insertUser({
        user: {...params.user, password: passwordHash},
    });

    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: {...params.user, password: null},
    },
        // tslint:disable-next-line:align
        'secret',
    );

    return {token};
}

export async function editUserInfo(params: {
    user: User,
}): Promise<void> {
    await getDataStore().editUser({
        user: params.user,
    });
}
export async function deleteUserInfo(params: {
    id: string,
}): Promise<void> {
    await getDataStore().deleteUser({
        id: params.id,
    });
}

function getDataStore() {
    return UserStore.getInstance();
}
