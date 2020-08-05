var express = require("express"),
  app = express();

const MongoClient = require("mongodb").MongoClient;

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get("/sayHello", function (request, response) {
  var user_name = request.query.user_name;
  response.end("Hello " + user_name + "!");
});

// Post a message using endpoint
app.get("/message", function (req, res) {
  let message = req.query.message;
  insertMessage(message);
  res.send("Message Inserted");
});

// Endpoint to retrieve messages
app.get("/messages", function (req, res) {
  let data = retrieveMessages(res);
});

// Database Mangement
const uri =
  "mongodb+srv://dbuser:dbuser@sit725-4.uxnw5.mongodb.net/sitboard?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

// Insert Message into database
let messageCollection;

const openConnection = (message) => {
  client.connect((err) => {
    messageCollection = client.db("sitboard").collection("messages");
  });
};

const insertMessage = (message) => {
  messageCollection.insert({ message: message });
};

const retrieveMessages = (res) => {
  let messages = messageCollection.find().toArray(function (err, result) {
    if (err) throw err;
    res.send(result);
    //console.log(result);
  });
};

openConnection();
/*
setTimeout(() => {
  retrieveMessages();
}, 2000);
*/

// Start Server Listen
app.listen(port);
console.log("Listening on port ", port);

require("cf-deployment-tracker-client").track();
