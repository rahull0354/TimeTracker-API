import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please Fill All the Fields",
        success: false,
      });
    }

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        message: "User with this email already exists",
        success: false,
      });
    }

    //password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    return res.status(200).json({
      message: "User Created Successfully!",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error Registering the User",
      success: false,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const { id } = req.params;

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
        success: false,
      });
    }

    // Check email uniqueness (excluding current user)
    if (email) {
      const emailExists = await User.findOne({
        email,
        _id: { $ne: id },
      });

      if (emailExists) {
        return res.status(400).json({
          message: "This email already exists",
          success: false,
        });
      }
    }

    // Prepare update object
    const updatedFields = {};

    if (username) updatedFields.username = username;
    if (email) updatedFields.email = email;

    if (password) {
      updatedFields.password = await bcrypt.hash(password, 10);
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true },
    );

    return res.status(200).json({
      message: "User updated successfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error updating the user",
      success: false,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userExistsCheck = await User.findById(id);
    if (!userExistsCheck) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    return res.status(200).json({
      message: "User Deleted Successfully!",
      success: true,
      data: deletedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error Deleting the User",
      success: false,
    });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userCheck = await User.findById(id);
    if (!userCheck) {
      return res.status(404).json({
        message: "No user found !",
        success: false,
      });
    }

    return res.status(200).json({
      userCheck,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error Finding Users !",
      success: false,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        message: "Please fill in all the fields",
        success: false,
      });
    }

    // checking if the user exists or not
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User with particular mail not found !",
        success: false,
      });
    }

    // password matching
    const checkInputPassword = await bcrypt.compare(password, user.password);
    if (!checkInputPassword) {
      return res.status(400).json({
        message: "Incorrect Email or Password !",
        success: false,
      });
    }

    // jwt token creation

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "7D",
      },
    );

    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    return res.status(200).json({
      message: `Hello ${user.username}!`,
      user,
      success: true,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error Logging the User !",
      success: false,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error Logging the User !",
      success: false,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const getUsers = await User.find()
    return res.status(200).json({
      getUsers,
      success: true
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error Finding Users !",
      success: false,
    });
  }
}