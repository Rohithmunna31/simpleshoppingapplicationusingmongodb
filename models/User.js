const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;
const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    (this.name = username),
      (this.email = email),
      (this.cart = cart),
      (this._id = id);
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addtoCart(product) {
    const cartProductIndex = this.cart.item.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartitems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.item[cartProductIndex].quantity + 1;
      updatedCartitems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartitems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = {
      items: updatedCartitems,
    };
    const db = getDb();
    db.collection("users").updateOne(
      { _id: new ObjectId(this._id) },
      { $set: { cart: updatedCart } }
    );
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.item.map((i) => {
      return i.productId;
    });
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id;
            }).quantity,
          };
        });
      });
  }

  deleteItemFromCart(productId) {
    const updatedCartitems = this.cart.items.filter((item) => {
      return item.productId.string() !== productId;
    });

    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartitems } } }
      );
  }
}

module.exports = User;
