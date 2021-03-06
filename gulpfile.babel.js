import gulp from 'gulp'
import inject from 'gulp-inject'
import cssnano from 'gulp-cssnano'
import htmlmin from 'gulp-htmlmin'
import browserSync from 'browser-sync'

const server = browserSync.create()

export const serve = () => {
   server.init({server: true})
}

export const build = () => {
   const getContents = (filePath, file) => {
      return file.contents.toString('utf8')
   }

   gulp.src('./src/index.html')
      .pipe(inject(gulp.src('./src/minireset.css'), {
         starttag: '<!-- inject:css:minireset -->',
         relative: true,
         removeTags: true,
         transform: getContents,
      }))
      .pipe(inject(gulp.src('./src/index.css').pipe(cssnano()), {
         starttag: '<!-- inject:css:index -->',
         relative: true,
         removeTags: true,
         transform: getContents,
      }))
      .pipe(inject(gulp.src('./src/music.svg'), {
         starttag: '<!-- inject:svg:music -->',
         relative: true,
         removeTags: true,
         transform: getContents,
      }))
      .pipe(inject(gulp.src('./src/code.svg'), {
         starttag: '<!-- inject:svg:code -->',
         relative: true,
         removeTags: true,
         transform: getContents,
      }))
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('./'))
}

export const watch = () => {
   gulp.watch(['./src/*.css', './src/*.html', './*.svg']).on('all', event => {
      build()
      server.reload()
   })
}

export const dev = gulp.parallel(watch, serve)
export default dev
