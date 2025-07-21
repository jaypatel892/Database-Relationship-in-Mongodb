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

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const findCustomer = async () => {
//   let cust1 = new Customer({
//     name: "Jay Kumar",
//   });

//   let order1 = await Order.findOne({ item: "Chips" });
//   let order2 = await Order.findOne({ item: "Chocolates" });

//   cust1.orders.push(order1);
//   cust1.orders.push(order2);

//   let result = await cust1.save();
//   console.log(result);


// We can use downside  .find({}) and it will only send customer name with orderid only  and we want to use this comment out above from const addCustomer
  let result = await Customer .find({}).populate("orders");
  console.log(result[0]);
  
};
findCustomer();
// const addOrders = async ()=>{
//     let res  = await Order.insertMany([
//         {item:"Samosa", price:12},
//         {item:"Chips", price:10},
//         {item:"Chocolates", price:40},

//     ]);
//     console.log(res);

// }

// addOrders();
