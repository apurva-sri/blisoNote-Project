const mongoose = require("mongoose");
const initData = require("./data.js");
const Notelisting = require("../models/listing.js");
const User = require('../models/user.js');

const MONGO_URL = "mongodb://127.0.0.1:27017/notetaking";

main()
  .then(() => {
    console.log("connect to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Notelisting.deleteMany({});
  initData.data = initData.data.map((obj)=>({...obj, owner:'67b85b07e4bb7acbf2b1358f'}));
  await Notelisting.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();

const seedUserDOB = async () => {
  const targetUserId = '67b85b07e4bb7acbf2b1358f';
  const newDOB = new Date("2006-03-24");
  await User.findByIdAndUpdate(targetUserId, { dob: newDOB });
  console.log("User DOB was seeded/updated");
  let user = await User.findById(targetUserId);
  console.log(user);
};

seedUserDOB();

