// // unit 3 3
// const User = require('../models/user');
// const createError = require('http-errors');

// async function registerUser({ name, email, password }) {
//   const exists = await User.findOne({ email });
//   if (exists) throw createError.Conflict('Email in use');
//   const user = await User.create({ name, email, password });
//   return user;
// }

// module.exports = { registerUser /* , ... , ... */ };

// unit 3 4
const jwt = require('jsonwebtoken');
const Session = require('../models/session');
const User = require('../models/user');
const createError = require('http-errors');

async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    throw createError.Unauthorized('Email or password is wrong');
  }

  const payload = { id: user._id };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '30d',
  });
  await Session.deleteMany({ userId: user._id });
  const now = new Date();
  const session = await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(now.getTime() + 15 * 60000),
    refreshTokenValidUntil: new Date(now.getTime() + 30 * 24 * 3600000),
  });

  return { accessToken, refreshToken };
}

// unit 3 7
async function logoutUser(refreshToken) {
  await Session.deleteOne({ refreshToken });
}
// unit 3 7

// unit 3 8
async function refreshSession(oldRefreshToken) {
  const old = await Session.findOne({ refreshToken: oldRefreshToken });
  if (!old) throw createError.Unauthorized('Not authorized');
  if (old.refreshTokenValidUntil < new Date()) {
    await old.remove();
    throw createError.Unauthorized('Refresh token expired');
  }
  const userId = old.userId;

  await Session.deleteOne({ _id: old._id });

  const payload = { id: userId };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '30d',
  });
  const now = new Date();
  await Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(now.getTime() + 15 * 60000),
    refreshTokenValidUntil: new Date(now.getTime() + 30 * 24 * 3600000),
  });

  return { accessToken, refreshToken };
}

// unit 3 8

module.exports = { registerUser, loginUser /*, ... , ... */ };
