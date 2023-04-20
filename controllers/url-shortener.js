const ShortenURL = require("../models/shorten-url");
const { validationResult } = require("express-validator");

exports.shortenURL = async (req, res) => {
    try {
        // Checking errors in req if exists
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: errors.array()[0].msg,
                params: errors.array()[0].param,
            });
        }
        const { url } = req.body;
        // Creating a id of length - 6
        const id = Math.random().toString(36).substring(2, 8);
        const shortenURL = new ShortenURL({ id: id, url: url });
        await shortenURL.save();
        return res.status(200).json({ shortenURL: `https://tinylink-io.vercel.app/${id}` });
    } catch (error) {
        return res.status(400).json({ error: `ERROR: ${error}` });
    }
}

exports.getURL = async (req, res) => {
    try {
        const id = req.params.id;
        const mainURL = await ShortenURL.findOne({ id }, '-_id').exec();
        if (mainURL)
            return res.status(200).json({ url: mainURL.url });
        return res.status(400).json({ error: "URL does not exists" });
    } catch (error) {
        return res.status(400).json({ error: `ERROR: ${error}` });
    }
}