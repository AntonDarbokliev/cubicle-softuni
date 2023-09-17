const Accessory = require("../models/Accessories.js");
const Cube = require("../models/Cube.js");
const { getById } = require("./cubeService.js");

function getAllAccessories(accessoryId) {
  return Accessory.find({_id : {$nin:accessoryId}});
}

async function createAccessory(accessoryData) {
  const accessory = {
    name: accessoryData.name,
    imageUrl: accessoryData.imageUrl,
    description: accessoryData.description,
  };
  const result = await Accessory.create(accessory);

  return result;
}


async function addAccessory(cubeId,accessoryId){
  const cube = await Cube.findById(cubeId)
  const accessory = await  Accessory.findById(accessoryId)
  cube.accessories.push(accessoryId)
  accessory.cubes.push(cubeId)
  await cube.save();
  await accessory.save();
}

module.exports = {
  getAllAccessories,
  createAccessory,
  addAccessory
};
