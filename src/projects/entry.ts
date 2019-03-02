import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
import { getProject } from './interactor';

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        url: {type: GraphQLString},
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




