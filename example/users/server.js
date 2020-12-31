const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const bodyParser = require("body-parser");
const cors = require("cors");
const schema = require("./schema/schema");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
