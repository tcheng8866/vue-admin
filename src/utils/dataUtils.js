// 备选数据查询
import { axios } from '@/utils/requestService'
export function getSelectData(that, body, url, name, callback) {
  axios.post(url,
    body
  ).then((res) => {
    that[name] = JSON.parse(res.body)
    // 回调函数，当函数执行成功后调用函数callback,callback为可选参数
    callback && (typeof callback === 'function') && callback()
  })
}

// 日期默认值 20200824
export function getDefaultDate() {
  var currentTime = new Date()
  var y = currentTime.getFullYear()
  var m = currentTime.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = currentTime.getDate()
  d = d < 10 ? ('0' + d) : d
  return '' + y + m + d
}

// 当前时间的一周前 20200817
export function getAWeekAgoDate() {
  var date = new Date()
  date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return '' + y + m + d
}

// 当前时间的一月前 20200725
export function getAMonthAgoDate() {
  var date = new Date()
  date.setTime(date.getTime() - 3600 * 1000 * 24 * 30)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return '' + y + m + d
}
/**
 * 日期范围大于（一个月）
 * @param {string} startDate 开始日期 element日期控件date[0] 20200725
 * @param {string} endDate 结束日期 element日期控件date[1] 20200825
 * @param {string} diff 时间查 默认一个月
 */
export function isDateDiffOver(startDate, endDate, diff = 30 * 24 * 60 * 60 * 1000) {
  const startFmt = startDate.substr(0, 4) + '/' + startDate.substr(4, 2) + '/' + startDate.substr(6, 2)
  const endFmt = endDate.substr(0, 4) + '/' + endDate.substr(4, 2) + '/' + endDate.substr(6, 2)
  const startTimestamp = new Date(startFmt).getTime()
  const endTimestamp = new Date(endFmt).getTime()
  const space = endTimestamp - startTimestamp
  if (space > diff) {
    return true
  }
  return false
}

/**
 * 用于数据字典格式下拉框label匹配
 * @param {string} key 类似column的字段
 * @param {Array} arr 待匹配list
 */
export function getLableBykey(key, arr) {
  let val = key
  if (!this.$validateNull(key) && !this.$validateNull(arr)) {
    arr.map(e => {
      if (e.KEYC === key) {
        val = e.KEYC + ' ' + e.VALUEC
      }
    })
  }
  return val
}

// 证件类型
export const documentTypeList = [
  { 'KEYC': '100', 'VALUEC': '第一代居民身份证' },
  { 'KEYC': '101', 'VALUEC': '第二代居民身份证' },
  { 'KEYC': '102', 'VALUEC': '临时身份证' },
  { 'KEYC': '103', 'VALUEC': '中国护照' },
  { 'KEYC': '104', 'VALUEC': '户口簿' },
  { 'KEYC': '202', 'VALUEC': '经营许可证' },
  { 'KEYC': '211', 'VALUEC': '营业执照' },
  { 'KEYC': '212', 'VALUEC': '事业法人证' },
  { 'KEYC': '213', 'VALUEC': '工商核准号' },
  { 'KEYC': '214', 'VALUEC': '证明文件' },
  { 'KEYC': '218', 'VALUEC': '税务登记证' },
  { 'KEYC': '219', 'VALUEC': '企业法人营业执照' },
  { 'KEYC': '221', 'VALUEC': '个人独资企业营业执照' },
  { 'KEYC': '222', 'VALUEC': '合伙企业营业执照' },
  { 'KEYC': '223', 'VALUEC': '合伙企业分支机构营业执照' },
  { 'KEYC': '229', 'VALUEC': '境外机构证明文件' },
  { 'KEYC': '231', 'VALUEC': '统一社会信用代码' },
  { 'KEYC': '232', 'VALUEC': '其他对公证件类型' }
]

// 省份
export const provinceList = [
  { 'KEYC': '11', 'VALUEC': '北京市' },
  { 'KEYC': '12', 'VALUEC': '天津市' },
  { 'KEYC': '13', 'VALUEC': '河北省' },
  { 'KEYC': '14', 'VALUEC': '山西省' },
  { 'KEYC': '15', 'VALUEC': '内蒙古自治区' },
  { 'KEYC': '21', 'VALUEC': '辽宁省' },
  { 'KEYC': '22', 'VALUEC': '吉林省' },
  { 'KEYC': '23', 'VALUEC': '黑龙江省' },
  { 'KEYC': '31', 'VALUEC': '上海市' },
  { 'KEYC': '32', 'VALUEC': '江苏省' },
  { 'KEYC': '33', 'VALUEC': '浙江省' },
  { 'KEYC': '34', 'VALUEC': '安徽省' },
  { 'KEYC': '35', 'VALUEC': '福建省' },
  { 'KEYC': '36', 'VALUEC': '江西省' },
  { 'KEYC': '37', 'VALUEC': '山东省' },
  { 'KEYC': '41', 'VALUEC': '河南省' },
  { 'KEYC': '42', 'VALUEC': '湖北省' },
  { 'KEYC': '43', 'VALUEC': '湖南省' },
  { 'KEYC': '44', 'VALUEC': '广东省' },
  { 'KEYC': '45', 'VALUEC': '广西壮族自治区' },
  { 'KEYC': '46', 'VALUEC': '海南省' },
  { 'KEYC': '50', 'VALUEC': '重庆市' },
  { 'KEYC': '51', 'VALUEC': '四川省' },
  { 'KEYC': '52', 'VALUEC': '贵州省' },
  { 'KEYC': '53', 'VALUEC': '云南省' },
  { 'KEYC': '54', 'VALUEC': '西藏自治区' },
  { 'KEYC': '61', 'VALUEC': '陕西省' },
  { 'KEYC': '62', 'VALUEC': '甘肃省' },
  { 'KEYC': '63', 'VALUEC': '青海省' },
  { 'KEYC': '64', 'VALUEC': '宁夏回族自治区' },
  { 'KEYC': '65', 'VALUEC': '新疆维吾尔自治区' },
  { 'KEYC': '71', 'VALUEC': '台湾省' },
  { 'KEYC': '81', 'VALUEC': '香港特别行政区' },
  { 'KEYC': '82', 'VALUEC': '澳门特别行政区' }
]

// 联系方式
export const routeList = [
  { 'KEYC': '01', 'VALUEC': '联系电话' },
  { 'KEYC': '02', 'VALUEC': '办公电话' },
  { 'KEYC': '03', 'VALUEC': '家庭电话' },
  { 'KEYC': '04', 'VALUEC': '传真号码' },
  { 'KEYC': '05', 'VALUEC': '移动电话' },
  { 'KEYC': '06', 'VALUEC': '业务验证电话' },
  { 'KEYC': '07', 'VALUEC': 'SWIFT' },
  { 'KEYC': '08', 'VALUEC': 'QQ' },
  { 'KEYC': '09', 'VALUEC': 'MSN' },
  { 'KEYC': '10', 'VALUEC': '主Email' },
  { 'KEYC': '11', 'VALUEC': '备用Email' },
  { 'KEYC': '12', 'VALUEC': '电报' },
  { 'KEYC': '13', 'VALUEC': '微信' },
  { 'KEYC': '14', 'VALUEC': '备用Email' },
  { 'KEYC': '15', 'VALUEC': '网址' },
  { 'KEYC': '16', 'VALUEC': '信邮' },
  { 'KEYC': '17', 'VALUEC': '其他' }
]

// 国民经济部门
export const natiomalEconomyList = [
  { 'KEYC': 'A0000', 'VALUEC': '政府部门' },
  { 'KEYC': 'A0100', 'VALUEC': '中央政府' },
  { 'KEYC': 'A0200', 'VALUEC': '地方政府' },
  { 'KEYC': 'A0300', 'VALUEC': '社会保障基金' },
  { 'KEYC': 'B0000', 'VALUEC': '金融机构部门' },
  { 'KEYC': 'B0100', 'VALUEC': '货币当局' },
  { 'KEYC': 'B0200', 'VALUEC': '监管当局' },
  { 'KEYC': 'B0300', 'VALUEC': '银行业存款类金融机构' },
  { 'KEYC': 'B0400', 'VALUEC': '银行业非存款类金融机构' },
  { 'KEYC': 'B0500', 'VALUEC': '证券业金融机构' },
  { 'KEYC': 'B0600', 'VALUEC': '保险业金融机构' },
  { 'KEYC': 'B0700', 'VALUEC': '交易及结算类金融机构' },
  { 'KEYC': 'B0800', 'VALUEC': '金融控股公司' },
  { 'KEYC': 'B0900', 'VALUEC': '特定目的载体' },
  { 'KEYC': 'B9900', 'VALUEC': '其他' },
  { 'KEYC': 'C0000', 'VALUEC': '非金融企业部门' },
  { 'KEYC': 'C0100', 'VALUEC': '公司' },
  { 'KEYC': 'C0200', 'VALUEC': '非公司企业' },
  { 'KEYC': 'C9900', 'VALUEC': '其他非金融企业部门' },
  { 'KEYC': 'D0000', 'VALUEC': '住户部门' },
  { 'KEYC': 'D0100', 'VALUEC': '住户' },
  { 'KEYC': 'D0200', 'VALUEC': '为住户服务的非营利机构' },
  { 'KEYC': 'E0000', 'VALUEC': '国外部门' },
  { 'KEYC': 'E0100', 'VALUEC': '国际组织' },
  { 'KEYC': 'E0200', 'VALUEC': '外国政府' },
  { 'KEYC': 'E0300', 'VALUEC': '国外金融机构' },
  { 'KEYC': 'E0400', 'VALUEC': '国外非金融企业' },
  { 'KEYC': 'E0500', 'VALUEC': '外国居民' },
  { 'KEYC': 'F0900', 'VALUEC': '未知' }
]

// 特殊经济区类型
export const specialEcoTypeList = [
  { 'KEYC': '0308000001', 'VALUEC': '保税区' },
  { 'KEYC': '0308000002', 'VALUEC': '出口加工区' },
  { 'KEYC': '0308000003', 'VALUEC': '保税物流中心B型' },
  { 'KEYC': '0308000004', 'VALUEC': '保税物流园区' },
  { 'KEYC': '0308000005', 'VALUEC': '钻石交易所' },
  { 'KEYC': '0308000006', 'VALUEC': '保税港区' },
  { 'KEYC': '0308000007', 'VALUEC': '综合保税区' },
  { 'KEYC': '0308000008', 'VALUEC': '跨境工业园区' },
  { 'KEYC': '0308000009', 'VALUEC': '保税物流中心A型' },
  { 'KEYC': '0308000010', 'VALUEC': '出口监管仓库' },
  { 'KEYC': '0308000011', 'VALUEC': '进口保税仓库' },
  { 'KEYC': '0308000099', 'VALUEC': '其它' }
]

// 出资人经济成分
export const sponsorFinList = [
  { 'KEYC': 'A0000', 'VALUEC': '公有控股经济' },
  { 'KEYC': 'A0100', 'VALUEC': '国有控股' },
  { 'KEYC': 'A0101', 'VALUEC': '国有相对控股' },
  { 'KEYC': 'A0102', 'VALUEC': '国有绝对控股' },
  { 'KEYC': 'A0200', 'VALUEC': '集体控股' },
  { 'KEYC': 'A0201', 'VALUEC': '集体相对控股' },
  { 'KEYC': 'A0202', 'VALUEC': '集体绝对控股' },
  { 'KEYC': 'B0000', 'VALUEC': '非公有控股经济' },
  { 'KEYC': 'B0100', 'VALUEC': '私人控股' },
  { 'KEYC': 'B0101', 'VALUEC': '私人相对控股' },
  { 'KEYC': 'B0102', 'VALUEC': '私人绝对控股' },
  { 'KEYC': 'B0200', 'VALUEC': '港澳台控股' },
  { 'KEYC': 'B0201', 'VALUEC': '港澳台相对控股' },
  { 'KEYC': 'B0202', 'VALUEC': '港澳台绝对控股' },
  { 'KEYC': 'B0300', 'VALUEC': '外商控股' },
  { 'KEYC': 'B0301', 'VALUEC': '外商相对控股' },
  { 'KEYC': 'B0302', 'VALUEC': '外商绝对控股' },
  { 'KEYC': 'C0400', 'VALUEC': '未知' }
]

// 企业经济类型
export const businessList = [
  { 'KEYC': '110', 'VALUEC': '内资-国有全资' },
  { 'KEYC': '120', 'VALUEC': '内资-集体全资' },
  { 'KEYC': '130', 'VALUEC': '内资-股份合作' },
  { 'KEYC': '140', 'VALUEC': '联营经济' },
  { 'KEYC': '141', 'VALUEC': '内资-联营-国有联营' },
  { 'KEYC': '142', 'VALUEC': '内资-联营-集体联营' },
  { 'KEYC': '143', 'VALUEC': '内资-联营-国有与集体联营' },
  { 'KEYC': '149', 'VALUEC': '内资-联营-其他联营' },
  { 'KEYC': '151', 'VALUEC': '内资-有限责任（公司）-国有独资（公司）' },
  { 'KEYC': '152', 'VALUEC': '内资-有限责任（公司）-其他有限责任（公司）' },
  { 'KEYC': '160', 'VALUEC': '内资-股份有限（公司）' },
  { 'KEYC': '170', 'VALUEC': '私营经济' },
  { 'KEYC': '171', 'VALUEC': '内资-私有（私营）-独资' },
  { 'KEYC': '172', 'VALUEC': '内资-私有（私营）-合伙' },
  { 'KEYC': '173', 'VALUEC': '内资-私有（私营）-有限责任（公司）' },
  { 'KEYC': '174', 'VALUEC': '内资-私有（私营）-股份有限（公司）' },
  { 'KEYC': '175', 'VALUEC': '内资-个体经营' },
  { 'KEYC': '176', 'VALUEC': '内资-其他私有' },
  { 'KEYC': '180', 'VALUEC': '其它经济' },
  { 'KEYC': '190', 'VALUEC': '内资-其他内资' },
  { 'KEYC': '200', 'VALUEC': '港澳台投资经济' },
  { 'KEYC': '210', 'VALUEC': '港澳台投资-内地和港澳台合资' },
  { 'KEYC': '220', 'VALUEC': '港澳台投资-内地和港澳台合作' },
  { 'KEYC': '230', 'VALUEC': '港澳台投资-港澳台独资' },
  { 'KEYC': '240', 'VALUEC': '港澳台投资-港澳台投资股份有限（公司）' },
  { 'KEYC': '250', 'VALUEC': '港澳台投资-其他港澳台投资' },
  { 'KEYC': '300', 'VALUEC': '外商投资经济' },
  { 'KEYC': '310', 'VALUEC': '国外投资-中外合资' },
  { 'KEYC': '320', 'VALUEC': '国外投资-中外合作' },
  { 'KEYC': '330', 'VALUEC': '国外投资-外资独资' },
  { 'KEYC': '340', 'VALUEC': '国外投资-国外投资股份有限（公司）' },
  { 'KEYC': '350', 'VALUEC': '国外投资-其他国外投资' },
  { 'KEYC': '400', 'VALUEC': '个体经营' },
  { 'KEYC': '410', 'VALUEC': '个体经营－个体户' },
  { 'KEYC': '420', 'VALUEC': '个体经营－个人合伙' },
  { 'KEYC': '500', 'VALUEC': '国家党政机关' },
  { 'KEYC': '510', 'VALUEC': '事业单位' },
  { 'KEYC': '600', 'VALUEC': '军队' },
  { 'KEYC': '700', 'VALUEC': '社会团体' },
  { 'KEYC': '810', 'VALUEC': '境外公司-外资公司' },
  { 'KEYC': '820', 'VALUEC': '境外公司-中资公司' },
  { 'KEYC': '830', 'VALUEC': '境外公司-金融机构' },
  { 'KEYC': '900', 'VALUEC': '外国政府' },
  { 'KEYC': '999', 'VALUEC': '未知' }
]

// 客户类型
export const clientTypeList = [
  { 'KEYC': '02', 'VALUEC': '公司' },
  { 'KEYC': '03', 'VALUEC': '同业' },
  { 'KEYC': '04', 'VALUEC': '内部' },
  { 'KEYC': '05', 'VALUEC': '政府' },
  { 'KEYC': '09', 'VALUEC': '其他' }
]

// 客户分类
export const categoryTypeList = [
  { 'KEYC': '201', 'VALUEC': '国有企业' },
  { 'KEYC': '202', 'VALUEC': '集体企业' },
  { 'KEYC': '203', 'VALUEC': '合资经营企业' },
  { 'KEYC': '204', 'VALUEC': '合作经营企业' },
  { 'KEYC': '205', 'VALUEC': '有限责任公司' },
  { 'KEYC': '206', 'VALUEC': '股份有限公司' },
  { 'KEYC': '207', 'VALUEC': '私营企业' },
  { 'KEYC': '208', 'VALUEC': '港、澳、台商投资企业' },
  { 'KEYC': '209', 'VALUEC': '外商投资企业' },
  { 'KEYC': '210', 'VALUEC': '个体工商户' },
  { 'KEYC': '211', 'VALUEC': '港、澳、台商独资经营企业' },
  { 'KEYC': '212', 'VALUEC': '小额贷款公司' },
  { 'KEYC': '213', 'VALUEC': '内资企业' },
  { 'KEYC': '214', 'VALUEC': '港、澳、台商投资股份有限公司' },
  { 'KEYC': '215', 'VALUEC': '中外合资经营企业' },
  { 'KEYC': '216', 'VALUEC': '中外合作经营企业' },
  { 'KEYC': '217', 'VALUEC': '外资企业' },
  { 'KEYC': '218', 'VALUEC': '外商投资股份有限公司' },
  { 'KEYC': '219', 'VALUEC': '事业单位' },
  { 'KEYC': '220', 'VALUEC': '社会团体' },
  { 'KEYC': '221', 'VALUEC': '党政机关' },
  { 'KEYC': '299', 'VALUEC': '其他公司客户' },

  { 'KEYC': '301', 'VALUEC': '人民银行' },
  { 'KEYC': '303', 'VALUEC': '国有商业银行' },
  { 'KEYC': '304', 'VALUEC': '政策性银行' },
  { 'KEYC': '306', 'VALUEC': '信托投资公司' },
  { 'KEYC': '307', 'VALUEC': '其他金融性公司' },
  { 'KEYC': '308', 'VALUEC': '外资银行' },
  { 'KEYC': '309', 'VALUEC': '合资银行' },
  { 'KEYC': '310', 'VALUEC': '外资或中外合资非银行金融机构' },
  { 'KEYC': '311', 'VALUEC': '外国银行分行' },
  { 'KEYC': '312', 'VALUEC': '城市商业银行' },
  { 'KEYC': '313', 'VALUEC': '农村合作银行' },
  { 'KEYC': '314', 'VALUEC': '其他商业银行' },
  { 'KEYC': '315', 'VALUEC': '境外中资非银行金融机构' },
  { 'KEYC': '316', 'VALUEC': '境外外资非银行金融机构' },
  { 'KEYC': '317', 'VALUEC': '境外中资银行' },
  { 'KEYC': '318', 'VALUEC': '境外外资银行' },
  { 'KEYC': '319', 'VALUEC': '城市信用社' },
  { 'KEYC': '320', 'VALUEC': '农村商业银行' },
  { 'KEYC': '321', 'VALUEC': '财务公司' },
  { 'KEYC': '322', 'VALUEC': '证券公司' },
  { 'KEYC': '323', 'VALUEC': '保险公司' },
  { 'KEYC': '324', 'VALUEC': '股份制商业银行' },
  { 'KEYC': '325', 'VALUEC': '村镇银行' },
  { 'KEYC': '326', 'VALUEC': '结算公司' },
  { 'KEYC': '327', 'VALUEC': '资产管理公司' },
  { 'KEYC': '328', 'VALUEC': '邮政储汇局' },
  { 'KEYC': '329', 'VALUEC': '特定目的载体' },

  { 'KEYC': '601', 'VALUEC': '内部客户' },
  { 'KEYC': '401', 'VALUEC': '中央直属' },
  { 'KEYC': '402', 'VALUEC': '省直属' },
  { 'KEYC': '403', 'VALUEC': '市直属' },
  { 'KEYC': '404', 'VALUEC': '事业单位' },
  { 'KEYC': '499', 'VALUEC': '其他政府机关' },
  { 'KEYC': '501', 'VALUEC': '社会团体' },
  { 'KEYC': '502', 'VALUEC': '部队' },
  { 'KEYC': '599', 'VALUEC': '其他' }
]

// 交易类型
export const eventTypeList = [
  { 'KEYC': 'VA1001', 'VALUEC': '对公钱包账簿充值' },
  { 'KEYC': 'VA1002', 'VALUEC': '对公钱包账簿转入' },
  { 'KEYC': 'VA1003', 'VALUEC': '对公钱包账簿转出' },
  { 'KEYC': 'VA1004', 'VALUEC': '对公钱包账簿余额提现' },
  { 'KEYC': 'VA1012', 'VALUEC': '借记调账' },
  { 'KEYC': 'VA1013', 'VALUEC': '贷记调账' },
  { 'KEYC': 'VA1101', 'VALUEC': '对公钱包账簿充值冲正' },
  { 'KEYC': 'VA1102', 'VALUEC': '对公钱包账簿转入冲正' },
  { 'KEYC': 'VA1103', 'VALUEC': '对公钱包账簿转出冲正' },
  { 'KEYC': 'VA1104', 'VALUEC': '对公钱包账簿余额提现冲正' },
  { 'KEYC': 'VA2001', 'VALUEC': '对公钱包账簿收单入账' },
  { 'KEYC': 'VA2002', 'VALUEC': '混合场景转入' },
  { 'KEYC': 'VA2003', 'VALUEC': '混合场景转出' },
  { 'KEYC': 'VA2101', 'VALUEC': '对公钱包账簿收单入账冲正' },
  { 'KEYC': 'VA2102', 'VALUEC': '混合场景转入冲正' },
  { 'KEYC': 'VA2103', 'VALUEC': '混合场景转出冲正' },
  { 'KEYC': 'VA3001', 'VALUEC': '对公钱包贷款账簿入账' },
  { 'KEYC': 'VA3002', 'VALUEC': '对公钱包贷款账簿还款' },
  { 'KEYC': 'VA3101', 'VALUEC': '对公钱包贷款账簿入账冲正' },
  { 'KEYC': 'VA3102', 'VALUEC': '对公钱包贷款账簿还款冲正' }
]

// 产品类型
export const prodTypeList = [
  { 'KEYC': '920101', 'VALUEC': '对公虚拟钱包余额账簿' },
  { 'KEYC': '920102', 'VALUEC': '对公虚拟钱包贷款账簿' }
]

// 渠道类型
export const sourceTypeList = [
  { 'KEYC': '020114', 'VALUEC': '个金系统' },
  { 'KEYC': '010113', 'VALUEC': '贷后村收系统' },
  { 'KEYC': '010106', 'VALUEC': '客服系统' },
  { 'KEYC': '010102', 'VALUEC': '手机银行' },
  { 'KEYC': '020115', 'VALUEC': '网贷' },
  { 'KEYC': '020153', 'VALUEC': '开放平台' },
  { 'KEYC': '020151', 'VALUEC': '聚合支付' },
  { 'KEYC': '020120', 'VALUEC': '供应链金融管理系统' },
  { 'KEYC': '020155', 'VALUEC': '钱包中心' }
]

// 限制类型
export const restraintTypeList = [
  { 'KEYC': 'AHA', 'VALUEC': '司法全额冻结' },
  { 'KEYC': 'FHE', 'VALUEC': '超额资金冻结' },
  { 'KEYC': 'FH', 'VALUEC': '资金冻结' },
  { 'KEYC': 'AH', 'VALUEC': '司法冻结' },
  { 'KEYC': 'AS', 'VALUEC': '终止用户所有操作' },
  { 'KEYC': 'SD', 'VALUEC': '停止存入交易' },
  { 'KEYC': 'DA', 'VALUEC': '账户余额止付' },
  { 'KEYC': 'SW', 'VALUEC': '停止支取交易' }
]
