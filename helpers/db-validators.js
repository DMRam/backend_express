const Role = require("../models/role");
const UserModel = require("../models/user");

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

module.exports = {
  isValidRole, existEmail
};
