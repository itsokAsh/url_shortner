import mongoose, {connect} from "mongoose";
console.log("Mongo readyState:", mongoose.connection.readyState);

const {
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_DATABASE,
    MONGODB_HOST,
    MONGODB_DOCKER_PORT,
} = process.env;

const MONGODB_URI:string | undefined = process.env.MONGO_URI ;
export const connectToMongoDB = async () => {
  try {
    console.log("Connecting to:", process.env.MONGO_URI);

    await connect(process.env.MONGO_URI!);

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