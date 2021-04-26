import Boom from "boom";

const notFound = () => {
  return (req, res, next) => {
    return next(Boom.notFound("This route does not exist."));
  };
};

const generalError = () => {
  return (err, req, res, next) => {
    if (err) {
      if (err.output) {
        return res
          .status(err.output.statusCode || 500)
          .json(err.output.payload);
      }
      return res.status(500).json(err);
    }
  };
};

export { notFound, generalError };
