import Mock from 'mockjs'
import data from './data.json';
Object.keys(data).forEach(key => {
  Mock.mock(key, /post|get/i, data[key])
})