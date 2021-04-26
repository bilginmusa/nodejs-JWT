import JWT from "jsonwebtoken";
import Boom from "boom";

const signAccessToken = (data) => {
  console.log("access start");

  return new Promise((resolve, reject) => {
    const payload = {
      ...data,
    };

    const options = {
      expiresIn: "50s",
      issuer: "ecommerce.app",
    };

    JWT.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(Boom.internal(err.message));
      }
      console.log("access end");

      resolve(token);
    });
  });
};

export default signAccessToken;
