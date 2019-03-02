import { ProjectStore } from './datastore';
import { Project } from './types/project';

export function getProject(params: {
    id: string,
}): Promise<Project> {
    return getDataStore().getProject({
        id: params.id,
    });
}

export function getUserProjects(params: {
    authorId: string,
}): Promise<Project> {
    return getDataStore().getUserProjects({
        authorId: params.authorId,
    });
}

function getDataStore() {
    return ProjectStore.getInstance();
}

