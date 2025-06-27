// // unit 3 3
// const { registerUser } = require('../services/users');

// async function register(req, res, next) {
//   try {
//     const user = await registerUser(req.body);
//     res.status(201).json({
//       status: 'success',
//       message: 'Successfully registered a user!',
//       data: user,
//     });
//   } catch (err) {
//     next(err);
//   }
// }

// unit 3 4
const { loginUser } = require('../services/users');

async function login(req, res, next) {
  try {
    const { accessToken, refreshToken } = await loginUser(req.body);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 24 * 3600000),
    });
    res.json({
      status: 'success',
      message: 'Successfully logged in an user!',
      data: { accessToken },
    });
  } catch (err) {
    next(err);
  }
}

// unit3 7
async function logout(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    await logoutUser(refreshToken);
    res.clearCookie('refreshToken');
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

// unit 3 8
async function refresh(req, res, next) {
  try {
    const { refreshToken: old } = req.cookies;
    const { accessToken, refreshToken } = await refreshSession(old);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 24 * 3600000),
    });
    res.json({
      status: 'success',
      message: 'Successfully refreshed a session!',
      data: { accessToken },
    });
  } catch (err) {
    next(err);
  }
}
