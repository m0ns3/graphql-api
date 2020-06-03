const express = require("express");
const app = express();
const expressGraphQL = require("express-graphql");
const { GraphQLSchema } = require("graphql");

app.listen(3000, () => {
  console.log("Server running");
});

const RootQueryType = require("./Queries/RootQueryType");
const RootMutationType = require("./Queries/RootMutationType");
//Schema
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
);
