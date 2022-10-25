const router = require("express").Router();
const User = require("./models/user.models");

//CRUD operation on User

//Create user

router.post("/create-user", async (req, res) => {
  const requestBody = req.body;
  if (!requestBody.username || !requestBody.password || !requestBody.email) {
    res.status(500).json({ error: "Request Body is invalid" });
  }
  try {
    const newUser = {
      userId: Math.ceil(Math.random() * 1000),
      username: requestBody.username,
      password: requestBody.password,
      email: requestBody.email,
    };
    const userModel = await new User(newUser);
    userModel
      .save()
      .then((resp) => {
        console.log("User Created", resp);
        res
          .status(201)
          .json({ message: "User Created Successfully", response: resp });
      })
      .catch((err) => {
        console.log("User Creation Failed", err);
        res
          .status(201)
          .json({ message: "User Creation Failed", response: err });
      });
  } catch (err) {
    console.log("Error While Creating User", err);
  }
});


//Update user

router.put("/update-user/:userId", async (req, res) => {
  const requestBody = req.body;
  const userId = req.params.userId;
  if (!userId) {
    res.status(500).json({ error: "User Id is missing" });
  }
  if (
    !requestBody.username ||
    !requestBody.password ||
    !requestBody.email
  ) {
    res.status(500).json({ error: "Request Body is Invalid" });
  }
  const userObject = await User.findOne({ userId });
  if (!userObject) {
    res.status(500).json({ message: "User Id is not found in db",error });
  }
  userObject.username = requestBody.username;
  userObject.email = requestBody.email;
  userObject.password = requestBody.password;

  try {
    const updateResponse = await userObject.save();
    res
      .status(200)
      .json({ message: "User Updated successfully", response: updateResponse });
  } catch (error) {
    console.log("User Updation Failed", error);
    res.status(500).json({ message: "User Updation Failed", error });
  }
});


//Delete user

router.delete("/delete-user/:userId", async (req, res) => {
  const userId = req.params.userId;

  const userObject = await User.findOne({ userId });
  if (!userObject) {
    res.status(500).json({ error: "User Id not found in db" });
  }

  try {
    const deleteResponse = await userObject.delete();
    res
      .status(200)
      .json({ message: "User deleted successfully", response: deleteResponse });
  } catch (error) {
    console.log("User deletion Failed", error);
    res.status(500).json({ message: "User deletion Failed", error });
  }
});


//get all users

router.get("/get-all-users", async (req, res) => {
  try {
    const userData = await User.find()
    res
      .status(200)
      .json({ message: "User data fetched successfully", response: userData });
  }
  catch (error) {
    console.log("Error while fetching the data", error);
    res.status(500).json({ message: "Error while fetching the data", error });
  }
});


//get user based on id

router.get("/get-user/:userId", async (req, res) => {
  const userId = req.params.userId;

  const userData = await User.findOne({ userId });
  if (!userData) {
    res.status(500).json({ error: "User Id not found in db" });
  }

  try {
    res
      .status(200)
      .json({ message: "User data fetched successfully", response: userData });
  }
  catch (error) {
    console.log("Error while fetching the data", error);
    res.status(500).json({ message: "Error while fetching the data", error });
  }
});

module.exports = router;
