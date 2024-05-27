import { Request, Response } from "express";
import userModel from "../model/userModel";
import bcrypt from "bcrypt";
import { createEmailAccount } from "../utils/email";

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID);

    return res.status(201).json({
      message: "view",
      data: user,
      status: 201,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
      status: 404,
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();

    return res.status(201).json({
      message: "view",
      data: user,
      status: 201,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
      status: 404,
    });
  }
};

export const createUsers = async (req: Request, res: Response) => {
  try {
    const { companyName, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      companyName,
      email,
      password: hashed,
    });

    createEmailAccount(user);

    return res.status(201).json({
      message: "view",
      data: user,
      status: 201,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
      status: 404,
    });
  }
};

export const signInUsers = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({
      email,
    });

    if (user) {
      const passwordCheck = await bcrypt.compare(password, user?.password);

      if (passwordCheck) {
        if (user?.verify) {
          return res.status(201).json({
            message: "welcome back",
            data: user,
            status: 201,
          });
        } else {
          return res.status(404).json({
            message: "Go and verify your Account",
            status: 404,
          });
        }
      } else {
        return res.status(404).json({
          message: "Error with Password",
          status: 404,
        });
      }
    } else {
      return res.status(404).json({
        message: "Error with Email",
        status: 404,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error",
      status: 404,
    });
  }
};

export const verifyUsers = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    await userModel.findByIdAndUpdate(
      userID,
      {
        verify: true,
      },
      { new: true }
    );

    return res.status(201).json({
      message: "user has been verified",
      status: 201,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
      status: 404,
    });
  }
};
