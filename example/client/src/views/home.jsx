import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import "../style/common.less";

const Home = props => {
  const graphql = gql`
    query {
      users {
        id
        firstName
        lastName
        age
        company {
          id
          name
        }
      }
    }
  `;
  const create_graphql = gql`
    mutation AddUser(
      $firstName: String!
      $lastName: String!
      $age: Int!
      $companyId: String
    ) {
      addUser(
        firstName: $firstName
        lastName: $lastName
        age: $age
        companyId: $companyId
      ) {
        id
      }
    }
  `;

  const delete_graphql = gql`
    mutation deleteUser($id: String!) {
      deleteUser(id: $id) {
        id
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(graphql);
  const [addUser] = useMutation(create_graphql);
  const [deleteUser] = useMutation(delete_graphql);
  const length = data ? data.users.length : 0;

  const createUser = () => {
    addUser({
      variables: {
        firstName: `firstName-${length}`,
        lastName: `lastName-${length}`,
        age: length
      }
    }).then(() => {
      refetch();
    });
  };

  const removeUser = id => {
    deleteUser({ variables: { id: id } }).then(() => {
      refetch();
    });
  };
  if (loading) return <span>loading...</span>;
  if (error) return <span>error...</span>;
  return (
    <div styleName="layout">
      <table styleName="table">
        <thead>
          <tr>
            <th>编号</th>
            <th>名</th>
            <th>姓</th>
            <th>年龄</th>
            <th>公司</th>
            <th>操纵</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map(it => {
            return (
              <tr key={it.id}>
                <td>{it.id}</td>
                <td>{it.firstName}</td>
                <td>{it.lastName || "-"}</td>
                <td>{it.age}</td>
                <td>{it.company ? it.company.name : "-"}</td>
                <td>
                  <span
                    styleName="button-delete"
                    onClick={removeUser.bind(this, it.id)}
                  >
                    删除
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div styleName="button-group align-right">
        <a
          styleName="button"
          onClick={() => {
            createUser();
          }}
        >
          添加
        </a>
      </div>
    </div>
  );
};

export default Home;
