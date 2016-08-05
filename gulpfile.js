const gulp = require('gulp');
const sass = require('gulp-sass');
const webserver = require('gulp-webserver');

gulp.task('sass', function(){
  gulp.src('./sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('./css/'));
});

gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('webserver', function() {
  gulp.src('./') // 公開したい静的ファイルを配置したディレクトリを指定する
    .pipe(webserver({
      host: 'localhost',
      port: 8000,
      livereload: true
    }));
});

gulp.task('default', ['webserver','watch']);
