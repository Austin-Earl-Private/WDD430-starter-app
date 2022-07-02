
const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String },
  url: { type: String, required: true },
  children: { type: [{id:String,name:String,url:String}]},
  description: {type: String}
});

module.exports = mongoose.model('Document', messageSchema);
