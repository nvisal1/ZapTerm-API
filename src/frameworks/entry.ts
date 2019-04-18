import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from 'graphql';
import { fetchAllFrameworks } from './interactor';

const FrameworkType = new GraphQLObjectType({
    name: 'Framework',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        startCmd: {type: GraphQLString},
        link: {type: GraphQLString},
        logo: {type: GraphQLString},
    }),
});

export const getAllFrameworks = {
    type: GraphQLList(FrameworkType),
    args: {},
    resolve(parent: any, args: any): any {
        return fetchAllFrameworks();
    },
};

