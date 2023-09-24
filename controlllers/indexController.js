const { getAll, getById } = require("../services/cubeService.js");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const user = req.user
  console.log(user);
  const cubes = await getAll();
  res.render("index", {
    title: "Browse",
    cubes,
  });
});

router.get("/filter", async (req, res) => {
  const cubes = await getAll();
  const searchValue = req.query.search;
  const fromValue = req.query.from;
  const toValue = req.query.to;
  let filtered = [];
  if (searchValue || toValue || fromValue) {
    console.log(toValue);
    console.log(fromValue);
    filtered = cubes.filter((el) => {
      if (el.difficultyLevel >= fromValue && el.difficultyLevel <= toValue){
        return true;
      }
      if (el.name.toLowerCase().includes(searchValue.toLowerCase()) && searchValue !== ''){
        return true;
      } 
      return false;
    });


    if (filtered.length == 0) {
      res.render("noResults", {
        title: "No Results",
      });
      return;
    }
  }

  res.render("index", {
    title: 'Browse',
    cubes,
    filtered,
  });
});

router.get("/details/:id", async (req, res) => {
  const id = req.params.id;
  const cube = await getById(id).populate('accessories').exec();
  const isEmpty = cube.accessories.length === 0

  if (cube) {
    res.render("details", {
      title : "Cube Details",
      cube,
      isEmpty
    });
  } else {
    res.render("404");
  }
});
module.exports = router;
