import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import { AuthControllers } from './auth.controller';

const router = express.Router();

// signup route
router.post(
  '/signup',
  validateRequest(AuthValidations.createUserValidationSchema),
  AuthControllers.userSignUp,
);

// login route
router.post(
  '/login',
  validateRequest(AuthValidations.logInUserValidationSchema),
  AuthControllers.userLogin,
);

export const AuthRoutes = router;
