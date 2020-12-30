const graphql = require("graphql");
const _ = require("lodash");
const axios = require("axios");

axios.defaults.baseURL = "http://localhost:3004";
axios.interceptors.response.use(res => res.data);

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios.get(`/users?companyId=${parentValue.id}`);
        // return axios.get(`/companies/${parentValue.id}/users`);
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  // 类型名称
  name: "User",
  // 类型字段
  fields: {
    id: { type: GraphQLString }, // 字段类型
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return axios.get(`/companies/${parentValue.companyId}`);
      }
    }
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
        return axios.get(`/users/${args.id}`);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return axios.get(`/users`);
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve: (parentValue, args) => {
        return axios.get(`/companies/${args.id}`);
      }
    },
    companies: {
      type: new GraphQLList(CompanyType),
      resolve() {
        return axios.get(`/companies`);
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQueryType
});

module.exports = schema;
