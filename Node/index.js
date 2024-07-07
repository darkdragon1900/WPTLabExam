const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://admin:admin@cluster0.c18jqog.mongodb.net/sample")
  .then(() => {
    console.log("Connected!!");
  });

const Schema = mongoose.Schema;
const loginSchema = new Schema({
  username: String,
  password: String,
});

const MyModel = mongoose.model("logins", loginSchema);

var express = require("express");
const app = express();
app.use(express.json());

app.get("/login/all", async (req, res) => {
  try {
    var ans = await MyModel.find();
    res.status(200).send(ans);
  } catch (error) {
    res.status(500).send("fail to load data....");
  }
});

app.get("/login/id/:id", async (req, res) => {
  try {
    var ans = await MyModel.findById(req.params.id);
    if (!ans) {
      return res.status(404).send("Not Found");
    }
    res.status(200).send(ans);
  } catch (error) {
    res.status(500).send("fail to load data(id)....");
  }
});

app.get("/login/username/:username", async (req, res) => {
  try {
    var ans = await MyModel.findOne({ username: req.params.username });
    if (!ans) {
      return res.status(404).send("Not Found");
    }
    res.status(200).send(ans);
  } catch (error) {
    res.status(500).send("fail to load data(username)....");
  }
});

app.post("/login/add", async (req, res) => {
  try {
    var ans = await MyModel.create(req.body);
    res.status(201).send(ans);
  } catch (error) {
    res.status(500).send("fail to create data....");
  }
});

app.put("/login/update/:id", async (req, res) => {
  try {
    var updateLogin = await MyModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updateLogin) {
      return res.status(404).send("Not Found");
    }
    res.status(200).send(updateLogin);
  } catch (error) {
    res.status(500).send("fail to update data...");
  }
});

app.delete("/login/delete/:id", async (req, res) => {
  try {
    var deleteLogin = await MyModel.findByIdAndDelete(req.params.id);
    if (!deleteLogin) {
      return res.status(404).send("Not Found");
    }
    res.status(200).send(deleteLogin);
  } catch (error) {
    res.status(500).send("fail to delete data")
  }
})

app.listen(9595)