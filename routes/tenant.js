const { Router } = require("express");
const { check } = require("express-validator");
const {
  tenantsGet,
  tenantsPut,
  tenantsPost,
  tenantsDelete,
  getTenantByEmail,
} = require("../controllers/tenants");

const { existEmail } = require("../helpers/db-validators");
const { fieldValidate, isAdminRole, validateJWT } = require("../middleware");

const router = Router();

router.get("/", tenantsGet);

router.put(
  "/:id",
  [check("id", "No es un Id Válido").isMongoId(), fieldValidate],
  tenantsPut
);

// Define the route for getting a tenant by email
router.get(
  "/email/:email",
  [check("email", "Email no válido").isEmail(), fieldValidate],
  getTenantByEmail
);

router.post(
  "/",
  [
    check("name", "El nombre ingresado no es válido").not().isEmpty(),
    // check("email").custom(existEmail),
    fieldValidate,
  ],
  tenantsPost
);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un Id Válido").isMongoId(),
    fieldValidate,
  ],
  tenantsDelete
);
module.exports = router;
