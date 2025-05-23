import gulp from "gulp";
import cp from "child_process";
import log from "fancy-log";
import BrowserSync from "browser-sync";
import webpack from "webpack";
import webpackConfig from "./webpack.conf";
import svgstore from "gulp-svgstore";
import svgmin from "gulp-svgmin";
import inject from "gulp-inject";

const browserSync = BrowserSync.create();
//const hugoBin = `./bin/hugo.${process.platform === "win32" ? "exe" : process.platform}`;
const hugoBin = "hugo";
const defaultArgs = ["-d", "../dist", "-s", "site"];

if (process.env.DEBUG) {
  defaultArgs.unshift("--debug");
}

// Helper function
function buildSite(cb, options) {
  const args = options ? defaultArgs.concat(options) : defaultArgs;

  return cp.spawn(hugoBin, args, {stdio: "inherit"}).on("close", (code) => {
    if (code === 0) {
      browserSync.reload({notify: false});
      cb();
    } else {
      browserSync.notify("Hugo build failed :(");
      cb("Hugo build failed");
    }
  });
}

// Task functions
function jsTask(cb) {
  const myConfig = Object.assign({}, webpackConfig);

  webpack(myConfig, (err, stats) => {
    if (err) throw new Error(`Webpack error: ${err}`);
    log("[webpack]", stats.toString({
      colors: true,
      progress: true
    }));
    browserSync.reload();
    cb();
  });
}

function hugoTask(cb) {
  buildSite(cb);
}

function hugoPreviewTask(cb) {
  buildSite(cb, ["--buildDrafts", "--buildFuture"]);
}

function svgTask() {
  const svgs = gulp
    .src("site/static/img/icons-*.svg")
    .pipe(svgmin())
    .pipe(svgstore({inlineSvg: true}));

  function fileContents(filePath, file) {
    return file.contents.toString();
  }

  return gulp
    .src("site/layouts/partials/svg.html")
    .pipe(inject(svgs, {transform: fileContents}))
    .pipe(gulp.dest("site/layouts/partials/"));
}

// Server-related helper functions
function serverInit(done) {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  done();
}

function watchFiles() {
  gulp.watch("./src/js/**/*.js", jsTask); // Use function reference
  gulp.watch("./site/static/img/icons-*.svg", svgTask); // Use function reference
  gulp.watch("./site/**/*", hugoTask); // Use function reference
}

// Register individual tasks with Gulp
gulp.task("js", jsTask);
gulp.task("hugo", hugoTask);
gulp.task("hugo-preview", hugoPreviewTask);
gulp.task("svg", svgTask);

// Register composite tasks with Gulp
gulp.task("build", gulp.series(jsTask, hugoTask));
gulp.task("build-preview", gulp.series(jsTask, hugoPreviewTask));
gulp.task("server", gulp.series(gulp.parallel(hugoTask, jsTask, svgTask), serverInit, watchFiles));

// Optional: export for direct import if needed, but gulp.task should be enough for CLI
// export { jsTask, hugoTask, svgTask, build, buildPreview, server };
