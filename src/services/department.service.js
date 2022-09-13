const httpStatus = require("http-status");
const { Department } = require("../models");
const ApiError = require("../utils/ApiError");
const mongoose = require("mongoose");

const createDepartment = async (departmentBody) => {
    console.log(departmentBody, "departmentBody");
    return Department.create(departmentBody);
};

const getDepartment = async (depId) => {
    // {
    //     $lookup: {
    //         from: 'User', localField: 'name',
    //         foreignField: 'department', as: 'modelUser'
    //     }
    // }
    let lookup = [{ $match: { "_id": depId } },
    {
        $lookup: {
            from: 'users',
            localField: 'name',
            foreignField: 'department',
            as: 'modelUsers'
        }
    }]
    return Department.aggregate(lookup);
    // return mongoose.model('Department').aggregate([lookup]);
};


const getDepartmentNotNull = async (depId) => {

    let data = await Department.find({ "subject.*": { $ne: null } });
    console.log(data, "data")
    //  return
};



module.exports = {
    createDepartment,
    getDepartment,
    getDepartmentNotNull
};
