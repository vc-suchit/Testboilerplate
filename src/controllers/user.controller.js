const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");

const createUser = catchAsync(async (req, res) => {
  console.log("222222222222222");
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  console.log(req.query, '88888888888888888888')
  const filter = pick(req.query, ["name", "role"]);
  console.log(filter, "********filter*******", req.query);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  console.log(options, "##########options#############");
  const result = await userService.queryUsers1(filter, options);
  console.log(result, "result??????????????????");
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  console.log("POOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const updateUserUsingMethod = catchAsync(async (req, res) => {
  const user = await userService.updateUserMethod(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getUserWithDept = catchAsync(async (req, res) => {
  console.log("$$$$$$$RRR")
  const user = await userService.getUserWithDept(req.params.userId);
  res.send(user);
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateUserUsingMethod,
  getUserWithDept
};
