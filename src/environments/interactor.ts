import { Environment } from './types/environment';
import { EnvironmentStore } from './datastore';

export function startTerminal() {

}

export async function insertNewEnvironment(params: {
    environment: Environment,
}): Promise<void> {
    await getDataStore().insertEnvironment({
        environment: params.environment,
    });
}

function getDataStore() {
    return EnvironmentStore.getInstance();
}
