const jwt = require('jsonwebtoken');

const AuthError = require('../errors/AuthError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload = null;
  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET_PRODUCTION : process.env.JWT_SECRET_DEV);
  } catch {
    next(new AuthError('Необходима авторизация'));
  }
  req.user = payload;

  return next();
};

module.exports = auth;
