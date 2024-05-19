const express = require('express');
const { body } = require('express-validator');
const authControllers = require('../controllers/authControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User');

const router = express.Router();

router.route('/signup').post(
  [
    body('name').not().isEmpty().withMessage('Please Enter Your Name'),

    body('email')
      .isEmail()
      .withMessage('Please Enter Valid Email')
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject('Email is already exists!');
          }
        });
      }),

    body('password').not().isEmpty().withMessage('Please Enter A Password'),
  ],

  authControllers.createUser
);
router.route('/login').post(authControllers.loginUser);
router.route('/logout').get(authControllers.logoutUser);
router
  .route('/dashboard')
  .get(authMiddleware, authControllers.getDashboardPage);
router.route('/:id').delete(authControllers.deleteUser);

module.exports = router;
