import jwt from 'jsonwebtoken';

export const createJWT = (payload) => {
  const token = jwt.sign(payload, "abc",{ expiresIn: '1h' });
  return token;
};

export const verifyJWT = (token) => {
  const decoded = jwt.verify(token, "abc");
  return decoded;
};