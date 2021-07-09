// pages/api/graphql.ts

import { ApolloServer } from 'apollo-server-micro'

import schema from "../../schema"
import { context } from "../../lib/graphqlContext"

const server = new ApolloServer({
    schema,
    context
})
export const config = {
    api: {
        bodyParser: false,
    },
}
export default server.createHandler({
    path: '/api/graphql',
})