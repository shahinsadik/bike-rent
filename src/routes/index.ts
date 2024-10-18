import { Router } from 'express';
import { BikeRoutes } from '../modules/bike/bike.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { RentalRoutes } from '../modules/rental/rental.route';
import { paymentRoutes } from '../modules/payment/payment.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/bikes',
    route: BikeRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/rentals',
    route: RentalRoutes,
  },
  {
    path: '/payment',
    route: paymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
