const Accessory = require("../models/Accessories.js");

function getAllAccessories() {
  return Accessory.find({}).lean();
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

module.exports = {
  getAllAccessories,
  createAccessory,
};
