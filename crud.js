const mongoose = require('mongoose');

const uri = "mongodb+srv://gpardasaradi2907_db_user:L3Pv4ENqjXUtr9En@cluster0.8xcixji.mongodb.net/?appName=Cluster0";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.error("MongoDB connection error:", err));
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);

async function createUser() {
  const user = new User({
    name: "CSE",
    email: "CSE@example.com",
    age: 18,
  });
  await user.save();
  console.log("User created:", user);
}

async function getUsers() {
  const users = await User.find();
  console.log("All users:", users);
}

async function getUserByEmail(email) {
  const user = await User.findOne({ email });
  console.log("Found user:", user);
}

async function updateUser(email) {
  const user = await User.findOneAndUpdate(
    { email },
    { age: 30 },
    { new: true }
  );
  console.log("Updated user:", user);
}

async function deleteUser(email) {
  const result = await User.deleteOne({ email });
  console.log("Deleted user:", result);
}

async function runCRUD() {
  await createUser();
  await getUsers();
  await getUserByEmail("CSE@example.com");
  await updateUser("CSE@example.com");
  await deleteUser("CSE@example.com");
  await getUsers();
}

runCRUD();
