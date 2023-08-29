var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
const { Review } = require("../models");
const v = new Validator();

// API CREATE
// method post data
router.post("/", async function (req, res) {
  // schema validasi
  console.log(req.body);
  const schema = {
    name: { type: "string", empty: false },
    url: { type: "string", empty: false },
    description: { type: "string", empty: false },
    rating: { type: "number", empty: false },
  };

  // mengambil response body
  const validate = v.validate(req.body, schema);

  // validasi pesan error (bad parameter)
  if (validate !== true) {
    console.log("Validation errors:", validate);
    return res.status(400).json(validate);
  }

  // return simpan ke database
  const review = await Review.create(req.body);
  res.json(review);
});

// method get
router.get("/", async (req, res) => {
  const review = await Review.findAll();
  return res.json(review);
});
// method get by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const review = await Review.findByPk(id);
  return res.json(review || {});
});

// method delete
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const review = await Review.findByPk(id);

  if (!review) {
    return res.json({ message: "Review not found" });
  }

  await review.destroy();

  res.json({
    message: "Review is deleted",
  });
});
// method put/update
router.put("/:id", async (req, res) => {
  // mengambil id
  const id = req.params.id;

  let review = await Review.findByPk(id);

  if (!review) {
    return res.json({ message: "Review not found" });
  }
  const schema = {
    name: "string|optional",
    url: "string|optional",
    description: "string|optional",
    rating: "number|optional",
  };

  const validate = v.validate(req.body, schema);
  // validaet akanmmenghasilkan array, jika arraya da isinya/tidk length maka ada ada field yg error
  if (validate.length) {
    return res.status(400).json(validate);
  }
  // mengambil review yg sedang diupdatem bukan semua review
  review = await review.update(req.body);
  res.json(review);
});

module.exports = router;
