## ratelimiter-middleware

![](https://img.shields.io/badge/npm-v1.0.0-brightgreen)
![](https://img.shields.io/badge/middleware-rate%20limit-blue)

Basic rate-limiting middleware for Express. Used to limit repeated requests to public APIs and/or endpoints. It can be used to rateLimit a specific `appId` (specified in the request headers) and by default it rateLimits IP addresses.

**Ensure that your redis server is running before using**

##Installation 

`npm i --save ratelimiter-middleware`

## Usage

```
const express = require('express');
const app = express();
const rateLimiter = require('ratelimiter-middleware');

const maxRequests = 100;
const timeLimit = 60; // seconds
const appId = 'appId'; // The request header that you specify
app.use(rateLimiter(maxRequests,timeLimit, appId));

app.get('/', (req, res) => {
  res.json({ msg: 'AoK' });
});

```