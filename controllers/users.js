const { response, request } = require("express");

// Endpoint GET
const usersGet = (req = request, res = response) => {
  const { q, name = 'GET ENDPOINT GRUPO 17 ----- TEST', apiKey } = req.query;
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
const usersPost = (req, res) => {
  res.status(201).json({
    ok: true,
    msg: "post - API - controller GRUPO 17",
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
