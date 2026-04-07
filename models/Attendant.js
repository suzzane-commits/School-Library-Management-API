const mongoose = require('mongoose');
const attendantSchema = new mongoose.Schema({
    name:{ type: String, required: true},
    staffId: { type: String, unique: true }, 
}, { timestamps: true});
const Attendant= mongoose.model('Attendant', attendantSchema);
module.exports = Attendant;