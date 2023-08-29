var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// router.get("/person", (req, res) => {
//   res.json([
//     {
//       id: "1",
//       image: "htttps://behancerandom.com",
//       name: "Angger",
//       description: "aajohldiwgdoiwqgdgqouwyi",
//       rating: "5",
//     },
//   ]);
// });

module.exports = router;
