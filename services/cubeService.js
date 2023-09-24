const Cube = require("../models/Cube.js");

function getAll() {
  return Cube.find({}).lean();
}

function getById(id) {
  return Cube.findById(id).lean();
}

async function create(cubeData) {
  const cube = {
    name: cubeData.name,
    description: cubeData.description,
    imageUrl: cubeData.imageUrl,
    difficultyLevel: Number(cubeData.difficultyLevel),
  };
  const result = await Cube.create(cube);

  return result;
}

async function update(cubeId, cubeData) {
  const cube = await Cube.findById(cubeId);
  console.log(cube);

  cube.name = cubeData.name;
  cube.description = cubeData.description;
  cube.imageUrl = cubeData.imageUrl;
  cube.difficultyLevel = Number(cubeData.difficultyLevel);

  await cube.save()

  return cube 
}

module.exports = {
  getAll, 
  getById,
  create,
  update
};
