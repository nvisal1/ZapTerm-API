import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } from 'graphql';
import { getUser, getToken, insertUser, editUserInfo } from './interactor';

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        jobTitle: {type: GraphQLString},
        bio: {type: GraphQLString},
    }),
});

const TokenType = new GraphQLObjectType({
    name: 'Token',
    fields: () => ({
        token: {type: GraphQLString},
    }),
});

export const user = {
    type: UserType,
    args: {id: {type: GraphQLID}},
    resolve(parent: any, args: any): any {
        return getUser({
            id: args.id,
        });
    },
};

export const searchUsers = {
    type: UserType,
    args: {id: {type: GraphQLID}},
    resolve(parent: any, args: any): any {
        return getUser({
            id: args.id,
        });
    },
};

export const editUser = {
    type: GraphQLBoolean,
    args: {
        id: {type: GraphQLID },
        name: {type: GraphQLString },
        username: {type: GraphQLString },
        email: {type: GraphQLString },
        jobType: {type: GraphQLString },
        bio: {type: GraphQLString },
    },
    resolve(parent: any, args: any): any {
        return editUserInfo({
            user: {
                id: args.id,
                name: args.name,
                username: args.username,
                email: args.email,
                jobType: args.jobType,
                bio: args.bio,
            },
        });
    },
};

export const login = {
    type: TokenType,
    args: {username: {type: GraphQLString}, password: {type: GraphQLString}},
    resolve(parent: any, args: any): any {
        return getToken({
            username: args.username,
            password: args.password,
        });
    },
};

export const register = {
    type: TokenType,
    args: {
        username: {type: GraphQLString},
        name: {type: GraphQLString},
        password: {type: GraphQLString},
        email: {type: GraphQLString},
        jobType: {type: GraphQLString},
        bio: {type: GraphQLString},
    },
    resolve(parent: any, args: any): any {
        return insertUser({
            user: {
                username: args.username,
                password: args.password,
                name: args.name,
                email: args.email,
                jobType: args.jobType,
                bio: args.bio,
            },
        });
    },
};
