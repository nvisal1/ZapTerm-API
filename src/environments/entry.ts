import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLInt, GraphQLList } from 'graphql';
import {
    insertNewEnvironment,
    editUserEnvironment,
    deleteUserEnvironment,
    searchAllEnvironments,
    getSingleEnvironment,
    fetchUserEnvironments,
    fetchUserEnvironmentCount,
} from './interactor';

const EnvironmentType = new GraphQLObjectType({
    name: 'Environment',
    fields: () => ({
        id: {type: GraphQLID},
        docker: {type: GraphQLString},
        git: {type: GraphQLString},
        node: {type: GraphQLString},
        authorId: {type: GraphQLID},
        name: {type: GraphQLString},
    }),
});

const UserEnvironmentCountType = new GraphQLObjectType({
    name: 'EnvironmentCount',
    fields: () => ({
        count: {type: GraphQLInt},
    }),
});

export const getEnvironment = {
    type: EnvironmentType,
    args: {
       id: {type: GraphQLID},
    },
    resolve(parent: any, args: any): any {
        return getSingleEnvironment({
            id: args.id,
        });
    },
};

export const getUserEnvironments = {
    type: GraphQLList(EnvironmentType),
    args: {
       authorId: {type: GraphQLID},
    },
    resolve(parent: any, args: any): any {
        return fetchUserEnvironments({
            authorId: args.authorId,
        });
    },
};


export const getUserEnvironmentCount = {
    type: UserEnvironmentCountType,
    args: {
       authorId: {type: GraphQLID},
    },
    resolve(parent: any, args: any): any {
        return fetchUserEnvironmentCount({
            authorId: args.authorId,
        });
    },
};


export const searchEnvironments = {
    type: GraphQLList(EnvironmentType),
    args: {
       docker: {type: GraphQLBoolean},
       git: {type: GraphQLBoolean},
       node: {type: GraphQLBoolean},
       text: {type: GraphQLString},
    },
    resolve(parent: any, args: any): any {
        return searchAllEnvironments({
            docker: args.docker,
            git: args.git,
            node: args.node,
            text: args.text,
        });
    },
};

export const insertEnvironment = {
    type: GraphQLBoolean,
    args: {
        docker: {type: GraphQLBoolean},
        git: {type: GraphQLBoolean},
        node: {type: GraphQLBoolean},
        authorId: {type: GraphQLID},
        name: {type: GraphQLString},
    },
    resolve(parent: any, args: any): any {
        return insertNewEnvironment({
            environment: {
                docker: args.docker,
                git: args.git,
                node: args.node,
                authorId: args.authorId,
                name: args.name,
            }
        });
    },
};

export const editEnvironment = {
    type: GraphQLBoolean,
    args: {
        docker: {type: GraphQLBoolean},
        git: {type: GraphQLBoolean},
        node: {type: GraphQLBoolean},
        id: {type: GraphQLID},
        authorId: {type: GraphQLID},
        name: {type: GraphQLString},
    },
    resolve(parent: any, args: any): any {
        return editUserEnvironment({
            environment: {
                docker: args.docker,
                git: args.git,
                node: args.node,
                id: args.id,
                authorId: args.authorId,
                name: args.name,
            },
        });
    },
};

export const deleteEnvironment = {
    type: GraphQLBoolean,
    args: {
        id: {type: GraphQLID},
    },
    resolve(parent: any, args: any): any {
        return deleteUserEnvironment({
           id: args.id,
        });
    },
};


