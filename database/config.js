const mongoose = require("mongoose");

const dbConnection = async () => {
    try {

      let db = 'mongodb+srv://danny_immobilier:6GDTWv7ACxwQPE6w@grupo17.ixwronn.mongodb.net/'
        // console.log(process.env.MONGODB_CNN)
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log("DB Online");
    } catch (error) {
      console.log(error);
      throw new Error("BD error - starting DB");
    }
  };

module.exports = { dbConnection };
