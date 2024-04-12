const { response, request } = require("express");
const TenantModel = require("../models/tenant");
// Endpoint GET
const tenantsGet = async (req = request, res = response) => {
  // const { q, name = "GET ENDPOINT GRUPO 17 ----- PRUEBA", apiKey } = req.query;
  // Query to filter for status = true
  const query = { status: true };

  const { limit = 5, from = 0 } = req.query; // http://localhost:8080/api/tenant?from=10&limit=2 => return object 11 - 12

  // Getting filtered tenant
  // const tenant = await TenantModel.find(query).skip(from).limit(Number(limit));

  // const totaltenantRegistered = await TenantModel.countDocuments(query);

  // Arrays Destructuring -> Assign first position to Total and Second arrays position to tenant
  const [total, tenant] = await Promise.all([
    TenantModel.countDocuments(query),

    TenantModel.find(query).skip(from).limit(Number(limit)),
  ]);
  res.json({
    total,
    tenant,
  });
};

// Endpoint PUT
const tenantsPut = async (req, res = response) => {
  const { id } = req.params;
  const { name, email  } = req.body;

  try {
    // Find the tenant by ID and update the fields
    const tenant = await TenantModel.findByIdAndUpdate(
      id,
      { name, email },
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
};

// Endpoint POST
const tenantsPost = async (req, res) => {
  // const { name, age } = req.body;

  // Fields to be save in Mongo
  const { name, email, } = req.body;
  const tenant = new TenantModel({ name, email});

  await tenant.save();

  res.status(201).json({
    ok: true,
    msg: "post - API - controller GRUPO 17",
    tenant,
  });
};

// Endpoint DELETE
const tenantsDelete = async (req, res) => {
  const { id } = req.params;

  const uid = req.uid;
  
  // This is to remove an tenant
  // const tenantToBeDeleted = await TenantModel.findByIdAndDelete(id);

  // This is to change tenant status to false
  const tenantToBeDeletedByStatusToFalse = await TenantModel.findByIdAndUpdate(id, {
    status: false,
  });
  const tenant = req.tenant;

  res.json({ tenantToBeDeletedByStatusToFalse, tenant });
};

module.exports = {
  tenantsGet,
  tenantsPost,
  tenantsPut,
  tenantsDelete,
};
