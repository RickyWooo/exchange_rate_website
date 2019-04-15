# Exchange Rate Website 

## Demo
[Demo](http://my-first-vue-crawler-app-exchangerate-website.s3-website-ap-southeast-1.amazonaws.com/)

## Architecture
![](https://github.com/RickyWooo/exchange_rate_website/blob/master/archi.png)

## Introduction

First of all, this application was built with the whole serverless architecture.

I set up a python crawler as AWS Lamba function, which will automatically retrieve the exchange data from bank 10 A.M. every day, and store data into the Amazon Dynamodb as AWS No-SQL Database. 

The User Interface is developed with Vue.js and host on the Amazon S3 as static website, I adopted express framework as API which achieve different routes in the same AWS Lambda Function, and cost by each AWS Lambda function is invoked.


