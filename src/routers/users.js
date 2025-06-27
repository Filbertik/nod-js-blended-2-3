// unit 3 3
const express = require('express');
const { register, login, logout, refresh } = require('../controllers/users');
const {
  validateBody,
  userRegisterSchema,
  userLoginSchema,
} = require('../middlewares/userValidation');
const router = express.Router();

router.post('/register', validateBody(userRegisterSchema), register);
router.post('/login', validateBody(userLoginSchema), login);
router.post('/logout', logout);
router.post('/refresh', refresh);

module.exports = router;
