function dateRangeUtil() {
  /** *
   * 获得当前时间
   */
  this.getCurrentDate = function () {
    return new Date();
  };

  this.getCurrentDay = function () {
    var currentDate = this.getCurrentDate();

    var month = currentDate.getMonth();

    var year = currentDate.getFullYear();

    var day = currentDate.getDate();

    var startStop = new Array();

    startStop.push(new Date(year, month, day, 0, 0, 0))

    startStop.push(new Date(year, month, day, 23, 59, 59))

    return startStop;
  };
  /** *
   * 获得昨天的日期
   */
  this.getPreviousDay = function () {
    var preDate = this.getCurrentDate();

    preDate.setDate(preDate.getDate() - 1);

    var month = preDate.getMonth();

    var year = preDate.getFullYear();

    var day = preDate.getDate();

    var startStop = new Array();

    startStop.push(new Date(year, month, day, 0, 0, 0))

    startStop.push(new Date(year, month, day, 23, 59, 59))

    return startStop;
  };

  /** *
   * 获得明天的日期
   */
  this.getNextDay = function () {
    var preDate = this.getCurrentDate();

    preDate.setDate(preDate.getDate() + 1);

    var month = preDate.getMonth();

    var year = preDate.getFullYear();

    var day = preDate.getDate();

    var startStop = new Array();

    startStop.push(new Date(year, month, day, 0, 0, 0))

    startStop.push(new Date(year, month, day, 23, 59, 59))

    return startStop;
  };
  /** *
   * 获得本周起止时间
   */
  this.getCurrentWeek = function () {
    var startStop = new Array();

    var currentDate = this.getCurrentDate();

    currentDate.setDate(currentDate.getDate());

    var week = currentDate.getDay();

    var month = currentDate.getDate();

    const hours = currentDate.getHours()

    const minutes = currentDate.getMinutes()

    const seconds = currentDate.getSeconds()

    var millisecond = 1000 * 60 * 60 * 24;

    var minusDay = week != 0 ? week - 1 : 6;

    var monday = new Date(currentDate.getTime() - (minusDay * millisecond) - hours * 1000 * 3600 - minutes * 1000 * 60 - seconds * 1000);

    var sunday = new Date(monday.getTime() + (7 * millisecond) - 1000 * 1);

    startStop.push(monday)

    startStop.push(sunday)

    return startStop;
  };
  /** *
   * 获得下一周起止时间
   */
  this.getNextWeek = function () {
    var startStop = new Array();

    var currentDate = this.getCurrentDate();

    currentDate.setDate(currentDate.getDate() + 7);

    var week = currentDate.getDay();

    var month = currentDate.getDate();

    const hours = currentDate.getHours()

    const minutes = currentDate.getMinutes()

    const seconds = currentDate.getSeconds()

    var millisecond = 1000 * 60 * 60 * 24;

    var minusDay = week != 0 ? week - 1 : 6;

    var monday = new Date(currentDate.getTime() - (minusDay * millisecond) - hours * 1000 * 3600 - minutes * 1000 * 60 - seconds * 1000);

    var sunday = new Date(monday.getTime() + (7 * millisecond) - 1000 * 1);

    startStop.push(monday)

    startStop.push(sunday)

    return startStop;
  };

  /** *
   * 获得本月的起止时间
   */
  this.getCurrentMonth = function () {
    var startStop = new Array();

    var currentDate = this.getCurrentDate();

    var currentMonth = currentDate.getMonth();

    var currentYear = currentDate.getFullYear();

    var firstDay = new Date(currentYear, currentMonth, 1);

    if (currentMonth == 11) {
      currentYear++;

      currentMonth = 0; // 就为
    } else {
      currentMonth++;
    }

    var millisecond = 1000 * 60 * 60 * 24;

    var nextMonthDayOne = new Date(currentYear, currentMonth, 1);

    var lastDay = new Date(nextMonthDayOne.getTime() - 100 * 1);

    startStop.push(firstDay);

    startStop.push(lastDay);

    return startStop;
  };

  /**
   * 得到本季度开始的月份
   * aram month 需要计算的月份
   ***/
  this.getQuarterSeasonStartMonth = function (month) {
    var quarterMonthStart = 0;
    var spring = 0; // 春
    var summer = 3; // 夏
    var fall = 6; // 秋
    var winter = 9; // 冬
    // 月份从0-11
    if (month < 3) {
      return spring;
    }

    if (month < 6) {
      return summer;
    }

    if (month < 9) {
      return fall;
    }

    return winter;
  };

  /**
   * 获得该月的天数
   * param year年份
   * param month月份
   * */
  this.getMonthDays = function (year, month) {
    // 本月第一天 1-31
    var relativeDate = new Date(year, month, 1);
    // 获得当前月份0-11
    var relativeMonth = relativeDate.getMonth();
    // 获得当前年份4位年
    var relativeYear = relativeDate.getFullYear();

    // 当为12月的时候年份需要加1
    // 月份需要更新为0 也就是下一年的第一个月
    if (relativeMonth == 11) {
      relativeYear++;
      relativeMonth = 0;
    } else {
      // 否则只是月份增加,以便求的下一月的第一天
      relativeMonth++;
    }
    // 一天的毫秒数
    var millisecond = 1000 * 60 * 60 * 24;
    // 下月的第一天
    var nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);
    // 返回得到上月的最后一天,也就是本月总天数
    return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
  };

  /**
   * 获得本季度的起止日期
   */
  this.getCurrentSeason = function () {
    // 起止日期数组
    var startStop = new Array();
    // 获取当前时间
    var currentDate = this.getCurrentDate();
    // 获得当前月份0-11
    var currentMonth = currentDate.getMonth();
    // 获得当前年份4位年
    var currentYear = currentDate.getFullYear();
    // 获得本季度开始月份
    var quarterSeasonStartMonth = this.getQuarterSeasonStartMonth(currentMonth);
    // 获得本季度结束月份
    var quarterSeasonEndMonth = quarterSeasonStartMonth + 2;

    // 获得本季度开始的日期
    var quarterSeasonStartDate = new Date(currentYear, quarterSeasonStartMonth, 1);
    // 获得本季度结束的日期
    var quarterSeasonEndDate = new Date(currentYear, quarterSeasonEndMonth, this.getMonthDays(currentYear, quarterSeasonEndMonth));
    // 加入数组返回
    startStop.push(quarterSeasonStartDate);
    startStop.push(quarterSeasonEndDate);
    // 返回
    return startStop;
  };

  /** *
   * 得到本年的起止日期
   *
   */
  this.getCurrentYear = function () {
    // 起止日期数组
    var startStop = new Array();
    // 获取当前时间
    var currentDate = this.getCurrentDate();
    // 获得当前年份4位年
    var currentYear = currentDate.getFullYear();

    // 本年第一天
    var currentYearFirstDate = new Date(currentYear, 0, 1);
    // 本年最后一天
    var currentYearLastDate = new Date(currentYear, 11, 31, 23, 59, 59);
    // 添加至数组
    startStop.push(currentYearFirstDate);

    startStop.push(currentYearLastDate);
    // 返回
    return startStop;
  };

  /**
   * 返回上一个月的第一天Date类型
   * param year 年
   * param month 月
   **/
  this.getPriorMonthFirstDay = function (year, month) {
    // 年份为0代表,是本年的第一月,所以不能减
    if (month == 0) {
      month = 11; // 月份为上年的最后月份
      year--; // 年份减1
      return new Date(year, month, 1);
    }
    // 否则,只减去月份
    month--;
    return new Date(year, month, 1);
  };

  /**
   * 获得上一月的起止日期
   * ***/
  this.getPreviousMonth = function () {
    // 起止日期数组
    var startStop = new Array();
    // 获取当前时间
    var currentDate = this.getCurrentDate();
    // 获得当前月份0-11
    var currentMonth = currentDate.getMonth();
    // 获得当前年份4位年
    var currentYear = currentDate.getFullYear();
    // 获得上一个月的第一天
    var priorMonthFirstDay = this.getPriorMonthFirstDay(currentYear, currentMonth);
    // 获得上一月的最后一天
    var priorMonthLastDay = new Date(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth(), this.getMonthDays(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth()));
    // 添加至数组
    startStop.push(priorMonthFirstDay);
    startStop.push(priorMonthLastDay);
    // 返回
    return startStop;
  };

  /**
   * 获得上一周的起止日期
   * **/
  this.getPreviousWeek = function () {
    // 起止日期数组
    var startStop = new Array();
    // 获取当前时间
    var currentDate = this.getCurrentDate();
    // 返回date是一周中的某一天
    var week = currentDate.getDay();
    // 返回date是一个月中的某一天
    var month = currentDate.getDate();
    // 一天的毫秒数
    var millisecond = 1000 * 60 * 60 * 24;
    // 减去的天数
    var minusDay = week != 0 ? week - 1 : 6;
    // 获得当前周的第一天
    var currentWeekDayOne = new Date(currentDate.getTime() - (millisecond * minusDay));
    // 上周最后一天即本周开始的前一天
    var priorWeekLastDay = new Date(currentWeekDayOne.getTime() - millisecond);
    // 上周的第一天
    var priorWeekFirstDay = new Date(priorWeekLastDay.getTime() - (millisecond * 6));

    // 添加至数组
    startStop.push(priorWeekFirstDay);
    startStop.push(priorWeekLastDay);

    return startStop;
  };
  /*
   * 获取当前日期属于当年的第几周
   *
   */
  this.getYearWeek = function (date) {
    /*
    date1是当前日期
    date2是当年第一天
    d是当前日期是今年第多少天
    用d + 当前年的第一天的周差距的和在除以7就是本年第几周
    */
    var tDate = new Date()
    if (date) {
      tDate = new Date(date)
    }
    var a = tDate.getFullYear();
    var b = tDate.getMonth() + 1;
    var c = tDate.getDate();
    var date1 = new Date(a, parseInt(b) - 1, c);
    var date2 = new Date(a, 0, 1);
    var d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
    var week = Math.ceil(
      (d + ((date2.getDay() + 1) - 1)) / 7
    );
    return [a, week]
  };
  /*
   * 获取当前日期的上一周属于当年的第几周
   *
   */
  this.getYearPreWeek = function (date) {
    /*
    date1是当前日期
    date2是当年第一天
    d是当前日期是今年第多少天
    用d + 当前年的第一天的周差距的和在除以7就是本年第几周
    */
    var tDate = new Date()
    if (date) {
      tDate = new Date(date)
    }
    tDate.setDate(tDate.getDate() - 7)
    var a = tDate.getFullYear();
    var b = tDate.getMonth() + 1;
    var c = tDate.getDate();
    var date1 = new Date(a, parseInt(b) - 1, c);
    var date2 = new Date(a, 0, 1);
    var d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
    var week = Math.ceil(
      (d + ((date2.getDay() + 1) - 1)) / 7
    );
    return [a, week]
  };
  /**
   * 得到上季度的起始日期
   * year 这个年应该是运算后得到的当前本季度的年份
   * month 这个应该是运算后得到的当前季度的开始月份
   * */
  this.getPriorSeasonFirstDay = function (year, month) {
    var quarterMonthStart = 0;
    var spring = 0; // 春
    var summer = 3; // 夏
    var fall = 6; // 秋
    var winter = 9; // 冬
    // 月份从0-11
    switch (month) { // 季度的其实月份
      case spring:
        // 如果是第一季度则应该到去年的冬季
        year--;
        month = winter;
        break;
      case summer:
        month = spring;
        break;
      case fall:
        month = summer;
        break;
      case winter:
        month = fall;
        break;
    }

    return new Date(year, month, 1);
  };

  /**
   * 得到上季度的起止日期
   * **/
  this.getPreviousSeason = function () {
    // 起止日期数组
    var startStop = new Array();
    // 获取当前时间
    var currentDate = this.getCurrentDate();
    // 获得当前月份0-11
    var currentMonth = currentDate.getMonth();
    // 获得当前年份4位年
    var currentYear = currentDate.getFullYear();
    // 上季度的第一天
    var priorSeasonFirstDay = this.getPriorSeasonFirstDay(currentYear, currentMonth);
    // 上季度的最后一天
    var priorSeasonLastDay = new Date(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2, this.getMonthDays(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2));
    // 添加至数组
    startStop.push(priorSeasonFirstDay);
    startStop.push(priorSeasonLastDay);
    return startStop;
  };

  /**
   * 得到去年的起止日期
   * **/
  this.getPreviousYear = function () {
    // 起止日期数组
    var startStop = new Array();
    // 获取当前时间
    var currentDate = this.getCurrentDate();
    // 获得当前年份4位年
    var currentYear = currentDate.getFullYear();
    currentYear--;
    var priorYearFirstDay = new Date(currentYear, 0, 1);
    var priorYearLastDay = new Date(currentYear, 11, 1);
    // 添加至数组
    startStop.push(priorYearFirstDay);
    startStop.push(priorYearLastDay);
    return startStop;
  };
  this.formatDate = function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
    let h = date.getHours();
    let i = date.getMinutes();
    let s = date.getSeconds();
    const a = date.getDay();

    if (mymonth < 10) {
      mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
      myweekday = "0" + myweekday;
    }

    if (h < 10) {
      h = "0" + h;
    }
    if (i < 10) {
      i = "0" + i;
    }
    if (s < 10) {
      s = "0" + s;
    }

    return (myyear + "-" + mymonth + "-" + myweekday + " " + h + ":" + i + ":" + s);
  }

  this.formatDay = function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
    const h = date.getHours();
    const i = date.getMinutes();
    const s = date.getSeconds();
    const a = date.getDay();

    if (mymonth < 10) {
      mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
      myweekday = "0" + myweekday;
    }

    return (myyear + "-" + mymonth + "-" + myweekday);
  }
}

export const dateRange = new dateRangeUtil()
