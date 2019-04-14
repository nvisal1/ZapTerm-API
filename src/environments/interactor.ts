import { Environment } from './types/environment';
import { EnvironmentStore } from './datastore';

export function startTerminal() {

}

export async function getSingleEnvironment(params: {
    id: string,
}): Promise<Environment> {
    return await getDataStore().getEnvironment({
        id: params.id,
    });
}

export async function fetchUserEnvironments(params: {
    authorId: string,
}): Promise<Environment[]> {
    return await getDataStore().getUserEnvironments({
        authorId: params.authorId,
    });
}

export async function fetchUserEnvironmentCount(params: {
    authorId: string,
}): Promise<{count: number}> {
    const count =  await getDataStore().getUserEnvironmentCount({
        authorId: params.authorId,
    });
    return {count};
}

export async function searchAllEnvironments(params: {
    docker: boolean,
    git: boolean,
    node: boolean,
    text: string,
}): Promise<Environment[]> {
    return await getDataStore().searchEnvironments({
        docker: params.docker,
        git: params.git,
        node: params.node,
        text: params.text,
    });
}

export async function insertNewEnvironment(params: {
    environment: Environment,
}): Promise<void> {
    await getDataStore().insertEnvironment({
        environment: params.environment,
    });
}

export async function editUserEnvironment(params: {
    environment: Environment,
}): Promise<void> {
    await getDataStore().editEnvironment({
        environment: params.environment,
    });
}

export async function deleteUserEnvironment(params: {
    id: string,
}): Promise<void> {
    await getDataStore().deleteEnvironment({
        id: params.id,
    });
}

function getDataStore() {
    return EnvironmentStore.getInstance();
}
