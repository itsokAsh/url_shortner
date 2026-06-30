import mongoose, {connect} from "mongoose";
console.log("Mongo readyState:", mongoose.connection.readyState);

const {
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_DATABASE,
    MONGODB_HOST,
    MONGODB_DOCKER_PORT,
} = process.env;

export const connectToMongoDB = async () => {
  try {
    let uri = process.env.MONGO_URI;
    let displayUri = "MongoDB URI with credentials hidden";
    if (!uri) {
      uri = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_DOCKER_PORT}/${MONGODB_DATABASE}?authSource=admin`;
      displayUri = `mongodb://${MONGODB_HOST}:${MONGODB_DOCKER_PORT}/${MONGODB_DATABASE}`;
    }
    
    console.log("Connecting to:", displayUri);

    await connect(uri!);

    console.log("Connected!");
    console.log("readyState:", mongoose.connection.readyState);

    mongoose.connection.on("error", (err) => {
      console.error("Mongo Error:", err);
    });
  } catch (err) {
    console.error("Connect Error:", err);
    throw err;
  }
};