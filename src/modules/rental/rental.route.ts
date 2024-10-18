import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { RentalValidations } from './rental.validation';
import { RentalControllers } from './rental.controller';

const router = express.Router();

// create rental
router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(RentalValidations.rentalValidationSchema),
  RentalControllers.createRental,
);

// return rental
router.put(
  '/:id/return',
  auth(USER_ROLE.admin),
  RentalControllers.returnRental,
);

// get all rentals for logged in user
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  RentalControllers.getAllRentalsOfUser,
);

// get all rentals for admin dashboard
router.get(
  '/allRentals',
  auth(USER_ROLE.admin),
  RentalControllers.getAllRentals,
);

export const RentalRoutes = router;
