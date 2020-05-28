const express = require("express");
const app = express();
const expressGraphQL = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt
} = require("graphql");

app.listen(3000, () => {
  console.log("Server running");
});

app.use(
  "/graphql",
  expressGraphQL({
    //schema: schema,
    graphiql: true
  })
);
