export function formatDate(date, fmt) {
    if (date == null || date == '')
        return '';
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
        }
    }
    return fmt
}
function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}

export const sortArr = (arr, prop) => {
    if (arr instanceof Array) {
        return arr.sort(sortBy(prop))
    }
    return "数据类型错误"
}

const sortBy = (prop) => {

    return (prev, next) => {
        if (typeof prev == 'object') {
            let pre = prev[prop]
            let nex = next[prop]
            return pre - nex
        }
        return 1
    }
    
}


