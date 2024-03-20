const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  location: String,
  description: String,
  photos: [String],
  datetime: Date,
  price: Number,
  //players: [String],
  maxPlayers: Number,
});

const GameModel = mongoose.model("Game", gameSchema);

module.exports = GameModel;
