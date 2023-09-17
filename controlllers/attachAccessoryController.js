const {
  getAllAccessories,
  addAccessory,
} = require("../services/accessoryService.js");
const { getById } = require("../services/cubeService.js");

const router = require("express").Router();

router.get("/:id", async (req, res) => {
  const cube = await getById(req.params.id);
  const accessories = await getAllAccessories(cube.accessories).lean();
  res.render("attachAccessory", {
    accessories,
    cube,
    title: "Attach an Accessory",
  });
});

router.post("/:id", async (req, res) => {
  const accessoryId = req.body.accessory;
  res.redirect("/details/" + req.params.id);
  addAccessory(req.params.id, accessoryId);
});

module.exports = router;
