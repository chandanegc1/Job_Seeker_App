import jwt from 'jsonwebtoken';

export const createJWT = (payload) => {
  const token = jwt.sign(payload, "process.env.JWT_SECRET", {
    expiresIn: "1d",
  });
  return token;
};

export const verifyJWT = (token) => {
  const decoded = jwt.verify(token, "process.env.JWT_SECRET");
  console.log(decoded)
  return decoded;
};