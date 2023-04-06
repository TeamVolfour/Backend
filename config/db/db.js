const mongoose = require("mongoose");

const uri = process.env.URI || 'mongodb+srv://turbold:Hello0220@project-volfour.udnrh0e.mongodb.net/?retryWrites=true&w=majority'

const connect = async () => {
    console.log(uri)
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(uri);
        console.log("\x1b[33mSuccesfully connected to MongoDB\x1b[0m\n");
    } catch (error) {
        console.log(error);
        throw new Error(error).message(error.message);
    }
}
module.exports = { connect }