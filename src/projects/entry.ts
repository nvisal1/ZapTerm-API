import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLInt } from 'graphql';
import { getProject, getUserProjects, insertNewProject, searchAllProjects, editUserProject, deleteUserProject, getProjectCount, buildProject } from './interactor';
import { stringify } from 'querystring';

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        url: {type: GraphQLString},
        description: {type: GraphQLString},
        authorId: {type: GraphQLID},
        thumbnail: {type: GraphQLString },
    }),
});

const ProjectCountType = new GraphQLObjectType({
    name: 'ProjectCount',
    fields: () => ({
        count: {type: GraphQLInt},
    }),
});

export const project = {
    type: ProjectType,
    args: {id: {type: GraphQLID}},
    resolve(parent: any, args: any): any {
        return getProject({
            id: args.id,
        });
    },
};

export const userProjects = {
    type: GraphQLList(ProjectType),
    args: {authorId: {type: GraphQLID}},
    resolve(parent: any, args: any): any {
        return getUserProjects({
            authorId: args.authorId,
        });
    },
};

export const searchProjects = {
    type: GraphQLList(ProjectType),
    args: {
        text: {type: GraphQLString },
    },
    resolve(parent: any, args: any): any {
        return searchAllProjects({
            text: args.text,
        });
    }
}

export const insertProject = {
    type: GraphQLBoolean,
    args: {
        name: {type: GraphQLString},
        url: {type: GraphQLString},
        description: {type: GraphQLString},
        authorId: {type: GraphQLString},
        thumbnail: {type: GraphQLString},
    },
    resolve(parent: any, args: any): any {
        return insertNewProject({
            project: {
                name: args.name,
                url: args.url,
                description: args.description,
                authorId: args.authorId,
                thumbnail: args.thumbnail,
            },
        });
    },
};

export const editProject = {
    type: GraphQLBoolean,
    args: {
        name: {type: GraphQLString},
        url: {type: GraphQLString},
        description: {type: GraphQLString},
        id: {type: GraphQLID },
        thumbnail: {type: GraphQLString},
    },
    resolve(parent: any, args: any): any {
        return editUserProject({
            project: {
                name: args.name,
                url: args.url,
                description: args.description,
                id: args.id,
                thumbnail: args.thumbnail,
            },
        });
    },
};

export const deleteProject = {
    type: GraphQLBoolean,
    args: {
        id: {type: GraphQLID },
    },
    resolve(parent: any, args: any): any {
        return deleteUserProject({
            id: args.id,
        });
    },
};

export const getUserProjectCount = {
    type: ProjectCountType,
    args: {
        authorId: {type: GraphQLID },
    },
    resolve(parent: any, args: any): any {
        return getProjectCount({
            authorId: args.authorId,
        });
    },
};

export const startProject = {
    type: GraphQLBoolean,
    args: {
        id: {type: GraphQLID},
    },
    resolve(parent: any, args: any): any {
        return buildProject({
            id: args.id,
        });
    },
};



