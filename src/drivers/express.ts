import * as express from 'express';
import * as express_graphql from 'express-graphql';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import {
    getEnvironment,
    getUserEnvironments,
    getUserEnvironmentCount,
    searchEnvironments,
    insertEnvironment,
    editEnvironment,
    deleteEnvironment,
} from '../environments/entry';

import {
    project,
    userProjects,
    insertProject,
} from '../projects/entry';
import {
    user,
    searchUsers,
    login,
    register,
} from '../users/entry';

export class Express {

    static initExpress() {
        const app = express();

        const RootQuery = new GraphQLObjectType({
            name: 'RootQueryType',
            fields: {
                getEnvironment,
                getUserEnvironments,
                getUserEnvironmentCount,
                searchEnvironments,
                insertEnvironment,
                editEnvironment,
                deleteEnvironment,
                project,
                userProjects,
                insertProject,
                user,
                login,
                register,
            },
        });

        const schema = new GraphQLSchema({
            query: RootQuery,
        });

        app.use('/zap', express_graphql({
            schema,
            graphiql: true,
        }));

        app.get('/', (req, res) => {
            res.status(200).json({message: 'Welcome to the -It API'});
        });

        app.listen(3000, () => {
            console.log('-It API is listening on port 3000');
        });
    }
}
