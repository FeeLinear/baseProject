import Mock from 'mockjs'
const projectList = Mock.mock({
  "list|20": [{
    'name': '@cname', // 中文名
    'account': `@word`, // 英文单词
    'phone': /1[3-9][0-9]{9}/, // 正则模式
    'deptName': Mock.mock('@cword(2,4)'), // 随机2-4字中文单词
    'id': '@guid', // guid
  }]
})

export default [{
    url: '/Api/Project/GetList',
    type: 'post',
    response: (res) => {
      let _fileter_list = [];
      if (res.body.key) {
        let _fileter_list = projectList.fileter(i => i.name == res.body.key)
      }

      // 没错，你应该已经猜到了，res.body就是我们传入到接口的数据，我们可以在这里做些逻辑操作
      // res包含完整的请求头信息
      return {
        code: 200,
        message: "操作成功",
        data: _fileter_list
      }
      // 使用return返回前端需要的数据
    }
  },
  {
    url: '/order/openQuery',
    type: 'post',
    response: (res) => {
      return {
        success: true,
        respCode: "001",
        respMsg: "",
        respData: {
          pageIndex: 1,
          pageSize: 10,
          totalCount: 30,
          pageTotal: 3,
          data: [{
              invoiceCode: "发票代码",
              invoiceNumber: "发票号码",
              invoiceAmount: "发票金额",
              companyName: "销方企业名称",
              buyerName: "购买方名称",
              openInvoiceDate: "开票日期",
              telephone: "手机号",
              email: "邮箱",
              orderNumber: "支付订单号",
              projectName: "项目名称",
              carNumber: "车场名称",
              carNumber: "车牌号码",
              receivableAmount: "应收金额",
              actualAmount: "实收金额",
              discountAmount: "优惠金额",
              inTime: "入场时间",
              payTime: "支付时间",
              invoicingChannel: "开票渠道",
              paymentChannel: "支付渠道",
            }
          ]
        }
      }
    }
  }
]
