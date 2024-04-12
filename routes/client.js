const { Router } = require("express");
const { check } = require("express-validator");
const {
  clientsGet,
  clientsPut,
  clientsPost,
  clientsDelete,
} = require("../controllers/clients");

const {
  existEmail,
} = require("../helpers/db-validators");
const { fieldValidate, isAdminRole, validateJWT } = require("../middleware");

const router = Router();

router.get("/", clientsGet);

router.put(
  "/:id",
  [
    check("id", "No es un Id Válido").isMongoId(),
    fieldValidate,
  ],
  clientsPut
);

router.post(
  "/",
  [
    check("name", "El nombre ingresado no es válido").not().isEmpty(),
    check("email").custom(existEmail),
    fieldValidate,
  ],
  clientsPost
);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un Id Válido").isMongoId(),
    fieldValidate,
  ],
  clientsDelete
);

module.exports = router;
