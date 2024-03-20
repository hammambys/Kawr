const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  game: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Game" },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["confirmed", "pending", "rejected"],
    default: "pending",
  },
});
/*game,
    name,
    phone,
    user: userData.id,
    status:"pending"
*/
const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;
