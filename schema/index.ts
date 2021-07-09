import { makeSchema } from 'nexus'
import * as QueryTypes from './Todo'
import path from "path"


const schema = makeSchema({
    types: [QueryTypes, QueryTypes.TodoUpdateResponse],

    outputs: {
        typegen: path.join(process.cwd(), 'generated/nexus-typegen.ts'),
        schema: path.join(process.cwd(), 'generated/schema.graphql'),
    },
    contextType: {                                    // 1
        module: path.join(process.cwd(), "lib/graphqlContext.ts"),        // 2
        export: "Context",                              // 3
    },
})
export default schema