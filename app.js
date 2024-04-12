const path = require("path");
const User = require("./models/User");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6619746160c6e77414db9236")
    .then((user) => {
      console.log(user);
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://rohithkasnanaik:NyGsBamf1aHi4dUV@cluster0.tfxy1ax.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((res) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Rohith",
          email: "rohithkasna13@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(3000, () => {
      console.log(`listening to port`);
    });
  });
