'use strict';

import {series, parallel, src, dest, watch} from 'gulp'; // Gulp
import gulpUtil from 'gulp-util'; // log 풀력을 위한 util 모듈
import sassGlob from 'gulp-sass-glob';
import sass from 'gulp-dart-sass';  // sass/scss -> css 빌드
import autoprefixer from 'gulp-autoprefixer';
import minifyCSS from 'gulp-clean-css'; // 최소화
import uglify from 'gulp-uglify'; // 난독화
import { deleteAsync } from 'del';
import concat from 'gulp-concat';
import rename from 'gulp-rename';

import pug from 'gulp-pug';

import readlineSync from 'readline-sync';

import fs from 'fs';

import prompt from 'gulp-prompt';


// fs module test
// fa.writeFile('sample.json', JSON.stringify({ sample: 'data' }), () => {})




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
    return deleteAsync(['dist/'])
};

// scss 빌드
const build = () => {
    const baseFile = 'frogui'
    gulpUtil.log(baseFile)
    return src([`src/${baseFile}.scss`])
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest('./dist', {sourcemaps:false}))
    .pipe(minifyCSS())
    .pipe(rename('frogui.css'))
    .pipe(minifyCSS())
    .pipe(dest('./example/build'))
}
// JS 빌드
const buildJS = () => {
    return src(['src/definitions/components/*.js', 'example/base.js'])
        .pipe(concat('frog_ui.js'))
        .pipe(dest('./dist/js'))
        .pipe(uglify())
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
    watch(['src/themes/default/bases/variables.scss', 'src/themes/default/bases/reset.scss'], build)
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
const question = () => {
    return src('gulpfile.babel.js')
    .pipe(prompt.prompt({
        type: 'input',
        name: 'tesk',
        message: 'are you OK?'
    },
    (res) => {
        gulpUtil.log(res)
        if(res.tesk === 'yes') {
            build ()
        }
    }))
}
// ... existing code ...

export { question } 
// exports.clean = clean;
// exports.build = build;
// exports.devSite = series(site, siteWatcher);
// exports.default = series(clean, parallel(viewDev, site, build, buildJS, assets), watcher, () => {
//     gulpUtil.log("Run gulp!!")
// });

// export {
//     question as install,
//     clean,
//     build,
//     series(site, siteWatcher) as devSite,
//     series(clean, parallel(viewDev, site, build, buildJS, assets), watcher, () => {
//         gulpUtil.log("Run gulp!!")
//     }) as default
// };
export { clean, build }
export const devSite = series(site, siteWatcher)
export default series(clean, parallel(viewDev, site, build, buildJS, assets), watcher, () => {
            gulpUtil.log("Run gulp!!")
        })