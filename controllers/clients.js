const { response, request } = require("express");
const ClientModel = require("../models/client");
// Endpoint GET
const clientsGet = async (req = request, res = response) => {
  // const { q, name = "GET ENDPOINT GRUPO 17 ----- PRUEBA", apiKey } = req.query;
  // Query to filter for status = true
  const query = { status: true };

  const { limit = 5, from = 0 } = req.query; // http://localhost:8080/api/clients?from=10&limit=2 => return object 11 - 12

  // Getting filtered clients
  // const clients = await ClientModel.find(query).skip(from).limit(Number(limit));

  // const totalclientsRegistered = await ClientModel.countDocuments(query);

  // Arrays Destructuring -> Assign first position to Total and Second arrays position to clients
  const [total, clients] = await Promise.all([
    ClientModel.countDocuments(query),

    ClientModel.find(query).skip(from).limit(Number(limit)),
  ]);
  res.json({
    total,
    clients,
  });
};

// Endpoint PUT
const clientsPut = async (req, res = response) => {
  const { id } = req.params;
  const { name, email,  } = req.body;

  try {
    // Find the client by ID and update the fields
    const client = await ClientModel.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );

    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error updating client",
      error: error.message,
    });
  }
};

// Endpoint POST
const clientsPost = async (req, res) => {
  // const { name, age } = req.body;

  // Fields to be save in Mongo
  const { name, email, } = req.body;
  const client = new ClientModel({ name, email});

  await client.save();

  res.status(201).json({
    ok: true,
    msg: "post - API - controller GRUPO 17",
    client,
  });
};

// Endpoint DELETE
const clientsDelete = async (req, res) => {
  const { id } = req.params;

  const uid = req.uid;
  
  // This is to remove an client
  // const clientToBeDeleted = await ClientModel.findByIdAndDelete(id);

  // This is to change client status to false
  const clientToBeDeletedByStatusToFalse = await ClientModel.findByIdAndUpdate(id, {
    status: false,
  });
  const client = req.client;

  res.json({ clientToBeDeletedByStatusToFalse, client });
};

module.exports = {
  clientsGet,
  clientsPost,
  clientsPut,
  clientsDelete,
};
