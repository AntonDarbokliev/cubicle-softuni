const Cube = require("../models/Cube.js");

function getAll() {
  return Cube.find({}).lean();
}

function getById(id) {
  return Cube.findById(id).lean();
}

async function create(cubeData){
  const cube = {
    name : cubeData.name,
    description : cubeData.description,
    imageUrl : cubeData.imageUrl,
    difficultyLevel : Number(cubeData.difficultyLevel)
  }
  const result = await Cube.create(cube)

  return result
}

module.exports = {
  getAll,
  getById,
  create
};
