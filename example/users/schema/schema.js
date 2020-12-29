const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

const users = [
  { id: "1", firstName: "John", lastName: "Doe", age: 12 },
  { id: "2", firstName: "Jack", lastName: "Doe", age: 12 },
  { id: "3", firstName: "Bill", lastName: "Doe", age: 12 },
  { id: "4", firstName: "Mac", lastName: "Doe", age: 12 }
];

const UserType = new GraphQLObjectType({
  // 类型名称
  name: "User",
  // 类型字段
  fields: {
    id: { type: GraphQLString }, // 字段类型
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

// GraphQL 入口类型
const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve: (parentValue, args) => {
        console.log(parentValue, args);
        return _.find(users, { id: args.id });
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQueryType
});

module.exports = schema;
