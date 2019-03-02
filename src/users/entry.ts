import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
import { getUser } from './interactor';

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
