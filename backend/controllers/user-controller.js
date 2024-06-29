const UserModel = require("../models/user-model");
const jwt = require("jsonwebtoken")
require("dotenv");

const Max_Age = 3 * 24 * 60 * 60;
const createTocken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: Max_Age
    })
}

const handleErrors = (err) => {
    let errors = { name: "", email: "", password: "" };

    if (err.code === 11000) {
        errors.email = "Email is Already Registered";
        return errors;
    }

    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

const handleLoginErrors = (err) => {
    let errors = { email: "", password: "" };

    if (err.message === "Incorrect Email")
        errors.email = "Incorrect login credentials"

    if (err.message === "Incorrect Password")
        errors.email = "Incorrect login credentials"

    if (err.message === "Blocked")
        errors.email = "You are blocked by the admin!!!"

    return errors;
}

module.exports.register = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        const user = await UserModel.create({ name, email, password });

        const token = createTocken(user._id);

        if (email === process.env.ADMIN) {
            res.cookie("token", token, {
                withCredentials: true,
                httpOnly: false,
                maxAge: Max_Age * 1000,
            });
            res.status(201).json({ value: true });
        } else {
            res.cookie("jwt", token, {
                withCredentials: true,
                httpOnly: false,
                maxAge: Max_Age * 1000,
            });

            res.status(201).json({ user: user._id, created: true, value: false });
        }

    } catch (err) {
        const errors = handleErrors(err);
        res.json({ errors, created: false });
    }
};

module.exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await UserModel.login(email, password);
        const token = createTocken(user._id);

        if (email === process.env.ADMIN) {
            res.cookie("token", token, {
                withCredentials: true,
                httpOnly: false,
                maxAge: Max_Age * 1000,
            });
            res.status(200).json({ value: true });
        } else {
            res.cookie("jwt", token, {
                withCredentials: true,
                httpOnly: false,
                maxAge: Max_Age * 1000,
            });

            res.status(200).json({ user: user._id, created: true, value: false });
        }

    } catch (err) {
        const errors = handleLoginErrors(err);
        res.json({ errors, created: false });
    }
};