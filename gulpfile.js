var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create();

// compile sass to css
gulp.task('css', function() {
// compile sass
// output file to a dist folder
  return gulp.src(['./src/sass/main.scss'])
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.cssmin())
    .pipe(plugins.autoprefixer())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

// javascript task
  gulp.task('js', function() {
    return gulp.src([
      './node_modules/jquery/dist/jquery.min.js',
      './src/js/main.js',
    ])
    .pipe(plugins.plumber())
    .pipe(plugins.babel({
      presets: ['es2015']
    }))
    .pipe(plugins.concat('main.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
  });

// image taks
  gulp.task('images', function() {
    return gulp.src(['./src/img/*'])
    .pipe(plugins.imagemin())
    .pipe(gulp.dest('./dist/img'))
  });

  // watch for file changes and run tasks
  gulp.task('watch', function() {
    gulp.watch(['./src/sass/*.scss'], ['css']);
    gulp.watch(['./src/js/*.js'], ['js']);
  });

// serve our app through browserSync
  gulp.task('serve', function() {
    browserSync.init ({
      server: {
          baseDir: './'
      }
    })
  });

  gulp.watch('*.html').on('change', browserSync.reload);

  gulp.task('default', ['css', 'js', 'images', 'watch', 'serve']);
