import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { BikeServices } from './bike.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

//* create bike into db
const createBike: RequestHandler = catchAsync(async (req, res) => {
  const result = await BikeServices.createBikeIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike added successfully',
    data: result,
  });
});

//* get all bikes from db
const getAllBikes: RequestHandler = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBikesFromDB();
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
    message: 'Bikes retrieved successfully',
    data: result,
  });
});

//* Get single bike from db
const getSingleBike: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BikeServices.getSingleBikeFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike retrieved successfully',
    data: result,
  });
});

//* update bike info into db
const updateBike: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await BikeServices.updateBikeIntoDB(id, updatedData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike updated successfully',
    data: result,
  });
});

//* delete bike from db
const deleteBike: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BikeServices.deleteBikeFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike deleted successfully',
    data: result,
  });
});

export const BikeControllers = {
  createBike,
  getAllBikes,
  getSingleBike,
  updateBike,
  deleteBike,
};
