// unit 3 6
const jwt = require('jsonwebtoken');
const Session = require('../models/session');
const createError = require('http-errors');

async function authenticate(req, res, next) {
  const header = req.header('Authorization') || '';
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return next(createError(401, 'Not authorized'));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const sess = await Session.findOne({
      userId: payload.id,
      accessToken: token,
    });
    if (!sess) throw new Error();
    if (sess.accessTokenValidUntil < new Date()) {
      await sess.remove();
      return next(createError(401, 'Access token expired'));
    }
    req.user = { _id: payload.id };
    next();
  } catch (err) {
    next(createError(401, 'Not authorized'));
  }
}

module.exports = authenticate;
