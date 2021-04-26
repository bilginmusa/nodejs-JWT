import Boom from "boom";
import User from "../../models/user";
import signAccessToken from "../../helpers/jwt/signAccessToken";
import signRefreshToken from "../../helpers/jwt/signRefreshToken";
import verifyRefreshToken from "../../helpers/jwt/verifyRefreshToken";

const Register = async (req, res, next) => {
  try {
    const input = req.body;
    const isExists = await User.findOne({ email: input.email });

    if (isExists) {
      return next(Boom.conflict("This e-mail already using."));
    }
    const user = new User(input);
    const data = await user.save();
    const userData = data.toObject();

    const accessToken = await signAccessToken(user._id);
    const refreshToken = await signRefreshToken(user._id);

    delete userData.password;
    delete userData.__v;

    return res.json({ userData, accessToken, refreshToken });
  } catch (err) {
    console.log("ERROR:", err);
    return next(err);
  }
};

const RefreshToken = async (req, res, next) => {
  const { refresh_token } = req.body;

  try {
    if (!refresh_token) {
      throw Boom.badRequest();
    }

    const user_id = await verifyRefreshToken(refresh_token);
    const accessToken = await signAccessToken(user_id);
    const refreshToken = await signRefreshToken(user_id);

    return res.json({ accessToken, refreshToken });
  } catch (e) {
    return next(e);
  }
};

const Me = (req, res, next) => {
  return res.send("Me");
};

export default { Register, Me, RefreshToken };
