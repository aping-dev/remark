var timeFormat = {
    toLocalTime: function(time) {
        let d = new Date(time)

        var year = d.getFullYear(); // 年
        if (year < 1900) year = year + 1900;

        var month = d.getMonth() + 1; // 月
        if (month < 10) month = '0' + month;

        var day = d.getDate(); // 日
        if (day < 10) day = '0' + day;

        var hour = d.getHours(); // 小时
        if (hour < 10) hour = '0' + hour;

        var minute = d.getMinutes(); // 分钟
        if (minute < 10) minute = '0' + minute;

        var second = d.getSeconds(); // 秒
        if (second < 10) second = '0' + second;

        var str = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        return str
    }
}

export default timeFormat