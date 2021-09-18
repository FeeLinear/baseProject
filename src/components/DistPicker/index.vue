<template>
    <div class="nx-pca-cp">
        <el-select v-model="pLabelKey" 
            filterable 
            remote 
            clearable
            :filter-method="(val) => pcaFilter(val, 'p')"
            :remote-method="pRemoteMethod" 
            @focus="pRemoteMethod" 
            @change="(val) => pcaSelectChange(val, 'p')" 
            :loading="ploading" 
            placeholder="省">
            <el-option 
                v-for="p in plist" 
                :key="p.regionCode" 
                :value="p.regionName + '|' + p.regionCode" 
                :label="p.regionName">
                <span style="float: left">{{ p.regionName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ p.regionCode }}</span>
            </el-option>
        </el-select>
        <el-select v-model="cLabelKey"
            filterable 
            remote 
            clearable
            :filter-method="(val) => pcaFilter(val, 'c')"
            :remote-method="cRemoteMethod" 
            @focus="cRemoteMethod"
            @change="(val) => pcaSelectChange(val, 'c')"
            :loading="cloading" 
             placeholder="市">
            <el-option 
                v-for="c in clist" 
                :key="c.regionCode" 
                :value="c.regionName + '|' + c.regionCode" 
                :label="c.regionName">
                <span style="float: left">{{ c.regionName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ c.regionCode }}</span>
            </el-option>
        </el-select>
        <el-select v-model="aLabelKey"
            filterable 
            remote 
            clearable
            :filter-method="(val) => pcaFilter(val, 'a')"
            :remote-method="aRemoteMethod" 
            @focus="aRemoteMethod"
            @change="(val) => pcaSelectChange(val, 'a')"
            :loading="aloading" 
            placeholder="区">
            <el-option 
                v-for="a in alist" 
                :key="a.regionCode" 
                :value="a.regionName + '|' + a.regionCode" 
                :label="a.regionName">
                <span style="float: left">{{ a.regionName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ a.regionCode }}</span>
            </el-option>
        </el-select>
    </div>
</template>

<script>
import * as dictionaryService from '@/api/dictionaryService'

// demo
// const pca = {
//     regionCode: '', // 地区编码
//     regionName: '' // 地区名称
// }

export default {
  name: 'DistPicker',
  props: {
    defaultP: { // 省，默认选中的值
      type: String,
      default: ''
    },
    defaultC: { // 市，默认选中的值
      type: String,
      default: ''
    },
    defaultA: { // 区，默认选中的值
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // province
      pLabelKey: this.defaultP,
      plistOri: null, // ori data
      plist: null, // 省list
      // city
      cLabelKey: this.defaultC,
      clistOri: null, // ori data
      clist: null, // 市
      // area
      aLabelKey: this.defaultA,
      alistOri: null, // ori data
      alist: null, // 区
      // loading
      ploading: false,
      cloading: false,
      aloading: false
    }
  },
  watch: {
    //
  },
  computed: {
    //
  },
  mounted() {
    //
  },
  methods: {
    initPca() {
      const _self = this
      const pcaObj = {
        proviceName: _self.pLabelKey ? _self.pLabelKey.split('|')[0] : '',
        proviceCode: _self.pLabelKey ? _self.pLabelKey.split('|')[1] : '',
        cityName: _self.cLabelKey ? _self.cLabelKey.split('|')[0] : '',
        cityCode: _self.cLabelKey ? _self.cLabelKey.split('|')[1] : '',
        areaName: _self.aLabelKey ? _self.aLabelKey.split('|')[0] : '',
        areaCode: _self.aLabelKey ? _self.aLabelKey.split('|')[1] : ''
      }
      // console.log('[初始化 initPca] pcaObj |', pcaObj)
      _self.$emit('onSelectDone', pcaObj)
    },
    pRemoteMethod() { // 省
      const _self = this
      const params = {
        regionType: '0', // 地区类型 0:省 1:市/区/县
        regionCode: '' // 地区编码
      }
      _self.ploading = true

      /**
             * 测试数据， start
             */
      // _self.ploading = false
      // const respData = [{
      //     regionCode: '110000',
      //     regionName: '汉东省'
      // }, {
      //     regionCode: '120000',
      //     regionName: '湖北省'
      // }]
      // console.log('[Mockjs queryRegion] respData |', respData)
      // _self.plistOri = JSON.parse(JSON.stringify(respData))
      // _self.plist = JSON.parse(JSON.stringify(respData))
      // return
      /**
             * 测试数据， end
             */

      dictionaryService.queryRegion(params)
        .then(rs => {
          _self.ploading = false
          const respData = rs.data.respData
          _self.plistOri = JSON.parse(JSON.stringify(respData))
          _self.plist = JSON.parse(JSON.stringify(respData))
        })
        .catch(() => {
          _self.ploading = false
        })
    },
    cRemoteMethod() { // 市
      const _self = this
      const pLabelKey = _self.pLabelKey
      const SPLIT_DOT = '|'
      let regionCode = ''
      if (typeof pLabelKey !== 'string' || pLabelKey.length <= 0) {
        _self.clist = null // 未选择省，清空市list
        _self.clistOri = null
        return
      }
      if (pLabelKey.indexOf(SPLIT_DOT) >= 0) {
        regionCode = pLabelKey.split(SPLIT_DOT)[1]
      }
      const params = {
        regionType: '1', // 地区类型 0:省 1:市/区/县
        regionCode // 地区编码 当前省
      }
      _self.cloading = true

      /**
             * 测试数据， start
             */
      // _self.cloading = false
      // const respData = [{
      //     regionCode: '111100',
      //     regionName: '汉东市'
      // }, {
      //     regionCode: '111200',
      //     regionName: '北京市'
      // }]
      // console.log('[Mockjs queryRegion] respData |', respData)
      // _self.clistOri = JSON.parse(JSON.stringify(respData))
      // _self.clist = JSON.parse(JSON.stringify(respData))
      // return
      /**
             * 测试数据， end
             */

      dictionaryService.queryRegion(params)
        .then(rs => {
          _self.cloading = false
          const respData = rs.data.respData
          _self.clistOri = JSON.parse(JSON.stringify(respData))
          _self.clist = JSON.parse(JSON.stringify(respData))
        })
        .catch(() => {
          _self.cloading = false
        })
    },
    aRemoteMethod() { // 区
      const _self = this
      const cLabelKey = _self.cLabelKey
      const SPLIT_DOT = '|'
      let regionCode = ''
      if (typeof cLabelKey !== 'string' || cLabelKey.length <= 0) {
        _self.alist = null // 未选择市，清空区list
        _self.alistOri = null
        return
      }
      if (cLabelKey.indexOf(SPLIT_DOT) >= 0) {
        regionCode = cLabelKey.split(SPLIT_DOT)[1]
      }
      const params = {
        regionType: '1', // 地区类型 0:省 1:市/区/县
        regionCode // 地区编码 当前市
      }
      _self.aloading = true

      /**
             * 测试数据， start
             */
      // _self.aloading = false
      // const respData = [{
      //     regionCode: '111111',
      //     regionName: '汉东县'
      // }, {
      //     regionCode: '111112',
      //     regionName: '兰陵县'
      // }]
      // console.log('[Mockjs queryRegion] respData |', respData)
      // _self.alistOri = JSON.parse(JSON.stringify(respData))
      // _self.alist = JSON.parse(JSON.stringify(respData))
      // return
      /**
             * 测试数据， end
             */

      dictionaryService.queryRegion(params)
        .then(rs => {
          _self.aloading = false
          const respData = rs.data.respData
          _self.alistOri = JSON.parse(JSON.stringify(respData))
          _self.alist = JSON.parse(JSON.stringify(respData))
        })
        .catch(() => {
          _self.aloading = false
        })
    },
    /**
         * val <String> 用户输入
         * type <String> p-省，c-市，a-区
         */
    pcaFilter(val, type) {
      const _self = this
      let tempList = null
      if (val) { // 存在输入
        if (type === 'p') {
          const plist = JSON.parse(JSON.stringify(_self.plist))
          if (plist instanceof Array && plist.length > 0) {
            tempList = plist.filter(items => {
              return items.regionCode.indexOf(val) >= 0 || items.regionName.indexOf(val) >= 0
            })
          } else {
            tempList = null
          }
          _self.plist = tempList
        } else if (type === 'c') {
          const clist = JSON.parse(JSON.stringify(_self.clist))
          if (clist instanceof Array && clist.length > 0) {
            tempList = clist.filter(items => {
              return items.regionCode.indexOf(val) >= 0 || items.regionName.indexOf(val) >= 0
            })
          } else {
            tempList = null
          }
          _self.clist = tempList
        } else if (type === 'a') {
          const alist = JSON.parse(JSON.stringify(_self.alist))
          if (alist instanceof Array && alist.length > 0) {
            tempList = alist.filter(items => {
              return items.regionCode.indexOf(val) >= 0 || items.regionName.indexOf(val) >= 0
            })
          } else {
            tempList = null
          }
          _self.alist = tempList
        } else {
          // 默认，无
        }
      } else {
        if (type === 'p') {
          tempList = JSON.parse(JSON.stringify(_self.plistOri))
          _self.plist = tempList
        } else if (type === 'c') {
          tempList = JSON.parse(JSON.stringify(_self.clistOri))
          _self.clist = tempList
        } else if (type === 'a') {
          tempList = JSON.parse(JSON.stringify(_self.alistOri))
          _self.alist = tempList
        } else {
          // 默认，无
        }
      }
    },
    pcaSelectChange(curVal, type) {
      const _self = this
      // console.log('[pSelectChange] curVal |', curVal, type)
      if (type === 'p') {
        _self.cLabelKey = ''
        _self.aLabelKey = ''
      } else if (type === 'c') {
        _self.aLabelKey = ''
      }
      _self.initPca()
    }
  }
}
</script>

<style lang="scss" scoped>
.nx-pca-cp{
    /* 省市区 选择模板 */
    .nx-pca-select{
        width: 120px
    }
}
</style>
