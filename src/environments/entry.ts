import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } from 'graphql';
import { insertNewEnvironment } from './interactor';

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


