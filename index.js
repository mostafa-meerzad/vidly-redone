const express = require("express");
const Joi = require("joi");

const app = express();



app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server listening on port: ${port}`))

