const { Router } = require("express");
const { check } = require("express-validator");
const RoleSchema = require("../models/role");
const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
} = require("../controllers/users");
const { fieldValidate } = require("../middleware/field-validation");
const {
  isValidRole,
  existEmail,
  existUserById,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", usersGet);
router.put("/:id", usersPut);
router.post(
  "/",
  [
    check("name", "El nombre ingresado no es válido").not().isEmpty(),
    check(
      "password",
      "El password es obligatorio mayor a 6 caracteres"
    ).isLength({ min: 6 }),
    check("email").custom(existEmail),
    // Role is intrinsic passed thought isValidRole - One argument function
    check("role").custom(isValidRole),
    fieldValidate,
  ],
  usersPost
);
router.delete("/", usersDelete);

module.exports = router;
