const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
// const userValidation = require("../../validations/user.validation");
const departmentController = require("../../controllers/department.controller");

const router = express.Router();

router
    .route("/")
    .post(departmentController.createDepartment)
    .get(departmentController.getDepartment);


module.exports = router;


/**
 *  @swagger
 *  tags:
 *   name: Department
 *   description: Department Data and retrieval
 */

/**
 *
 * @swagger
 *   /Department:
 *     get:
 *      summary: Get department
 *      description: Get All department
 *      tags: [department]
 *      responses: 
 *          '200':
 *             description: successful operation
 *             content:
 *               application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Order'
 *      "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *      "401":
 *         $ref: '#/components/responses/Unauthorized'
 *      "403":
 *         $ref: '#/components/responses/Forbidden'
 *     post:
 *        summary: Crud for department
 *        description: create department.
 *        tags: [department]
 *        requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  required:
 *                      - name
 *                      - description
 *                  properties:
 *                      name:
 *                          type: string
 *                      description:
 *                          type: string
 *                          description: description must be unique
 *        responses:
 *           "201":
 *              description: Created
 *              content:
 *                  application/json:
 *                     schema:
 *                        $ref: '#/components/schemas/Department'
 *           "400":
 *                  $ref: '#/components/responses/DuplicateEmail'
 *           "401":
 *                  $ref: '#/components/responses/Unauthorized'
 *           "403":
 *                  $ref: '#/components/responses/Forbidden'
 */