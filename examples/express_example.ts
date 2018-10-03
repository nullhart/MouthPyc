const express = require("express");
const mouthPyc = require("../lib/core.js");
const app = express();
const bodyParser = require("body-parser");

const taskScheduler = new mouthPyc({
  verbose: false
});

app.use(bodyParser.json());
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.post("/say", async function(req, res) {
  await res.send(req.body.message);

  let options = {
    message: req.body.message,
    delay: req.body.delay
  };

  taskScheduler.addToQueue(options);
});
console.log(taskScheduler);
taskScheduler.verbose = true;

console.log(taskScheduler);
app.listen(3000, () => console.log(""));
