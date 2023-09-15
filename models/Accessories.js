const { Schema, model, Types } = require("mongoose");

const accessorySchema = new Schema({
    name : { type : String, required : true},
    imageUrl : { type : String, required : true},
    description : { type : String, required : true, max : 150},
    cubes : { type : [Types.ObjectId], required : true , default: [] , ref : 'Cube'}  
});

const Accessory = model('Accessory', accessorySchema)

module.exports = Accessory
