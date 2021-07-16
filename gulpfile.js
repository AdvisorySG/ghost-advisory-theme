const { series, watch, src, dest, parallel } = require("gulp");
const pump = require("pump");

// gulp plugins and utils
const livereload = require("gulp-livereload");
const postcss = require("gulp-postcss");
const zip = require("gulp-zip");
const webpack = require("webpack-stream");

// postcss plugins
const atImport = require("postcss-import");
const tailwindcss = require("tailwindcss");

function serve(done) {
    livereload.listen();
    done();
}

const handleError = (done) => (err) => done(err);

function hbs(done) {
    pump(
        [src(["*.hbs", "**/*.hbs", "!node_modules/**/*.hbs"]), livereload()],
        handleError(done)
    );
}

function css(done) {
    var processors = [atImport, tailwindcss];

    pump(
        [
            src("assets/css/*.css", { sourcemaps: true }),
            postcss(processors),
            dest("assets/built/", { sourcemaps: "." }),
            livereload(),
        ],
        handleError(done)
    );
}

function js(done) {
    pump(
        [
            src("assets/js/*.js", { sourcemaps: true }),
            webpack(require("./webpack.config.js")),
            dest("assets/built/", { sourcemaps: "." }),
            livereload(),
        ],
        handleError(done)
    );
}

function zipper(done) {
    var targetDir = "dist/";
    var themeName = require("./package.json").name;
    var filename = themeName + ".zip";

    pump(
        [
            src([
                "**",
                "!node_modules",
                "!node_modules/**",
                "!dist",
                "!dist/**",
            ]),
            zip(filename),
            dest(targetDir),
        ],
        handleError(done)
    );
}

const cssWatcher = () => watch("assets/css/**", css);
const jsWatcher = () => watch("assets/js/**", series(js, css));
const hbsWatcher = () =>
    watch(["*.hbs", "**/**/*.hbs", "!node_modules/**/*.hbs"], series(hbs, css));
const watcher = parallel(cssWatcher, jsWatcher, hbsWatcher);
const build = series(css, js);
const dev = series(build, serve, watcher);

exports.build = build;
exports.zip = series(build, zipper);
exports.default = dev;
