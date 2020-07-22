


//HTML,CSS,JSファイルが保存されたタイミングでリロード
const gulp = require('gulp');
const browserSync = require('browser-sync');
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

gulp.task("default", function () {
    return gulp.src("css/style.css")
      .pipe(postcss([
        autoprefixer({
          browsers: [
              "last 2 versions",
              "ie >= 11",
              "Android >= 4"
          ],
          cascade: false
        })
      ]))
      .pipe(gulp.dest("dist"));
  });

//サーバーを立ち上げる
gulp.task('browser-sync', (done) => {
    browserSync.init({
        server: {
            baseDir: "./",
            index :'index.html'
        },
    });
    done();
});


//ブラウザのリロード
gulp.task('browser-reload', ( done ) => {
    browserSync.reload();
    done();
});

//監視ファイル
gulp.task('watch-files', ( done ) => {
   gulp.watch("./*.html", gulp.task('browser-reload'));
   gulp.watch("./css/*.css", gulp.task('browser-reload'));
   gulp.watch("./js/*.js", gulp.task('browser-reload'));
   done();
});

//タスクの実行
gulp.task('default', gulp.series( gulp.parallel('watch-files', 'browser-sync'),
( done ) => {
    done();
}));
