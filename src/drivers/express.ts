import * as express from 'express';
import * as express_graphql from 'express-graphql';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { project, userProjects } from '../projects/entry';
import { user } from '../users/entry';

export class Express {

    static initExpress() {
        const app = express();

        const RootQuery = new GraphQLObjectType({
            name: 'RootQueryType',
            fields: {
                project,
                userProjects,
                user,
            },
        });

        const schema = new GraphQLSchema({
            query: RootQuery,
        });

        app.use('/zap', express_graphql({
            schema,
            graphiql: true,
        }));

        app.listen(3000, () => {
            console.log('ZapTerm Server is listening on port 3000');
        });
    }
}
