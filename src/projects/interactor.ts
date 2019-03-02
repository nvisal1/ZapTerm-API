import { ProjectStore } from './datastore';
import { Project } from './types/project';

export function getProject(params: {
    id: string,
}): Promise<Project> {
    return getDataStore().getProject({
        id: params.id,
    });
}

function getDataStore() {
    return ProjectStore.getInstance();
}

