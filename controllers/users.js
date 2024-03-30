const { response, request } = require("express");

// Endpoint GET
const usersGet = (req = request, res = response) => {
  const { q, name = 'No Name', apiKey } = req.query;
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
    msg: "put - API - controller",
    id,
  });
};

// Endpoint POST
const usersPost = (req, res) => {
  res.status(201).json({
    ok: true,
    msg: "post - API - controller",
  });
};

// Endpoint DELETE
const usersDelete = (req, res) => {
  res.json({
    ok: true,
    msg: "delete - API - controller",
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
};
