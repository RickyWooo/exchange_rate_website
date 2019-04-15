# Exchange Rate Website 

## Demo
[Demo](http://my-first-vue-crawler-app-exchangerate-website.s3-website-ap-southeast-1.amazonaws.com/)

## Architecture
![](https://drive.google.com/file/d/1LQ0a91YZ_t8xTuk6-ArbD_ZPW_st6zrQ/view?usp=sharing)

## Introduction

First of all, this application was built with the whole serverless architecture.

I set up a python crawler as AWS Lamba function, which will automatically retrieve the exchange data from bank 10 A.M. every day, and store data into the Amazon Dynamodb, which is AWS Fully managemed No-SQL Database Service. 
The User Interface is developed with Vue.js and host on the Amazon S3 as static website, and I adopted express as API which can achieve different routes in the same AWS Lambda Function, and cost by each AWS Lambda function is invoked.


