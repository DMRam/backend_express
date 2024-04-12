const Role = require("../models/role");
const UserModel = require("../models/user");
const RentalModel = require("../models/rental");

const isValidRole = async (role = "") => {
  console.log(role + "<<< ROLE RECEIVED >>> ");
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`El rol ${role} no esta registrado en la BD`);
  }
};

const existEmail = async (email = "") => {
  // Check if email exist
  const emailExists = await UserModel.findOne({ email });
  if (emailExists) {
    throw new Error(`El correo ${email} ya está registrado`);
  }
};

const existUserById = async (id ) => {
  // Check if email exist
  const userExists = await UserModel.findById(id);
  if (!userExists) {
    throw new Error(`El id no existe ${ id }`);
  }
};
const existRentalById = async (id ) => {
  // Check if email exist
  const rentalExists = await RentalModel.findById(id);
  if (!rentalExists) {
    throw new Error(`El id del arriendo no existe ${ id }`);
  }
};

module.exports = {
  isValidRole,
  existEmail,
  existUserById,
  existRentalById
};
