const gulp = require('gulp');
const del = require('del');

const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

const path_libs = './libs'
const path_homepage = '../blacktoolboxlaboratory.github.io';
const path_backup = '../codebase/homepage';

gulp.task('copyVendor', function(done) { 
  /* jQuery */
  gulp.src(['node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest(path_libs+'/jquery/'));

  /* fontawesome */
  gulp.src(['node_modules/@fortawesome/fontawesome-free/css/**/*'])
    .pipe(gulp.dest(path_libs+'/fontawesome/css'));
  gulp.src(['node_modules/@fortawesome/fontawesome-free/webfonts/**/*'])
    .pipe(gulp.dest(path_libs+'/fontawesome/webfonts'));
  
  done();
});

gulp.task('updateHomePage', function(done){
  /* html & ico*/
  gulp.src(['index.html', 'favicon.ico'])
    .pipe(gulp.dest(path_homepage));

  /* style */
  gulp.src(['style/index.css'])
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(path_homepage+'/style'))
  
  /* font */
  gulp.src(['style/google-fonts/*'])
    .pipe(gulp.dest(path_homepage+'/style/google-fonts/'))

  /* libs */
  gulp.src(['libs/**/*'])
    .pipe(gulp.dest(path_homepage+'/libs/'))
  
  /* img */
  gulp.src(['img/**/*'])
    .pipe(gulp.dest(path_homepage+'/img/'))
  
  /* sitemap */
  gulp.src(['sitemap.xml'])
    .pipe(gulp.dest(path_homepage))

  done();
});

gulp.task('backupCodebase', async function(done) {  
  /* clean files */
  await del([path_backup + '/'], {force: true})

  /* src */
  gulp.src(['img/*'])
    .pipe(gulp.dest(path_backup + '/img/'));
  gulp.src(['style/**/*'])
    .pipe(gulp.dest(path_backup + '/style/'));
  /* others */        
  gulp.src([
      '.gitignore',
      'LICENSE',
      'README.md',
      'package.json',
      'package-lock.json',
      'gulpfile.js',
      'index.html',
      'favicon.ico',
      'sitemap.xml'
    ])
    .pipe(gulp.dest(path_backup));
  done();
});