import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';

const router = express.Router();

// get profile route
router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getProfile,
);

// update profile
router.put(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(UserValidations.userUpdateValidationSchema),
  UserControllers.updateUserProfile,
);

// get all users
router.get('/allUsers', auth(USER_ROLE.admin), UserControllers.getAllUsers);

// update user role
router.patch(
  '/updateRole/:id',
  auth(USER_ROLE.admin),
  UserControllers.updateUserRole,
);

// delete user from db
router.delete('/:id', auth(USER_ROLE.admin), UserControllers.deleteUser);

export const UserRoutes = router;
