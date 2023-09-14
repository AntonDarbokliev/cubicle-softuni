const { getAll, getById } = require("../services/cubeService.js");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const cubes = await getAll();
  console.log(req.query);
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
    filtered = cubes.filter((el) => {
      if (el.name.toLowerCase() === searchValue.toLowerCase()) return true;
      else if (el.difficultyLevel >= fromValue && el.difficultyLevel <= toValue)
        return true;
      return false;
    });

    if (filtered.length == 0) {
      res.render("noResults", {
        title: "No Results",
      });
      return;
    }
  }

  console.log(filtered);

  res.render("index", {
    title: "Browse",
    cubes,
    filtered,
  });
});

router.get("/details/:id", async (req, res) => {
  const id = req.params.id;
  const cube = await getById(id);
  if (cube) {
    res.render("details", {
      cube,
    });
  } else {
    res.render("404");
  }
});
module.exports = router;
