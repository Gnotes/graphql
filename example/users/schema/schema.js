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
  GraphQLList,
  GraphQLNonNull
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        // return axios.get(`/users?companyId=${parentValue.id}`);
        return axios.get(`/companies/${parentValue.id}/users`);
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
    /**
     * 注意：这个地方定义的是 company ,而不是 companyId
     * 当 Graphql 的数据类型定义 Data-Type （就是我们定义的这个），与真实的数据模型 Data-Model（db.json 或者数据库中的）的
     * “字段一致” ：时就会读取model中定义的值，
     * “字段不一致”：时就需要通过 "resolve" 函数指定需要返回的数据
     */
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        if (!parentValue.companyId) return null;
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

// Mutation 的入口类型
const RootMutationType = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    // 变更的名称，类似上边Query 中的 user、users等
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString }
      },
      // 具体的执行函数，第二个是传递的参数对象
      resolve(parentValue, { firstName, lastName, age, companyId }) {
        return axios.post("/users", { firstName, lastName, age, companyId });
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString }
      },
      resolve(parentValue, { id, ...others }) {
        return axios.put(`/users/${id}`, others);
      }
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, { id }) {
        return axios.delete(`/users/${id}`);
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

module.exports = schema;
