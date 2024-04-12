const { Schema, model } = require("mongoose");

const ClientSchema = Schema({
  name: {
    type: String,
    require: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    require: [true, "El correo es obligatorio"],
    unique: true,
  },
  img: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

ClientSchema.methods.toJSON = function () {
  const { __v, _id, ...client } = this.toObject();
  client.uid = _id;
  return client;
};

module.exports = model("Client", ClientSchema);
