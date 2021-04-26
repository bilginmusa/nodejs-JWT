const Redis = require("ioredis");
const redis = new Redis({ host: "127.0.0.1", port: "7001" });
export default redis;
