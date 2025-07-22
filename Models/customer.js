// ONE TO MANY RELATIONSHIP IN MONGOOSE

const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("connection succesfull"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Schema of user

const orderSchema = new Schema({
  item: String,
  price: Number,
});

const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

//Mongoose middleware pre and post two types are there
// customerSchema.pre("findOneAndDelete", async () => {
//   console.log("PRE MIDDLEWARE");
// });

customerSchema.post("findOneAndDelete", async (customer) => {
  if (customer.orders.length) {
    let res = await Order.deleteMany({
      _id: {
        $in: customer.orders,
      },
    });
    console.log(res);
  }
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

// Function
const findCustomer = async () => {
  let result = await Customer.find({}).populate("orders");
  console.log(result[0]);
};
// findCustomer();

const addCust = async () => {
  let newCust = new Customer({
    name: "Karan Arjun",
  });

  let newOrder = new Order({
    item: "Burger",
    price: 250,
  });

  newCust.orders.push(newOrder);

  await newOrder.save();
  await newCust.save();
  console.log("Added new customer");
};

//deleteing Customer
const delCust = async () => {
  let data = await Customer.findByIdAndDelete("687f7324350bb9e1d280f539");
  console.log(data);
};

// addCust();
delCust();
