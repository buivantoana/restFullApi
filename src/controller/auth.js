import { signInValid, signUpValid } from "../validations/authValid";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
  try {
    const { error } = signUpValid.validate(req.body, { abortEarly: false });
    if (error) {
      let err = error.details.map((item) => item.message);
      return res.status(400).json({
        status: 1,
        message: err,
      });
    }
    let checkEmail = await User.find({ email: req.body.email });
    if (checkEmail[0]) {
      return res.status(400).json({
        status: 1,
        message: "emal da ton tai",
      });
    }
    let hash = await bcrypt.hash(req.body.password, 10);
    if (!hash) {
      return res.status(400).json({
        status: 1,
        message: "hash pass that bai",
      });
    }
    let data = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    if (!data) {
      return res.status(400).json({
        status: 1,
        message: " signup that bai",
      });
    }
    return res.status(200).json({
      status: 0,
      message: " signup thanh ocng",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      status: 1,
      message: error,
    });
  }
}

export async function signin(req, res) {
  try {
    const { error } = signInValid.validate(req.body, { abortEarly: false });
    if (error) {
      let err = error.details.map((item) => item.message);
      return res.status(400).json({
        status: 1,
        message: err,
      });
    }
    let checkEmail = await User.find({ email: req.body.email });
    if (!checkEmail[0]) {
      return res.status(400).json({
        status: 1,
        message: "emal sai",
      });
    }
    let hash = await bcrypt.compare(req.body.password, checkEmail[0].password);
    if (!hash) {
      return res.status(400).json({
        status: 1,
        message: "mat khau sai",
      });
    }
    let token = jwt.sign({ id: checkEmail[0]._id }, "token", {
      expiresIn: "1d",
    });
    if (!token) {
      return res.status(400).json({
        status: 1,
        message: " token that bai",
      });
    }
    return res.status(200).json({
      status: 0,
      message: "signin thanh ocng",
      data: checkEmail,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      status: 1,
      message: error,
    });
  }
}
