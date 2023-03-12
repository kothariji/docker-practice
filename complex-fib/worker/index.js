const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
  // host: keys.redisHost,
  // port: keys.redisPort,
  url: "redis://redis:6379",
  retry_strategy: () => 1000,
});

redisClient.connect();

// subscription
const sub = redisClient.duplicate();
sub.connect();

function fib(idx) {
  if (idx < 2) return 1;
  return fib(idx - 1) + fib(idx - 2);
}

// sub.subscribe("message", (channel, message) => {
//   redisClient.hSet("values", message, fib(parseInt(message)));
// });

sub.subscribe("insert", (message) => {
  console.log("worker hereeeeee");
  redisClient.hSet("values", message, fib(parseInt(message)));
});
