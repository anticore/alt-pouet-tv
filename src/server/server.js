const express = require("express");
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const adapter = new FileAsync("./pouet.json");
low(adapter)
    .then((db) => {
        app.get("/prods/:id", (req, res) => {
            const prod = db.get("prods").find({ id: req.params.id }).value();
            res.send(prod);
        });

        app.get("/random", (req, res) => {
            let types = req.query.types.split(",");
            let platforms = req.query.platforms.split(",");
            let minimumOfCdc = req.query.minimumOfCdc;

            const prod = db
                .get("prods")
                .filter((prod) => {
                    let prodPlatforms = Object.values(prod.platforms).map(
                        (p) => p.slug
                    );

                    let hasYoutube =
                        prod.downloadLinks.length > 0 &&
                        prod.downloadLinks.some((dlLink) =>
                            dlLink.link.includes("youtube")
                        );

                    let hasMinimumOfCdc = prod.cdc >= minimumOfCdc;

                    return (
                        types.some((t) => prod.types.includes(t)) &&
                        platforms.some((p) => prodPlatforms.includes(p)) &&
                        hasYoutube &&
                        hasMinimumOfCdc
                    );
                })
                .sample()
                .value();

            res.send(prod);
        });

        return db;
    })
    .then(() => {
        app.listen(3001, () => console.log("listening on port 3001"));
    });
