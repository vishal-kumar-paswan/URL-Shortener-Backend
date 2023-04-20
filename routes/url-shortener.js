const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { shortenURL, getURL } = require("../controllers/url-shortener");

router.post("/",
    [
        check("url", "Enter a URL").exists(),
        check("url", "Enter a valid URL").isURL(),
    ],
    shortenURL);
router.get("/:id", getURL);

module.exports = router;