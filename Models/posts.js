// ONE TO MANY  ONE TO SQUILLIONS

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

const userSchema = new Schema({
  username: String,
  email: String,
});

const postSchema = new Schema({
  content: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose .model("User",userSchema);
const  Post = mongoose .model("Post",postSchema);

const getData = async ()=>{


 let result =  await Post.findOne({}).populate("user","username");
 console.log(result);
 
  //  let user  = await User.findOne({username:"JayKumar"});

  //       let post2 = new Post({
  //       content:  "Bye Bye:)",
  //       likes:23
  //   });

  //   post2.user = user;

  //   await post2.save();
};

getData();

// const del = async ()=> {
//   await Post.findByIdAndDelete("687e2ee27f0592cdbd7cfb42");
//   // await User.findByIdAndDelete("651db5b552cf598a629e0ef9");
// };

// del();
