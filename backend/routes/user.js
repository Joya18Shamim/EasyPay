// backend/routes/user.js
const express = require("express");

const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middlware");

// signup
const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const userId = user._id;

  // Create new account

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});
// signin
const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

// updating

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, { $set: req.body });

  res.json({
    message: "Updated successfully",
  });
});

// Route to get users from the backend, filterable via firstName/lastName
// Route to get users from the backend, filterable via firstName/lastName
router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    const currentUserId = req.userId;

    try {
        const users = await User.find({
            _id: { $ne: currentUserId }, // Exclude the logged-in user
            $or: [
                { firstName: { $regex: filter, $options: 'i' } }, // Case-insensitive search
                { lastName: { $regex: filter, $options: 'i' } }
            ]
        });

        res.json({
            users: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Route to get the details of the current user
router.get("/details", authMiddleware, async (req, res) => {
  try {
    // Fetch the user details using the userId from the authMiddleware
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the user's details
    res.json({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
