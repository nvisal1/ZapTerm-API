import { ProjectStore } from './datastore';
import { Project } from './types/project';\
import * as shell from 'shelljs';

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
    name: string,
    url: string,
    description: string,
    authorId: string,
    thumbnail: string,
    directoryName: string,
    port: string,
    frameworkId: string,
}): Promise<void> {
    await getDataStore().insertEnvironment({
        port: params.port,
        directoryName: params.directoryName,
        frameworkId: params.frameworkId,
    });
    const project = {
        name: params.name,
        url: params.url,
        authorId: params.authorId,
        description: params.description,
        thumbnail: params.thumbnail,
    };
    await getDataStore().insertProject({
        project: project,
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
    id: string,
    name: string,
    url: string,
    description: string,
    authorId: string,
    thumbnail: string,
    directoryName: string,
    port: string,
    frameworkId: string,
    environmentId: string,
}): Promise<void> {

    await getDataStore().editEnvironment({
        port: params.port,
        directoryName: params.directoryName,
        frameworkId: params.frameworkId,
        id: params.environmentId,
    });
    const project = {
        id: params.id,
        name: params.name,
        url: params.url,
        authorId: params.authorId,
        description: params.description,
        thumbnail: params.thumbnail,
    };
    await getDataStore().editProject({
        project,
    });
}

export async function deleteUserProject(params: {
    id: string,
}): Promise<void> {
    await getDataStore().deleteProject({
        id: params.id,
    });
}

export async function getUserFavorites(params: {
    userId: string,
}): Promise<Project[]> {
    return await getDataStore().fetchUserFavorites({
        userId: params.userId,
    });
}

export async function removeUserFavorite(params: {
    userId: string,
    projectId: string,
}): Promise<void> {
    await getDataStore().removeFavorite({
        userId: params.userId,
        projectId: params.projectId,
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

export async function buildProject(params: {
    id: string,
}): Promise<{code: string}> {
    const project = await getDataStore().getProject({
        id: params.id,
    });
    const splitUrl = project.url.split('/');
    const filteredPath = splitUrl.filter(split => split.includes('.git'));
    const directoryName = filteredPath[0].replace('.git', '');
    const framework = 'angular';
    const startCommand = 'ng serve --host 0.0.0.0';
    // tslint:disable-next-line:max-line-length
    const code = await shell.exec(`docker build --build-arg framework=${framework} --build-arg gitURL=${project.url} --build-arg directoryName=${directoryName} -t project --file ./projectDockerfile .`);
    await shell.exec(`docker run --name project -d -p 8080:8088/tcp -p 4100:4000/tcp -p 8000:4200/tcp project:latest ${startCommand}`);
    return {code};
}

export async function destroyProject(params: {

}): Promise<void> {
    // Stop container
    await shell.exec(`docker container stop project:latest`);
    // Remove container
    await shell.exec(`docker container rm --force project`);
    // Remove image
    await shell.exec(`docker rmi project`);
    // Clean up cache
    await shell.exec(`docker system prune -af`);
}

function getDataStore() {
    return ProjectStore.getInstance();
}

