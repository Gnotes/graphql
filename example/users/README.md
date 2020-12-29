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
