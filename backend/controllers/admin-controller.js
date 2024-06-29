const UserModel = require("../models/user-model");


module.exports.adminPanel = async (req, res) => {

    try {

        const UserData = await UserModel.find({ "name": { $ne: "admin" } })
        res.send(UserData)

    } catch (error) {
        console.log(error);
    }
}

module.exports.deleteUser = async (req, res) => {

    try {
        const userId = req.params.id
        await UserModel.findByIdAndDelete(userId)
        res.send("Deleted successfully")

    } catch (error) {
        console.log(error);
    }
}
module.exports.blockUser = async (req, res, next) => {

    try {
        const userId = req.params.id
        await UserModel.findByIdAndUpdate({ _id: userId }, { isBlocked: "true" })
        res.send("Blocked successfully")

    } catch (error) {
        console.log(error);
    }
}

module.exports.unBlockUser = async (req, res, next) => {

    try {
        const userId = req.params.id
        await UserModel.findByIdAndUpdate({ _id: userId }, { isBlocked: "false" })
        res.send("Unblocked successfully")

    } catch (error) {
        console.log(error);
    }
}


module.exports.editUser = async (req, res, next) => {

    try {
        const userId = req.params.id
        const UserData = await UserModel.findById(userId)
        res.send(UserData)

    } catch (error) {
        console.log(error);
    }
}

module.exports.updateUser = async (req, res, next) => {

    try {
        const userId = req.params.id
        await UserModel.findByIdAndUpdate({ _id: userId }, { name: req.body.name, email: req.body.email })
        res.send("Updated User Details")

    } catch (error) {
        const errors = handleErrors(error);
        res.json({ errors, created: false });
    }
}

const handleErrors = (err) => {
    let errors = { name: "", email: "" };

    if (err.code === 11000) {
        errors.email = "Email is Already Registered";
        return errors;
    }
    return errors;
}
