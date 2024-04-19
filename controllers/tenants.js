const { response, request } = require("express");
const { Router } = require("express");
const TenantModel = require("../models/tenant");
const { check } = require("express-validator");
const { fieldValidate, isAdminRole, validateJWT } = require("../middleware");
const router = Router();

// Endpoint GET
const tenantsGet = async (req = request, res = response) => {
  // const { q, name = "GET ENDPOINT GRUPO 17 ----- PRUEBA", apiKey } = req.query;
  // Query to filter for status = true
  const query = { status: true };

  // const { limit = 20, from = 0 } = req.query; // http://localhost:8080/api/tenant?from=10&limit=2 => return object 11 - 12

  // Getting filtered tenant
  // const tenant = await TenantModel.find(query).skip(from).limit(Number(limit));

  // const totaltenantRegistered = await TenantModel.countDocuments(query);

  // Arrays Destructuring -> Assign first position to Total and Second arrays position to tenant
  const [total, tenant] = await Promise.all([
    TenantModel.countDocuments(query),

    TenantModel.find(query),
  ]);
  res.json({
    total,
    tenant,
  });
};

const getTenantByEmail = async (req = request, res = response) => {
  const { email } = req.params;

  try {
    // Find the tenant by email
    const tenant = await TenantModel.findOne({ email });

    if (!tenant) {
      router.post(
        "/",
        [
          check("name", "El nombre ingresado no es válido").not().isEmpty(),
          // check("email").custom(existEmail),
          fieldValidate,
        ],
        tenantsPost
      );
      return res.json({
        msg: "Tenant not found - A new Record has been created",
      });
    }

    res.json({
      msg: "Tenant found",
      tenant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error finding tenant by email",
      error: error.message,
    });
  }
};

// Endpoint PUT
const tenantsPut = async (req, res = response) => {
  const { id } = req.params;
  const { name, email, img, status, brokerIdAssociated } = req.body;

  // Check if any document in the collection has the provided brokerIdAssociated in its array
  const existingBrokerIdInTheList = await TenantModel.findOne({
    brokerIdAssociated: { $in: [brokerIdAssociated] },
  });

  let tenant; // Define the tenant variable outside the if-else blocks

  console.log(existingBrokerIdInTheList + " LOG")
  if (!existingBrokerIdInTheList) {
    try {
      // Find the tenant by ID and update the fields, appending to brokerIdAssociated
      tenant = await TenantModel.findByIdAndUpdate(
        id,
        {
          name,
          email,
          $push: { brokerIdAssociated: brokerIdAssociated }, // Append to brokerIdAssociated array
        },
        { new: true }
      );
      res.json(tenant);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: "Error updating tenant",
        error: error.message,
      });
    }
  } else {
    try {
      // Find the tenant by ID and update the fields, appending to brokerIdAssociated
      tenant = await TenantModel.findByIdAndUpdate(
        id,
        {
          name,
          email,
          // $push: { brokerIdAssociated: brokerIdAssociated }, // Append to brokerIdAssociated array
        },
        { new: true }
      );
      res.json(tenant);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: "Error updating tenant",
        error: error.message,
      });
    }
  }
};

// Endpoint POST
const tenantsPost = async (req, res) => {
  // const { name, age } = req.body;

  try {
    // Fields to be save in Mongo
    const { name, email, img, status, brokerIdAssociated = "" } = req.body;

    // Check if any document in the collection has the provided brokerIdAssociated in its array
    const existingBrokerIdInTheList = await TenantModel.findOne({
      brokerIdAssociated: { $in: [brokerIdAssociated] },
    });

    let tenant; // Define the tenant variable outside the if-else blocks

    if (existingBrokerIdInTheList) {
      tenant = new TenantModel({ name, email });
    } else {
      tenant = new TenantModel({ name, email, brokerIdAssociated });
    }

    await tenant.save();

    res.status(201).json({
      ok: true,
      tenant,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error creating tenant:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Endpoint DELETE
const tenantsDelete = async (req, res) => {
  const { email } = req.params;

  try {
    console.log("Email to delete:", email);

    // This is to change client status to false
    const tenantToBeDeletedByStatusToFalse = await TenantModel.findOneAndUpdate(
      { email: email },
      { status: false },
      { new: true } // Optional: to return the updated document
    );

    if (!tenantToBeDeletedByStatusToFalse) {
      console.log("Tenant not found.");
      return res.status(404).json({ message: "Tenant not found" });
    }

    console.log(
      "Tenant updated successfully:",
      tenantToBeDeletedByStatusToFalse
    );
    res.json({ tenantToBeDeletedByStatusToFalse });
  } catch (error) {
    console.error("Error deleting tenant:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  tenantsGet,
  tenantsPost,
  tenantsPut,
  tenantsDelete,
  getTenantByEmail,
};
