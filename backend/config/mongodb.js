import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected',() => {
        console.log("DB Connected");
    })

    let uri = process.env.MONGODB_URI;
    // If the URI already contains a database name, use as-is. Otherwise, append '/e-commerce'.
    if (!/\/[a-zA-Z0-9_-]+(\?|$)/.test(uri)) {
        uri = uri.replace(/\/?$/, '/e-commerce');
    }
    await mongoose.connect(uri);

}

export default connectDB;