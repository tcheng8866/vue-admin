export default {
  // 公共请求方法
  genericIfp: 'va-core/generic/ifp',
  // bp common post request
  postBpCommonRequest: 'va-core/commonservice/bp',
  // ifp common post request
  postIfpCommonRequest: 'va-core/commonservice/ifp',
  // 获取下拉列表和翻译
  getref: 'va-core/commonservice/getref',

  // 已审核列表[经办人、复核人]
  walletAuditedList: 'va-core/bmTranInfo/listBypage',
  // 审批记录
  getAuditHistory: 'va-core/bmTranInfo/listHistory',
  // 待审核列表[经办人] 使用原接口调用uc
  // 审核操作[经办人]
  enterOperateByType: 'va-core/bmPachage/operateByType',
  // 待审核列表[复核人]
  reviewToWalletAuditedList: 'va-core/bmTask/listBypage',
  // 审核操作[复核人]（经办人 被驳回再次提交也用这个TODO）
  reviewOperateByType: 'va-core/bmTask/operateByType'
}
