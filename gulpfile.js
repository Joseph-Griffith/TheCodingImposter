/// <binding ProjectOpened='watch' />
var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();

var webroot = "./wwwroot/";
var paths = {
    scss: webroot + "sass/**/*.scss",
    scssDest: webroot + "css/"
};

gulp.task("compile:sass", function() {
    return gulp
        .src(paths.scss)
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(gulp.dest(paths.scssDest))
        .pipe(browserSync.stream());
});

//browsersync
gulp.task('browserSync', function () {
    var files = [
        webroot + "scripts/**/*.js",
        webroot + "css/**/*.css",
        "Views/**/*.cshtml",
    ];

    browserSync.init(files, {
        proxy: "https://localhost:44354/"
    });
});

gulp.task("watch", function () {
    gulp.watch(paths.scss, gulp.series("compile:sass"));
    //gulp.watch(webroot + "scripts/**/*.js", gulp.series([browserSync.reload]));
    //gulp.watch(webroot + "css/**/*.css", gulp.series[browserSync.reload]);
    //gulp.watch("Views/**/*.cshtml", gulp.series([browserSync.reload]));
});
