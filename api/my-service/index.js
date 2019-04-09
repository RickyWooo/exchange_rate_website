const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const AWS = require('aws-sdk');
AWS.config.update({region: "ap-southeast-1",});
const USERS_TABLE = process.env.USERS_TABLE;
const dynamodb = new AWS.DynamoDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Content-Type",'application/json');
  next();
});

app.all("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World~~');
});

app.get('/:bank_name/:currency/:from_date/:to_date', function (req, res) {
  var params = {
    TableName: USERS_TABLE,
    ExpressionAttributeValues: {
      ":v1": {
        S: req.params.bank_name
      },
      ":v2":{
        S: req.params.currency
      },
      ":v3":{
        N: req.params.from_date
      },
      ":v4":{
        N: req.params.to_date
      }
    }, 
    KeyConditionExpression: "bank_name = :v1 AND transaction_ts BETWEEN :v3 AND :v4", 
    FilterExpression: "currency = :v2"
  };

  dynamodb.query(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else res.send(data)
  });
})

module.exports.handler = serverless(app);