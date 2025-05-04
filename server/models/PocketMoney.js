const pocketMoneySchema = new mongoose.Schema({
    childId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: Number,
    month: String, // e.g., "May 2025"
    givenBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // parent
    givenAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model("PocketMoney", pocketMoneySchema);
  