const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const Game = require("./models/Game.js");
const Booking = require("./models/Booking.js");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const fs = require("fs");
const mime = require("mime-types");
const path = require("path"); // Add this line to import the 'path' module

require("dotenv").config();
const port = 3000;
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";
const bucket = "dawid-booking-app";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected..."));

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.get("/api/test", (req, res) => {
  res.json("test ok");
});

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          console.log(token, userDoc);
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

app.get("/api/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/api/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/api/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  console.log("link:" + link);
  await imageDownloader.image({
    url: link,
    dest: "/tmp/" + newName,
  });
  const url = await uploadToS3(
    "/tmp/" + newName,
    newName,
    mime.lookup("/tmp/" + newName)
  );
  res.json(url);
});

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // set unique filename
  },
});
const upload = multer({ storage: storage });

app.post("/api/upload", upload.array("photos", 5), async (req, res) => {
  const uploadedFiles = [];
  //console.log(req.files[0]);
  for (let i = 0; i < req.files.length; i++) {
    const { filename } = req.files[i];

    //const url = await uploadToS3(path, originalname, mimetype);
    uploadedFiles.push(filename);
  }
  res.json(uploadedFiles);
});

app.post("/api/games", (req, res) => {
  //const {token} = req.cookies;
  const {
    title,
    location,
    description,
    addedPhotos,
    datetime,
    price,
    maxPlayers,
  } = req.body;
  /*jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    //console.log(userData)
    if (err) throw err;
    const gameDoc = await Game.create({
      owner:userData.id,price,
      title,address,photos:addedPhotos,description,
      perks,extraInfo,checkIn,checkOut,maxGuests,
    });
    res.json(gameDoc);
  });*/
  const gameDoc = Game.create({
    title,
    location,
    description,
    photos: addedPhotos,
    datetime,
    price,
    maxPlayers,
  });
  res.json(gameDoc);
});

app.get("/api/user-games", async (req, res) => {
  /*const {token} = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const {id} = userData;
    res.json( await Game.find({owner:id}) );
  });*/
  res.json(await Game.find());
});

app.get("/api/games/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Game.findById(id));
});

app.put("/api/games", async (req, res) => {
  //const {token} = req.cookies;
  const {
    id,
    title,
    location,
    description,
    addedPhotos,
    //players,
    datetime,
    price,
    maxPlayers,
  } = req.body;
  /*jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const gameDoc = await Game.findById(id);
    if (userData.id === gameDoc.owner.toString()) {
      gameDoc.set({
        title,address,photos:addedPhotos,description,
        perks,extraInfo,checkIn,checkOut,maxGuests,price,
      });
      await gameDoc.save();
      res.json('ok');
    }
  });*/
  const gameDoc = await Game.findById(id);
  // Check if the document is found
  if (!gameDoc) {
    return res.status(404).json({ error: "Game not found" });
  }
  gameDoc.set({
    title,
    location,
    description,
    photos: addedPhotos,
    //players,
    datetime,
    price,
    maxPlayers,
  });
  await gameDoc.save();
  res.json("ok");
});

app.get("/api/games", async (req, res) => {
  res.json(await Game.find());
});

app.post("/api/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { game, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;
  Booking.create({
    game,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/api/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate("game"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
