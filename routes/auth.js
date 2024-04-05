const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { fieldValidate } = require("../middleware/field-validation");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "El password es obligatorio").notEmpty(),
    fieldValidate,
  ],
  login
);

module.exports = router;
