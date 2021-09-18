/**
 * regular expressions for validating form field
 * import RegExp, then it can be used, like `import RegExp from '@/utils/validate'`
 * Created by longwang, 2018.07.02
 *
 * @params <Object> T
 * @attr T.rule <> regular expression for `pattern`
 * @attr T.msg <> regular expression text for `message`
 */

// 正则汇总
const urlRegExp = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const RegExp = {
  url: { // 合法uri
    rule: urlRegExp,
    msg: 'uri格式不正确'
  },
  lowerCase: { // 小写字母
    rule: /^[a-z]+$/,
    msg: '小写字母'
  },
  upperCase: { // 大写字母
    rule: /^[A-Z]+$/,
    msg: '大写字母'
  },
  alphabets: { // 大小写字母
    rule: /^[A-Za-z]+$/,
    msg: '大小写字母'
  },
  email: { // email
    rule: emailRegExp,
    msg: 'email格式不正确'
  },
  account: { // 账号
    rule: /^[A-Za-z0-9\$\(\)\*\+\-\_\=\.\[\]\?\!\\\/\^\{\}\|\~\@\#\%\&\"\']{6,50}$/,
    msg: '长度6-50，可包含字母、数字、符号，但不含特殊字符'
  },
  password: { // 密码\:\;\,
    rule: /^[A-Za-z0-9\$\(\)\*\+\-\_\=\.\[\]\?\!\\\/\^\{\}\|\~\@\#\%\&\"\']{6,20}$/,
    msg: '长度6-20，可包含字母、数字、符号，但不含特殊字符'
  },
  regIcard: {
    rule: /^(\d{6}([0-9]{2})(0[1-9]{1}|10|11|12)(0[1-9]{1}|1[0-9]|2[0-9]|30|31)(\d{3}))$|^(\d{6}(19|20)([0-9]{2})(0[1-9]{1}|10|11|12)(0[1-9]{1}|1[0-9]|2[0-9]|30|31)(\d{3})([0-9Xx]{1}))$/,
    msg: '格式不正确'
  },
  regOcert: {
    rule: /^(\d{7})$|^((南|北|沈|兰|成|济|广|海|空|参|政|后|装)字第(\d{8})号)$/,
    msg: '格式不正确'
  },
  regPassport: {
    rule: /^(1[45][0-9]{7})$|^([P|p|S|s]\d{7})$|^([S|s|G|g]\d{8})$|^([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ee|Ff]\d{8})$/,
    msg: '格式不正确'
  },
  regChinese: {
    rule: /^[\u4e00-\u9fa5]+$/,
    msg: '中文字符'
  },
  regPositiveInteger: {
    rule: /^[1-9]+\d*$/,
    msg: '正整数'
  },
  regPointsNum: {
    rule: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/,
    msg: '正整数或小数点后不超过两位的正小数'
  },
  mobileLandline: {
    rule: /^[0-9\-]{1,15}$/,
    msg: '座机或手机号码格式不正确'
  },
  tel: {
    rule: /^[0-9\-]{1,15}$/,
    msg: '手机号码格式不正确'
  },
  serviceNo: {
    rule: /^[A-Za-z0-9]{1,18}$/,
    msg: '数字或大小写英文字母，最大长度18'
  },
  serviceRoleId: {
    rule: /^[A-Za-z0-9]{1,10}$/,
    msg: '数字或大小写英文字母，最大长度10'
  },
  sysVersion: {
    rule: /^[A-Za-z0-9\.]+$/,
    msg: '数字、大小写英文字母、.号'
  },
  orderBy: {
    rule: /^[0-9]+$/,
    msg: '只能输入数字'
  },
  contactTel: {
    rule: /^1[0-9]{10}$/,
    msg: '手机号码格式不正确'
  }
}
// export default RegExp

export function isvalidUsername(str) {
  // const valid_map = ['admin', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0
  // TODO:
  if (str && str.trim()) {
    return true;
  } else {
    return false;
  }
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
// 手机号码
export function isvalidPhone(str) {
  const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
  return reg.test(str)
}
// 身份证号
export function isvalidIdno(str) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(str)
}
// 数字
export function isvalidNumber(str) {
  const reg = /^[0-9]*$/
  return reg.test(str)
}

// 正整数
export function isPositiveInt(str) {
  const reg = /^[1-9]*$/
  return reg.test(str)
}

// 金额(保留2位小数的正数)
export function isLegalDecimal(str) {
  const reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
  return reg.test(str)
}

// 小数
export function isvalidFloat(str) {
  const reg = /^\d+\.\d+$/
  return reg.test(str);
}

// 特殊字符
export function checkString(str) {
  var reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
  return reg.test(str)
}

// 数字和字母
export function isvalidNumberOrAlphabets(str) {
  var reg = new RegExp(/^[0-9a-zA-Z]+$/)
  return reg.test(str)
}
// 数字和字母下划线
export function checkuid(str) {
  var reg = new RegExp(/^\w+$/)
  return reg.test(str)
}
// 中文
export function isChinese(str) {
  if (/^[\u3220-\uFA29]+$/.test(str)) {
    return true
  } else {
    return false
  }
}

// 数字校验
export function numberValida(rule, value, callback) {
  const reg = /^[0-9]*$/
  if (rule.required) {
    if (!reg.test(value)) {
      callback(new Error('请输入合法手机号码'))
      return false
    } else {
      callback()
    }
  } else {
    if (value == '') {
      callback()
    } else {
      if (!reg.test(value)) {
        callback(new Error('请输入合法手机号码'))
      } else {
        callback()
      }
    }
  }
}

// 手机
export function mobileValide(rule, value, callback) {
  const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
  if (rule.required) {
    if (!reg.test(value)) {
      callback(new Error('请输入合法手机号码'))
    } else {
      callback()
    }
  } else {
    if (value == '') {
      callback()
    } else {
      if (!reg.test(value)) {
        callback(new Error('请输入合法手机号码'))
      } else {
        callback()
      }
    }
  }
}

// 校验车牌号码，不包含第一个汉字
export function isValidCarNo(str) {
  const reg = /^([a-zA-Z](([DF](?![a-zA-Z0-9]*[IO])[0-9]{4})|([0-9]{5}[DF])))|([a-zA-Z0-9]{5}[a-zA-Z0-9挂学警港澳]{1})$/
  return reg.test(str)
}

// 空或者全空格校验
export function emptyValidate(str) {
  return str && str.split(' ').join('').length === 0
}

// 限制字符长度
export function validateStringLength(len) {
  return function(rule, value, callback) {
    if (value.length > len) {
      callback(new Error(`最大长度 ${len}`));
    } else {
      callback();
    }
  }
}

export default {
  RegExp,
  isvalidUsername,
  validateURL,
  validateLowerCase,
  validateUpperCase,
  validatAlphabets,
  isvalidPhone,
  isvalidIdno,
  isvalidNumber,
  isPositiveInt,
  isLegalDecimal,
  isvalidFloat,
  checkString,
  isvalidNumberOrAlphabets,
  checkuid,
  isChinese,
  numberValida,
  mobileValide,
  isValidCarNo,
  emptyValidate,
  validateStringLength
}
