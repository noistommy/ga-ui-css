import {src} from 'gulp';
import prompt from 'gulp-prompt';
import gulpUtil from 'gulp-util';
let answer = {};


const question = () => {
    return src('gulpfile.babel.js')
    .pipe(prompt.prompt({
        type: 'input',
        name: 'tesk',
        message: 'are you OK?'
    },
    (res) => {
      answer = res
        if(res.tesk === 'yes') {
          gulpUtil.log(answer)
        }
    }))
}

export {question}
