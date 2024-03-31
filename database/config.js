const mongoose = require("mongoose");

const dbConnection = async () => {
    try {

        console.log(process.env.MONGO_DB_ATLAS)
      await mongoose.connect(process.env.MONGO_DB_ATLAS, {
        // useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log("DB Online");
    } catch (error) {
      console.log(error);
      throw new Error("BD error - starting DB");
    }
  };

module.exports = { dbConnection };
