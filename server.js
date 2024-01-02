const mongoose = require("mongoose");

const dbURI = "mongodb+srv://test:1234@cluster0.l3xnnxl.mongodb.net/test";

mongoose.connect(dbURI);

const randomBullshitSchema = new mongoose.Schema(
  {
    // Define schema fields as per your collection
    // For example:
    name: String,
    age: Number,
    // Other fields...
  },
  { collection: "randomBullshit" }
);

const randomBullshit = mongoose.model("RandomBullshit", randomBullshitSchema);

const logAllDocuments = async () => {
  try {
    console.log("Attempting to retrieve all documents...");
    const allDocuments = await randomBullshit.find();
    console.log("All documents retrieved:", allDocuments[0]);
  } catch (error) {
    console.error("Error retrieving documents:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Listen for MongoDB connection events
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
  // Call the function to log all documents once the connection is established
  logAllDocuments();
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
