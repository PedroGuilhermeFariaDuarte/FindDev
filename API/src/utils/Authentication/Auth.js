import jwt from "jsonwebtoken";

// Auth Config
import AuthConfig from "../../config/AuthConfig";

export default async id => {
  return jwt.sign({ id }, AuthConfig.secrect, {
    expiresIn: AuthConfig.expiresIn
  });
};
