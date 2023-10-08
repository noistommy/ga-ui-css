const lastDayList = [31,28,31,30,31,30,31,31,30,31,30,31];
const days = ['일', '월', '화', '수', '목', '금', '토']
const calendar = document.querySelector('.ga-calendar');
const wrapper = document.querySelector('.cell-wrapper');

const getDate = () => {
    const y = new Date().getFullYear();
    const m = new Date().getMonth() + 1;
    const d = new Date().getDate();
    return { dy: y, dm: m, dd: d }
}

const {dy, dm, dd} = getDate();
const getStartDay = (year, month) => {
    let startIndex = 0;

    let basicDay = 365 * (year - 1); // 현재 월 기준 전년까지 기본 일 수
    // 윤년 계산
    let leafDay = Math.floor((year-1)/4) -  Math.floor((year-1)/100) +  Math.floor((year-1)/400);
    // 현재 해 오늘까지의 일 수
    let currentYearDay = 1;

    if(month > 1 && year%4 === 0 && (year%100 !== 0 || year%400 === 0)) {
        lastDayList[1] = 29;
    } else {
        lastDayList[1] = 28;
    }

    for(let i=0;i<(month - 1); i++) {
        currentYearDay += lastDayList[i];
    }
    startIndex = (basicDay + leafDay + currentYearDay)%7;
    return startIndex;
};

function setCalendar (year = dy, month = dm, date = dd) {
    if (!wrapper) return;
    // if (month != dm) date = 1;
    let startDay = getStartDay(year, month);

    let dayList = [];

    let currLast = lastDayList[month-1];
    let prevLast = (month === 1) ? 31 : lastDayList[month - 2];

    let currDay = 1;
    let nextDay = 1;

    for(let i=0;i<6; i++) {
        for(let j=0; j<7; j++) {
            const cell = document.createElement('span')
            cell.style['--x'] = j;
            cell.style['--y'] = i;
            cell.setAttribute('style', `--x:${j};--y: ${i}` )
            cell.classList.add('cell')
            if(i===0 && j < startDay) {
                cell.classList.add('disabled')
                cell.dataset.name = prevLast + (j - startDay) + 1
            } else if(currDay <= currLast) {
                if( j === 0) {
                    cell.classList.add('sun')
                }
                if( j === 6) {
                    cell.classList.add('sat')
                }
                if( currDay === date) {
                    cell.classList.add('today')
                }
                cell.dataset.name = currDay;
                currDay++
            } else {
                cell.classList.add('disabled')
                cell.dataset.name = nextDay
                nextDay++
            }
            dayList.push(cell)
            wrapper.append(cell)
        }
    }
    if(nextDay > 7) {
        dayList = dayList.slice(0,-7)
    }

    calendar.querySelector('span.year').innerHTML = year+'년';
    calendar.querySelector('span.month').innerHTML = month+'월';

    return dayList;
}


// setCalendar();


//
// document.getElementById('calDate').addEventListener('click', () => {
//     const result = setCalendar(2022, 11);
//     console.log(result);
// })