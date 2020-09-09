const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => console.log(`Error ${err}`));

const rateLimiter = (maxReqCount, timeLimit, appId) => (req, res, next) => {
  let token = null;
  if (!appId) {
    token = req.ip;
  } else {
    token = req.get(appId);
  }
  if (!token) {
    return res.status(400).json({ err: 'No appId detected' });
  }
  client
    .multi()
    .set([token, 0, 'EX', timeLimit, 'NX'])
    .incr(token)
    .exec((err, replies) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      const reqCount = replies[1];
      if (reqCount > maxReqCount) {
        return res.status(403).json({ err: `Quota of ${maxReqCount} requests per ${timeLimit} seconds exceeded` });
      }
      return next();
    });
};

module.exports = rateLimiter;
