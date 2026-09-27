// business logics
//status code 500

import { Auth } from "../model/auth.schema.js";
import { genToken } from "../../utils/genToken.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json("All fields are required");
    }
    const isUserExist = await Auth.findOne({ email });
    if (isUserExist) {
      return res.status(400).json("User Already Exist");
    }
    const user = await Auth.create({
      username,
      email,
      password,
    });
    return res.status(201).json({
      message: "User Register Sucessfully!",
      data: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    }
    const isPassword = await user.comparePassword(password);
    if (!isPassword) {
      return res.status(400).json({
        message: "Password is incorrect",
      });
    }

    const token = await genToken(user._id, user.userName, user.email);
    console.log(token, "test");

    return res.status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // required for sameSite: "none"
        sameSite: "none", // required for cross-site requests
      })
      .json({
        message: "User login Successfull",
        data: {
          username: user.userName,
          email: user.email,
          authToken: token,
        },
      });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await Auth.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(400).json({
        message: "Something went wrong while fetching user !",
      });
    }
    return res.status(200).json({
      message: "User",
      data: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const SignOut = async (req, res, next) => {
  try {
    return res.clearCookie("token").status(200).json({
      message: "Sign Out Successfull!",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
