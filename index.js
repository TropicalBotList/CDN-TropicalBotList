const express = require('express');
const path = require('path');
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const chalk = require("chalk");
const { port } = require("./config.js");
var fs = require('fs');
const { Console } = require('console');
var app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

(async () => {
app.listen(port, () => {
        console.log(chalk.greenBright('[WEB STARTUP]'), `CDN running on port ${port}.`);
    })
})();

function loadRoutes() {
    const routesPath = path.join(__dirname, "./routes");
    fs.readdir(routesPath, (err, files) => {
        if (err) {
            throw err;
        }
        files.forEach(filename => {
            const route = require(path.join(routesPath, filename));
            const routePath = filename === "index.js" ? "/" : `/${filename.slice(0, -3)}`;

            try {
                app.use(routePath, route);
                console.log(chalk.yellowBright('[LOADING ENDPOINT]'), `${routePath}`);
            } catch (error) {
                console.log(chalk.redBright('[WEB STARTUP ERROR] (Failed to load route)'), `Error occured with the route "${filename}":\n\n${error} Ignoreing continuing`);
            }
        });
    });
    return this;
}

loadRoutes();
