require('dotenv/config');
const cors = require('cors');
const express = require('express');
const routes = require('./app/routes');

const app = express();
app.use(cors());
app.use(routes);
app.use(express.json());
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Running on ${port}`);
});
