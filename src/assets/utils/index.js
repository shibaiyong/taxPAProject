
//时间格式化

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

//数据千分位格式化

export const filters = {
    fMoney(num) {
        //处理一些特殊情况
        if(!num && num != 0) return '';
        var num = num.toString().replace(/\$|\,/g,'');
        if(isNaN(num)) num = "0";
        var sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        var cents = num % 100;
        num = Math.floor(num / 100).toString();
        if(cents < 10) cents = "0" + cents;
        for (var i = 0; i < Math.floor( (num.length - (1+i))/3 ); i++)
            num = num.substring( 0, num.length - (4*i+3) ) + ',' + num.substring( num.length - (4*i+3) );
        return (((sign)?'':'-') + num + '.' + cents);
    }
}

//数组对象按某个键排序

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

export const setCookie = (name, deadTime, value) => {//设置cookie

    let currentTime = new Date();
    let endTime = new Date(currentTime.getTime() + deadTime * 24 * 3600 * 1000)
    document.cookie = name + "=" + JSON.stringify(value) + ";expires=" + endTime.toGMTString()
}

export const getCookie = (key) => {//获取cookie

    if (document.cookie) {//如果cookie存在就获取
        var str = document.cookie
        var arr = str.split("; ")
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i].split("=")
            if (item[0] == key) {
                return JSON.parse(item[1])//将结果转成对象返回
            }
        }
        return {};// 如果cookie存在，但是不存在key的值
    }
    return {};//如果cookie不存在  返回一个空对象
}

  export const deleteCookie = (key) => {
    var date = new Date()
    date.setTime(date.getTime() - 1)
    var delValue = getCookie(key)
    if (!!delValue) {
      document.cookie = key + '=' + delValue + ';expires=' + date.toGMTString()
    }
  }


