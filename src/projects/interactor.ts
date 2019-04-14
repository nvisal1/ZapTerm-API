import { ProjectStore } from './datastore';
import { Project } from './types/project';

export function getProject(params: {
    id: string,
}): Promise<Project> {
    return getDataStore().getProject({
        id: params.id,
    });
}

export async function getUserProjects(params: {
    authorId: string,
}): Promise<Project> {
    return getDataStore().getUserProjects({
        authorId: params.authorId,
    });
}

export async function insertNewProject(params: {
    project: Project,
}): Promise<void> {
    await getDataStore().insertProject({
        project: params.project,
    });
}

function getDataStore() {
    return ProjectStore.getInstance();
}

