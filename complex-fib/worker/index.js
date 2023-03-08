const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});

// subscription
const sub = redisClient.duplicate();

function fib(idx) {
  if (idx < 2) return 1;
  return fib(idx - 1) + fib(idx - 2);
}

sub.on("message", (channel, message) => {
  redisClient.hSet("values", message, fib(parseInt(message)));
});

sub.subscribe("insert");
