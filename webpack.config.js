const glob = require("glob");
const path = require("path");

module.exports = {
    mode: "production",
    entry: Object.fromEntries(
        glob
            .sync("./assets/js/*.js")
            .map((file) => [path.parse(file).name, file])
    ),
    output: {
        path: path.resolve(__dirname, "./assets/built/"),
        filename: "[name].js",
    },
    module: {
        rules: [{ test: /\.hbs$/, loader: "handlebars-loader" }],
    },
};
