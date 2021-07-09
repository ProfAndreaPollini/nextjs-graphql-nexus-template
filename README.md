nextjs starter project with graphql + nexus + prisma.io support. 

Using nexus you just need to define your types, query and mutations and generate the graphql schema and the typescript types.

## Getting Started

First, rename `.env.sample` file to `.env` and configure your prima db connection settings.

Setup your prima schema in [prisma/schema.prisma](./prisma/schema.prisma)

Configure your graphql schema in the [schema](./schema) folder.

Generate the graphql schema and the typescript type definitions for your ptoject using 

```bash
yarn run schemagen
```

Last,  run the development server:

```bash
npm run dev
# or
yarn dev
```
 
You can see the graphql playground at `http://localhost:3000/api/graphql`


