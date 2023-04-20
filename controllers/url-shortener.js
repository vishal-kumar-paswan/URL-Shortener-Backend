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
        let { url } = req.body;

        // Adding the https protocol if not exist
        if (!url.startsWith('http')) {
            url = 'https://' + url;
        }

        // Creating a id of length 6
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
        const mainURLData = await ShortenURL.findOne({ id }, '-_id -createdAt -updatedAt -__v').exec();
        if (!mainURLData) {
            return res.status(400).json({ error: "URL does not exists" });
        }
        return res.status(200).json({ url: mainURLData.url });
    } catch (error) {
        return res.status(400).json({ error: `${error}` });
    }
}

exports.redirectToURL = async (req, res) => {
    try {
        const id = req.params.id;
        const mainURLData = await ShortenURL.findOne({ id }, '-_id -createdAt -updatedAt -__v').exec();
        if (!mainURLData) {
            const errorHTMLPageTemplate =
                `<!DOCTYPE html>
                 <html lang="en">
                    <head>
                        <title>Oops! Page not found</title>
                    </head>
                    <body>
                        <h2 style="display: flex; justify-content: center">
                            Sorry, the page you requested doesnot exists!
                        </h2>
                    </body>
                </html>`;
            return res.send(errorHTMLPageTemplate);
        }
        return res.redirect(mainURLData.url);
    } catch (error) {
        return res.status(400).json({ error: `${error}` });
    }
}