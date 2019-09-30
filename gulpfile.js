const gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    cssImport = require('postcss-import'),
    postcss = require('gulp-postcss'),
    postcssPresetEnv = require('postcss-preset-env'),
    purgecss = require('gulp-purgecss'),
    rename = require('gulp-rename');

const paths = {
    html: {
        src: './*.html'
    },
    css: {
        src: './postcss/*.css',
        dest: './css/'
    }
};

function html() {
    return gulp.src(paths.html.src, {
        since: gulp.lastRun(html)
    });
}

function css() {
    return gulp
        .src('./postcss/main.css')
        .pipe(postcss([cssImport, postcssPresetEnv({ stage: 0 })]))
        .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(
            purgecss({
                content: [paths.html.src]
            })
        )
        .pipe(
            rename({
                basename: 'style'
            })
        )
        .pipe(gulp.dest(paths.css.dest))
        .pipe(browsersync.stream());
}

function watch() {
    browsersync.init({
        open: false,
        notify: false,
        server: {
            baseDir: './'
        }
    });
    gulp.watch(paths.css.src, css);
    gulp.watch(paths.html.src).on('change', browsersync.reload);
}

exports.html = html;
exports.css = css;
exports.watch = watch;
exports.default = watch;
