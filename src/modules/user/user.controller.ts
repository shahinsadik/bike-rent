import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import AppError from '../../errors/appError';

//* get profile from db
const getProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.getProfileFromDB(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

//* update profile into db
const updateUserProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.updateProfileIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile updated successfully',
    data: result,
  });
});

//* get all users from db
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.getAllUsersFromDB();
  if (result.length === 0) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'No Data Found',
      data: result,
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    data: result,
  });
});

//* update User info into db
const updateUserRole: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { role } = req.body;
  if (!role) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Role is Required');
  }
  const result = await userServices.updateUserRoleIntoDB(id, role);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User role updated successfully',
    data: result,
  });
});

//* delete user from db
const deleteUser: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await userServices.deleteUserFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User deleted successfully',
    data: result,
  });
});

export const UserControllers = {
  getProfile,
  updateUserProfile,
  getAllUsers,
  updateUserRole,
  deleteUser,
};
