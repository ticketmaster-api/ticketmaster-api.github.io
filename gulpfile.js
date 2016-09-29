var gulp  = require('gulp');
var shell = require('gulp-shell');

gulp.task('server', shell.task([
  'jekyll serve --no-watch'
]));

gulp.task('js', shell.task([
  'webpack'
]));

gulp.task('serve', shell.task([
  'jekyll build -I --limit_posts 1'
]));

gulp.task('watch', function () {
  gulp.watch([
    'scripts/api-explorer/v2/components/*.js',
    'scripts/api-explorer/v2/ViewModels/*.js'
  ], ['js']);

  gulp.watch([
    '/**/*.html',
    'scripts/**/*.js',
    '_sass/**/*.scss'
  ], ['serve']);
});

gulp.task('default', ['server', 'js', 'serve', 'watch']);
