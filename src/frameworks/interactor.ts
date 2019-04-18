import { Framework } from './types/Framework';
import { FrameworkStore } from './datastore';

export function fetchAllFrameworks(): Promise<Framework[]> {
    return getDataStore().getAllFrameworks();
}

function getDataStore() {
    return FrameworkStore.getInstance();
}