const { Schema, model } = require("mongoose");

const RentalSchema = Schema({
  systemName: {
    type: String,
    require: [true, "El Id del sistema debe ser los primero 3 caracteres de  UID+ArrId-Random"],
  },
  dateFrom: {
    type: String,
    require: [true, "Fecha contrato desde"],
  },
  dateTo: {
    type: String,
    require: [true, "Fecha contrato hasta"],
  },
  status: {
    type: Boolean,
    default: true,
  },
});

RentalSchema.methods.toJSON = function () {
  const { __v, _id, ...rental } = this.toObject();
  rental.uid = _id;
  return rental;
};

module.exports = model("Rental", RentalSchema);
