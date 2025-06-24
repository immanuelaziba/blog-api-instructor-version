"use strict";

const router = require("express").Router();
 /* GET home page. */

 router.get('/', (req, res) => {
  res.json({
    message: "Hello, Immanuel Aziba",
  });
});

module.exports = router;