const {src, dest, watch, parallel, series} = require('gulp')

//Plagins
const del           = require('del')
const sass          = require('gulp-sass')(require('sass'))
const uglify        = require('gulp-uglify-es').default
const pug           = require('gulp-pug')
const autoprefixer  = require('gulp-autoprefixer')
const concat        = require('gulp-concat')
const imagemin      = require('gulp-imagemin')
const browserSync   = require('browser-sync').create()

function cleanDist() {
    return del('dist')
}

function styles() {
    return src('src/scss/styles.scss')

    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

function scripts() {
    return src('src/js/*.js')

    .pipe(uglify())
    .pipe(concat('index.min.js'))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

function pugCompiler() {
    return src('src/index.pug')

    .pipe(pug())
    .pipe(dest('dist'))
}

function compressImgs() {
    return src('src/assets/images/**/*.*')

    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('dist/assets/images'))
}

function liveServer() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
}

function watching() {
    watch('src/scss/*.scss', styles),
    watch('src/index.pug', pugCompiler),
    watch('src/index.pug').on('change', browserSync.reload),
    watch('src/js/*.js', scripts)
}

function moveFonts() {
    return src('src/assets/fonts/*.ttf')

    .pipe(dest('dist/assets/fonts/'))
}

exports.watching = watching
exports.liveServer = liveServer
exports.compressImgs = compressImgs
exports.pugCompiler = pugCompiler
exports.styles = styles
exports.moveFonts = moveFonts
exports.cleanDist = cleanDist

exports.default = parallel(watching, liveServer)

// exports.build = series(cleanDist, build)