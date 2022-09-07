const httpStatus = require("http-status");
const { Department } = require("../models");
const ApiError = require("../utils/ApiError");
const mongoose = require("mongoose");

const createDepartment = async (departmentBody) => {
    console.log(departmentBody, "departmentBody");
    return Department.create(departmentBody);
};

const getDepartment = async (depId) => {
    // let lookup = {
    //     $lookup: {
    //         from: 'User', localField: 'name',
    //         foreignField: 'department', as: 'modelUser'
    //     }
    // }
    return Department.aggregate([
        {
            $lookup: {
                from: 'users', localField: 'name',
                foreignField: 'department', as: 'modelUser'
            }
        }
    ]);
    // return mongoose.model('Department').aggregate([lookup]);
};

module.exports = {
    createDepartment,
    getDepartment
};
