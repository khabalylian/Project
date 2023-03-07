import imagemin from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';

import gulp from 'gulp'
import browserSync from 'browser-sync';
import autoPrefixer from 'gulp-autoprefixer';
import { mapSources } from 'gulp-sourcemaps';
import minifyCSS from 'gulp-minify-css';
import GulpUglify from 'gulp-uglify';
import gulpSass from 'gulp-sass';
import watch from 'gulp-watch';

var reload = browserSync.reload;

var path = {
    build: {
        //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        icon: 'build/icons/'
    },
    src: {
        //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/script.js', //В стилях и скриптах нам понадобятся только main файлы
        style: 'src/style/style.css',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        icon: 'src/icons/**/*.*'
    },
    watch: {
        //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.css',
        img: 'src/img/**/*.*',
        icon: 'src/icons/**/*.*'
    },
    clean: './build'
};

gulp.task('html:build', async function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({ stream: true })); //И перезагрузим наш сервер для обновлений
});

gulp.task('js:build', async function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(mapSources.init()) //Инициализируем sourcemap
        .pipe(GulpUglify()) //Сожмем наш js
        .pipe(mapSources.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({ stream: true })); //И перезагрузим сервер
});

gulp.task('style:build', async function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(mapSources.init()) //То же самое что и с js
        .pipe(gulpSass()) //Скомпилируем
        .pipe(autoPrefixer()) //Добавим вендорные префиксы
        .pipe(minifyCSS()) //Сожмем
        .pipe(mapSources.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({ stream: true }));
});

gulp.task('image:build', async function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(
            imagemin({
                //Сожмем их
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                use: [imageminPngquant()],
                interlaced: true
            })
        )
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({ stream: true }));
});

gulp.task('icons:build', async function () {
    gulp.src(path.src.icon) //Выберем наши картинки
        .pipe(
            imagemin({
                //Сожмем их
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                use: [imageminPngquant()],
                interlaced: true
            })
        )
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({ stream: true }));
});
