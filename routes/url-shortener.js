const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { shortenURL, getURL, redirectToURL } = require("../controllers/url-shortener");

router.post("/",
    [
        check("url", "Enter a URL").exists(),
        check("url", "Enter a valid URL").isURL(),
    ],
    shortenURL);
router.get("/get-url/:id", getURL);
router.get("/:id", redirectToURL);

module.exports = router;