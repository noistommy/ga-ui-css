'use strict';

import {series, parallel, src, dest, watch} from 'gulp'; // Gulp
import gulpUtil from 'gulp-util'; // log 풀력을 위한 util 모듈
import sassGlob from 'gulp-sass-glob';
import sass from 'gulp-sass';  // sass/scss -> css 빌드
import autoprefixer from 'gulp-autoprefixer';
import minifyCSS from 'gulp-clean-css'; // 최소화
import uglify from 'gulp-uglify'; // 난독화
import del from 'del';
import concat from 'gulp-concat';
import rename from 'gulp-rename';

import pug from 'gulp-pug';

import readlineSync from 'readline-sync';

import fs from 'fs';


// fs module test
// fa.writeFile('sample.json', JSON.stringify({ sample: 'data' }), () => {})

import qa from './tasks/config/install'
const question = qa

let paths = {
    paths: {
        output: {
            packaged: 'dist'
        }
    }
}

fs.readFile('config.json', 'utf-8', (err, data) => {
    if (err) return console.log(err)
    paths = JSON.parse(data)
})

// install 여부 확인 (테스트 중...)
const checkBuild = async (done) => {
    if(readlineSync.keyInYN('Do you want to build?')) {
        return await done()
    }
    gulpUtil.log('OK. Not building')
}

// 빌드 전 이전 빌드 폴더 삭제
const clean = () => {
    // site();
    return del(['dist/'])
};

// scss 빌드
const build = () => {
    const baseFile = paths.base
    return src([`src/${baseFile}.scss`], {base:'src/', allowEmpty: true})
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(dest('./dist'))
    .pipe(dest(paths.paths.output.packaged, {sourcemaps:false}))
    .pipe(rename('gabiaui.css'))
    .pipe(dest('./example/build'))
}
// JS 빌드
const buildJS = () => {
    return src('src/definitions/components/*.js')
        .pipe(concat('ga_ui.js'))
        .pipe(uglify()).pipe(dest('./dist/js'))
        .pipe(dest('./example/build/js'))
}

// assets 파일 빌드 폴더로 가져가기
const assets = () => {
    return src('src/assets/**').pipe(dest('./example/build/assets'))
}
//
// 에제 페이지 컴파일
const viewDev = () => {
    return src(['example/index.pug', 'example/**/*.pug']).pipe(pug()).pipe(dest('./example/build',{sourcemaps:false}))
}

// 작업 중 변경 감지 -> 빌드
const watcher = () => {
    watch(['src/themes/default/**/*.scss','src/definitions/**/**/*.scss'], build)
    // watch(['src/themes/default/bases/variables.scss', 'src/themes/default/bases/reset.scss'], build)
    watch('src/definitions/components/*.js', buildJS)

    watch(['example/*.scss'], site)
    watch(['example/**/*.pug'], viewDev)
}

// 예제 사이트 watch & build
const siteWatcher = () => {
    watch(['example/style.scss'], site)
    watch(['example/**/*.pug'], viewDev)
}
const site = () => {
    return src(['example/style.scss', 'example/style1.scss'])
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(concat('style.css'))
    .pipe(minifyCSS())
    .pipe(dest('./example/build'))
}

exports.install = question; // $ gulp install
exports.clean = clean; // $ gulp clean
exports.build = build; // $ gulp clean
exports.devSite = series(site, siteWatcher); // $ gulp devSite
exports.default = series(clean, parallel(viewDev, site, build, buildJS, assets), watcher, () => {
    gulpUtil.log("Run gulp!!")
}); // $ gulp
