import JWT from "jsonwebtoken";
import Boom from "boom";
import redis from "../../clients/redis";
const verifyRefreshToken = async (refresh_token) => {
  console.log("Refresh Token:", refresh_token);
  return new Promise(async (resolve, reject) => {
    JWT.verify(
      refresh_token,
      process.env.JWT_REFRESH_SECRET,
      async (err, payload) => {
        if (err) {
          return reject(Boom.unauthorized());
        }

        const { user_id } = payload;
        console.log("Verify Payload", payload);
        const user_token = await redis.get(user_id);
        console.log("Verify User_Token", user_token);

        if (!user_token) {
          return reject(Boom.unauthorized());
        }

        if (refresh_token === user_token) {
          return resolve(user_id);
        } else {
          return reject(Boom.badRequest("Renew token is old."));
        }
      }
    );
  });
};

export default verifyRefreshToken;
