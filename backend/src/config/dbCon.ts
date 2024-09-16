import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const URI: string = process.env.MONGODB_URI as string;
console.log((URI));

if (!URI) {
    throw new Error("MONGODB_URI environment variable is not set");
}
const DbConnection = () => {
    mongoose.connect(URI).then(() => {
        console.log("DB Connected successfully");
    })
        .catch((err) => {
            console.log(err)
            console.log("Failed to connect DB");
        });
};

export default DbConnection;
