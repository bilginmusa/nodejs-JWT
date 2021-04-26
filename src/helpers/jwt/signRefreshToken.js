import JWT from "jsonwebtoken";
import Boom from "boom";
import redis from "../../clients/redis";

const signRefreshToken = (user_id) => {
  return new Promise((resolve, reject) => {
    const payload = {
      user_id,
    };

    const options = {
      expiresIn: "180d",
      issuer: "ecommerce.app",
    };

    JWT.sign(payload, process.env.JWT_REFRESH_SECRET, options, (err, token) => {
      if (err) {
        console.log(err);
        reject(Boom.internal());
      }

      redis.set(user_id, token, "EX", 180 * 24 * 60 * 60);

      resolve(token);
    });
  });
};

export default signRefreshToken;
