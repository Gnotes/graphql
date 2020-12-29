# Users Demo

#### Steps

- Install all dependencies

  ```bash
  npm install
  ```

- Start the server

  ```bash
  npm run dev
  ```

- Try it

  Open browser with `http://localhost:3000/graphql`, the syntax of GraphQL Query just looks like as below.

  ```graphql
  {
    user(id: "2") {
      firstName
    }
  }
  ```

#### Tags

- [V1.0.0](https://github.com/Gnotes/graphql/releases/tag/V1.0.0) : users demo with hard code of users
