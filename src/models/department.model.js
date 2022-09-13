const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true,
            unique: true,
            validate(value) {
                console.log(value, "^^^^^^^^^^^^^^^");
            },
        },
        description: {
            type: String,
            require: true,
            trim: true,
        },
        subject: {
            type: Object,
            trim: true
        },
        isTrulyfullfiled: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        collection: "Department",
    },

);

departmentSchema.pre("save", async function (next) {
    const department = this;
    console.log(department.updated_at, "*********")
    department.updated_at = Date.now();
    console.log(department.updated_at, "###########")
    next();
});

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
