const { response, request } = require("express");
const UserModel = require("../models/user");
const bcryptjs = require("bcryptjs");
// Endpoint GET
const usersGet = (req = request, res = response) => {
  const { q, name = "GET ENDPOINT GRUPO 17 ----- PRUEBA", apiKey } = req.query;
  res.json({
    q,
    name,
    apiKey,
  });
};

// Endpoint PUT
const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { name, email, password, role, google } = req.body;

  try {
    // Find the user by ID and update the fields
    const user = await UserModel.findByIdAndUpdate(
      id,
      { name, password, role, google },
      { new: true }
    );

    res.json({
      msg: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error updating user",
      error: error.message,
    });
  }
};

// Endpoint POST
const usersPost = async (req, res) => {
  // const { name, age } = req.body;

  // Fields to be save in Mongo
  const { name, email, password, role } = req.body;
  const user = new UserModel({ name, email, password, role });

  // Encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.status(201).json({
    ok: true,
    msg: "post - API - controller GRUPO 17",
    user,
  });
};

// Endpoint DELETE
const usersDelete = (req, res) => {
  res.json({
    ok: true,
    msg: "delete - API - controller GRUPO 17",
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
};
