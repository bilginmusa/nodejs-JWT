import JWT from "jsonwebtoken";
import Boom from "boom";

const verifyAccessToken = (req, res, next) => {
  const authorizationToken = req.headers["authorization"];
  if (!authorizationToken) {
    next(Boom.unauthorized());
  }

  JWT.verify(authorizationToken, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return next(
        Boom.unauthorized(
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message
        )
      );
    }
    req.payload = payload;
    next();
  });
};
export default verifyAccessToken;
