const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { departmentService } = require("../services");

const createDepartment = catchAsync(async (req, res) => {
  const department = await departmentService.createDepartment(req.body);
  res.status(httpStatus.CREATED).send(department);
});

const getDepartment = catchAsync(async (req, res) => {
  const department = await departmentService.getDepartment(req.query.depId);
  res.status(httpStatus.CREATED).send(department);
});

module.exports = {
  createDepartment,
  getDepartment
};
