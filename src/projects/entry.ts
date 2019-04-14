import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } from 'graphql';
import { getProject, getUserProjects, insertNewProject } from './interactor';

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        url: {type: GraphQLString},
        description: {type: GraphQLString},
        authorId: {type: GraphQLID},
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
    type: ProjectType,
    args: {authorId: {type: GraphQLID}},
    resolve(parent: any, args: any): any {
        return getUserProjects({
            authorId: args.authorId,
        });
    },
};

export const insertProject = {
    type: GraphQLBoolean,
    args: {
        name: {type: GraphQLString},
        url: {type: GraphQLString},
        description: {type: GraphQLString},
        authorId: {type: GraphQLString},
    },
    resolve(parent: any, args: any): any {
        return insertNewProject({
            project: {
                name: args.name,
                url: args.url,
                description: args.description,
                authorId: args.authorId,
            },
        });
    },
};




