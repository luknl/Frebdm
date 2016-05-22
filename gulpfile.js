var gulp = require ('gulp'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin')

// --------------  scss  --------------   //
gulp.task('css', function(){
   gulp.src('css/*.scss') // select all css files in css/ folder
        .pipe(sass({outputStyle : 'compressed'}))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('build/css/'))
        .pipe(browserSync.stream());
});

// --------------  html move  --------------   //
gulp.task('html', function(){
   gulp.src('*.html')
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream());
});

// --------------  watch changes  --------------   //
gulp.task('watch', function(){
    browserSync.init({
        server : {
            baseDir : 'build'
        }
    })
    gulp.watch('*.html', ['html']);
    gulp.watch('css/*.scss', ['css']);
    gulp.watch('*.html').on('change', browserSync.reload);
});

// --------------  Minify and copy new images to build  --------------   //
gulp.task('imagemin', function() {
    return gulp.src('img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
})


// what to run when 'gulp' is entered in the terminal //
gulp.task('default', ['css', 'html', 'watch', 'imagemin']);
