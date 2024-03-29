const { response } = require("express");
const usersGet = (req, res = response) => {
  res.json({
    ok: true,
    msg: "get - API - controller",
  });
};

const usersPut = (req, res = response) => {
  res.status(400).json({
    ok: true,
    msg: "put - API - controller",
  });
};

const usersPost = (req, res) => {
  res.status(201).json({
    ok: true,
    msg: "post - API - controller",
  });
};
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
