// const { MongoClient, ServerApiVersion } = require("mongodb");

// let _db;

// const mongoconnect = (callback) => {
//   MongoClient.connect(
//     "mongodb+srv://rohithkasnanaik:NyGsBamf1aHi4dUV@cluster0.tfxy1ax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//   )
//     .then((client) => {
//       console.log("mongodb connected");
//       _db = client.db();
//       callback(client);
//     })
//     .catch((err) => {
//       console.log("an error occured");
//     });
// };

// const getDb = () => {
//   if (_db) {
//     return _db;
//   }
//   throw "no Database found";
// };

// exports.mongoconnect = mongoconnect;
// exports.getDb = getDb;
