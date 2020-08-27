import mongoose from "mongoose";

/*
Approach based on:
https://docs.atlas.mongodb.com/best-practices-connecting-to-aws-lambda/
*/

let cachedDb = null;

async function connectToDatabase() {
  // console.log("=> connect to database");

  if (cachedDb) {
    // console.log("=> using cached database instance");
    return cachedDb;
  }

  try {
    // console.log("=> establshing connection now...");
    const db = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost/upkeep3",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    cachedDb = db;
    return cachedDb;
  } catch (error) {
    console.error(error);
  }
}

export default connectToDatabase;
