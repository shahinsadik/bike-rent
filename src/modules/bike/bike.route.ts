import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { bikeValidations } from './bike.validation';
import { BikeControllers } from './bike.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// route for add bike into db
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(bikeValidations.createBikeValidationSchema),
  BikeControllers.createBike,
);

// get all bikes from db
router.get('/', BikeControllers.getAllBikes);

// get single bike from db
router.get('/:id', BikeControllers.getSingleBike);

// update bike into db
router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(bikeValidations.updateBikeValidationSchema),
  BikeControllers.updateBike,
);

// delete bike from db
router.delete('/:id', auth(USER_ROLE.admin), BikeControllers.deleteBike);

export const BikeRoutes = router;
