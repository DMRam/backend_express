const { response, request } = require("express");
const RentalModel = require("../models/rental");
const bcryptjs = require("bcryptjs");

// Endpoint GET
const rentalGet = async (req = request, res = response) => {
  // const { q, name = "GET ENDPOINT GRUPO 17 ----- PRUEBA", apiKey } = req.query;
  
  // Query to filter for status = true
  const query = { status: true };

  const { limit = 5, from = 0 } = req.query; // http://localhost:8080/api/users?from=10&limit=2 => return object 11 - 12

  // Getting filtered Users
  // const users = await UserModel.find(query).skip(from).limit(Number(limit));

  // const totalUsersRegistered = await UserModel.countDocuments(query);

  // Arrays Destructuring -> Assign first position to Total and Second arrays position to users
  const [total, rentals] = await Promise.all([
    RentalModel.countDocuments(query),
    RentalModel.find(query).skip(from).limit(Number(limit)),
  ]);
  res.json({
    total,
    rentals,
  });
};

// Endpoint PUT
const rentalPut = async (req, res = response) => {
  const { id } = req.params;
  const { systemName, dateFrom, dateTo, status } = req.body;

  try {
    // Find the user by ID and update the fields
    const rental = await RentalModel.findByIdAndUpdate(
      id,
      { systemName, dateFrom, dateTo, status },
      { new: true }
    );

    res.json(rental);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error updating rental",
      error: error.message,
    });
  }
};

// Endpoint POST
const rentalPost = async (req, res) => {
  // const { name, age } = req.body;

  // Fields to be save in Mongo
  const { systemName, dateFrom, dateTo, status  } = req.body;
  const rental = new RentalModel({ systemName, dateFrom, dateTo, status });

  await rental.save();

  res.status(201).json({
    ok: true,
    rental,
  });
};

// Endpoint DELETE
const rentalDelete = async (req, res) => {
  const { id } = req.params;

  const uid = req.uid;
  
  // This is to remove an user
  // const userToBeDeleted = await UserModel.findByIdAndDelete(id);

  // This is to change user status to false
  const rentalToBeDeletedByStatusToFalse = await RentalModel.findByIdAndUpdate(id, {
    status: false,
  });
  const rental = req.rental;

  res.json({ rentalToBeDeletedByStatusToFalse, rental });
};

module.exports = {
  rentalGet,
  rentalPost,
  rentalPut,
  rentalDelete,
};
