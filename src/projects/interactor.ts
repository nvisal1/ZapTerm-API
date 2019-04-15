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

export async function searchAllProjects(params: {
    text: string,
}): Promise<Project[]> {
    return await getDataStore().searchProjects({
        text: params.text,
    });
}

export async function editUserProject(params: {
    project: Project,
}): Promise<void> {
    await getDataStore().editProject({
        project: params.project,
    });
}

export async function deleteUserProject(params: {
    id: string,
}): Promise<void> {
    await getDataStore().deleteProject({
        id: params.id,
    });
}

export async function getProjectCount(params: {
    authorId: string,
}): Promise<{count: number}> {
    const count = await getDataStore().getUserProjectCount({
        authorId: params.authorId,
    });
    return {count};
}

function getDataStore() {
    return ProjectStore.getInstance();
}

