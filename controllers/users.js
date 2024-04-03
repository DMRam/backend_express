const { response, request } = require("express");
const UserModel = require("../models/user");
const bcryptjs = require("bcryptjs");
// Endpoint GET
const usersGet = (req = request, res = response) => {
  const { q, name = "GET ENDPOINT GRUPO 17 ----- TEST", apiKey } = req.query;
  res.json({
    q,
    name,
    apiKey,
  });
};

// Endpoint PUT
const usersPut = (req, res = response) => {
  const id = req.params.id;
  res.status(400).json({
    msg: "put - API - controller GRUPO 17",
    id,
  });
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
