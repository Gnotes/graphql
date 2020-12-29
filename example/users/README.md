# Users Demo

#### Steps

Checkout to Tag V1.0.0

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

#### Run JSON Server

Checkout to Tag V1.0.1 and run the command.

```bash
npm run json:server
```

And then the "json-server" will provide a json based server with port "3004" on "http://localhost:3004", (the default server port is 3000)

Now, change the url of route to "http://localhost:3004/users", you will see all the users who you are defined in 'db.json'

#### Tags

- [V1.0.0](https://github.com/Gnotes/graphql/releases/tag/V1.0.0) : users demo with hard code of users
- [V1.0.1](https://github.com/Gnotes/graphql/releases/tag/V1.0.1) : add json-server to provide some data
