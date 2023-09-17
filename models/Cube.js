const { Schema, model, Types, default: mongoose } = require("mongoose");

const cubeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl : { type : String , required : true, },
  difficultyLevel : {type: Number,  required : true},
  accessories : [{type:mongoose.Types.ObjectId, ref : 'Accessory',default : []}]
});

const Cube = model('Cube', cubeSchema)

module.exports = Cube
