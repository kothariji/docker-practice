const express = require("express");
const app = express();
const port = 8080;
const redis = require("redis");

const client = redis.createClient({
  url: "redis://redis-server:6379",
});

client.connect();

client.on("error", (err) => console.log("Redis Client Error", err));

client.set("visits", 0);

app.get("/", async (req, res) => {
  const value = await client.get("visits");
  res.send("Total number of visits" + value);
  client.set("visits", +value + 1);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
