'use strict';

import {series, parallel, src, dest, watch} from 'gulp';
import gulpUtil from 'gulp-util';
import sassGlob from 'gulp-sass-Glob';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import minifyCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import del from 'del';
import pug from 'gulp-pug';

import readlineSync from 'readline-sync';

import fs, { writeFile } from 'fs';

// fs module test
// writeFile('sample.json', JSON.stringify({ sample: 'data' }), () => {})

import concat from 'gulp-concat';
import rename from 'gulp-rename';


import qa from './tasks/config/install'
const question = qa
gulpUtil.log('install:', question)

const baseFile = 'gabiaui'
let paths = {}

fs.readFile('config.json', 'utf-8', (err, data) => {
    if (err) return console.log(err)
    paths = JSON.parse(data)
})

const checkBuild = async (done) => {
    if(readlineSync.keyInYN('Do you want to build?')) {
        return await done()
    }
    gulpUtil.log('OK. Not building')
}

const clean = () => {
    site();
    return del(['dist'])
};

const build = () => {
    return src([`src/${baseFile}.scss`],{sourcemaps:false})
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(dest('./dist',{sourcemaps:false}))
    .pipe(rename('gabiaui.css'))
    .pipe(dest(paths.paths.output.packaged))
    .pipe(dest('./example/build'))
}

const assets = () => {
    return src('src/assets/**').pipe(dest('./example/build/assets'))
}

const buildJS = () => {
    return src('src/definitions/components/*.js')
        .pipe(concat('gabiaUi.js'))
        .pipe(uglify()).pipe(dest('./dist/js'))
        .pipe(dest('./example/build/js'))
}

const viewDev = () => {
    return src(['example/index.pug', 'example/**/*.pug']).pipe(pug()).pipe(dest('./example/build',{sourcemaps:false}))
}

const watcher = () => {
    watch(['src/themes/default/**/*.scss','src/definitions/**/**/*.scss'], build)
    watch('src/definitions/**/**/*.scss', viewDev)
    // watch(['src/themes/default/bases/variables.scss', 'src/themes/default/bases/reset.scss'], build)
    watch(['example/*.scss'], site)
    watch(['example/**/*.pug'], viewDev)
    watch('src/definitions/components/*.js', buildJS)
}

const siteUp = () => {
    watch(['example/style.scss'], site)
    watch(['example/**/*.pug'], viewDev)
}
// const name = Object.assign({}, ['style', 'style1'])
const site = () => {
    return src(['example/style.scss', 'example/style1.scss'])
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(concat('style.css'))
    .pipe(minifyCSS())
    .pipe(dest('./example/build'))
}

exports.install = question;
exports.devSite = series(site, siteUp);
exports.default = series(clean, checkBuild, parallel(viewDev, site, build, buildJS, assets), watcher, () => {
    gulpUtil.log("Run gulp!!")
});
