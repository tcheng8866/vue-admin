<!-- template是页面模板；根template只允许一个子元素（约定），子集里面可以有多个元素; -->
<template>
  <!-- app-container是我封装的一个全局样式、控制页面区域的整体边框定义在 BM\va-front\src\assets\global.less -->
  <!-- 全局样式都在global.less里覆盖重写，比如审核页面各种特别处理的样式 -->
  <div class="app-container">
    <!-- 上送条件 -->
    <!-- el-form表单：model是页面模型，类似于javabean、支持直接赋值修改，需要在script data里初始化 -->
    <!-- inline控制是一行显示一项还是多项 -->
    <!-- ref用于获取dom元素（类似于vue中使用jquery），用法this.$refs.xxx -->
    <!-- rules是vue-validate用户输入验证 -->
    <el-form ref="queryForm" :model="queryForm" :rules="rules" :inline="true" label-width="130px">
      <el-form-item label="平台编号:" prop="platformId">
        <!-- trim处理空格、clearable输入框支持清除 -->
        <el-input v-model.trim="queryForm.platformId" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <!-- type: primary / success / warning / danger / info / text  button的颜色 -->
        <!-- query是查询列表的方法，这里每次点击搜索都要先把当前页码置1 -->
        <el-button type="primary" icon="el-icon-search" @click="currentPage=1;query('queryForm')">查询</el-button>
        <!-- 这里只是点击让新增弹框显示出来 -->
        <!-- 选择icon可以查询官网：https://element.eleme.cn/#/zh-CN/component/icon -->
        <el-button type="primary" icon="el-icon-circle-plus" @click="bindClickAdd('detailForm')">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <!-- data用于接收后端返回数据，渲染页面 -->
    <!-- border表单 -->
    <el-table v-loading="tableLoading" :data="tableData" border style="width: 100%">
      <el-table-column prop="platformId" label="平台编号">
        <!-- 这是我封装的 循环数组找匹配项的方法 -->
        <!-- <template slot-scope="scope">自定义模板、可以获取到当前项的 row/column/$index -->
        <template slot-scope="scope">{{ $getLableBykey(scope.row.platformId, platformIdList) }}</template>
      </el-table-column>
      <el-table-column prop="status" label="限额事件" width="150">
        <template slot-scope="scope">{{ $getLableBykey(scope.row.limitEvent, limitEventList) }}</template>
      </el-table-column>
      <el-table-column prop="status" label="额度类型">
        <template slot-scope="scope">{{ $getLableBykey(scope.row.limitType, limitTypeList) }}</template>
      </el-table-column>
      <el-table-column prop="minAmt" label="最小金额" />
      <el-table-column prop="maxAmt" label="最大金额" />
      <el-table-column prop="totalAmt" label="总额度" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">{{ $getLableBykey(scope.row.status, statusList) }}</template>
      </el-table-column>
      <el-table-column prop="updateDate" label="更新日期" />
      <!-- fixed="right"固定于右侧、固定列 -->
      <el-table-column fixed="right" label="操作" width="180px">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="bindClickEdit(scope.row)">编辑</el-button>
          <el-button type="info" size="small" icon="el-icon-delete" @click="bindClickDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <!-- 分页组价默认在左侧，需要style="text-align: right; margin-top: 5px;"重写定位 -->
    <!-- <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10,20,50,100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      style="text-align: right; margin-top: 5px;"
    ></el-pagination> -->
    <!--  -->
    <!-- 弹框 -->
    <!-- 弹框超过60%往上时考虑调整为固定值（比如：width="900px"），这样再1080分辨率下不会百分比缩小导致显示异常 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" center width="40%">
      <el-form
        ref="detailForm"
        :model="detailForm"
        :rules="rulesDetail"
        :inline="true"
        label-width="150px"
        style="padding-left: 60px;"
      >
        <el-form-item label="平台编号:" prop="platformId">
          <!-- 下拉列表：disabled禁止 不允许点击输入等 -->
          <el-select v-model="detailForm.platformId" :disabled="flag=='edit'" clearable placeholder="请选择平台编号">
            <!-- platformIdList动态接口获取平台数组 -->
            <el-option
              v-for="item in platformIdList"
              :key="item.KEYC"
              :label="item.KEYC + ' ' + item.VALUEC"
              :value="item.KEYC"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="限额事件:" prop="limitEvent">
          <el-select v-model="detailForm.limitEvent" disabled clearable placeholder="请选择限额事件">
            <el-option
              v-for="item in limitEventList"
              :key="item.KEYC"
              :label="item.KEYC + ' ' + item.VALUEC"
              :value="item.KEYC"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="限额类型:" prop="limitType">
          <el-select v-model="detailForm.limitType" :disabled="flag=='edit'" clearable placeholder="请选择限额类型">
            <el-option
              v-for="item in limitTypeList"
              :key="item.KEYC"
              :label="item.KEYC + ' ' + item.VALUEC"
              :value="item.KEYC"
            />
          </el-select>
        </el-form-item>
        <!-- vi-if 表达式为true时显示，可以单个使用们也可以 v-if/v-else 组合使用 -->
        <el-form-item v-if="detailForm.limitType=='SIN'" label="单笔最小金额:" prop="minAmt">
          <!-- 处理输入为金额 -->
          <el-input v-model="detailForm.minAmt" disabled clearable placeholder="请输入单笔最小金额" @input="minAmtInputMoney" />
        </el-form-item>
        <el-form-item v-if="detailForm.limitType=='SIN'" label="单笔最大金额:" prop="maxAmt">
          <el-input v-model="detailForm.maxAmt" clearable placeholder="请输入单笔最大金额" @input="maxAmtInputMoney" />
        </el-form-item>
        <el-form-item v-if="detailForm.limitType=='CTD'" label="单日限额额度:" prop="totalAmt">
          <el-input v-model="detailForm.totalAmt" clearable placeholder="请输入单日限额额度" @input="totalAmtInputMoney" />
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-select v-model="detailForm.status" clearable placeholder="请选择状态">
            <el-option
              v-for="item in statusList"
              :key="item.KEYC"
              :label="item.KEYC + ' ' + item.VALUEC"
              :value="item.KEYC"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="更新日期:" prop="updateDate">
          <el-input v-model="detailForm.updateDate" disabled clearable placeholder="请输入更新日期" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="btnLoading" @click="submit('detailForm')">确 定</el-button>
        <el-button @click="cancel('detailForm')">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入封装的请求
import { axios } from '@/utils/requestService'
// 引入抽离的请求路径
import Api from '@/constants/Api'
// 引入公共方法、常亮
import { getSelectData } from '@/utils/dataUtils'
export default {
  // 支持keeep-alive必须配组件名称，且和文件名称相同
  // keeep-alive就是缓存、在用户切换顶部tab页签时可以缓存页面，在router里配置
  name: 'AddDemo',
  // 固定写法 data是一个函数时，每个组件实例都有自己的作用域，每个实例相互独立，不会相互影响
  data() {
    return {
      // 以下都是页面model的初始化
      platformIdList: [],
      limitEventList: [
        { 'KEYC': 'WITHDRAW', 'VALUEC': '提现' }
      ],
      limitTypeList: [
        { 'KEYC': 'SIN', 'VALUEC': '单笔' },
        { 'KEYC': 'CTD', 'VALUEC': '日累计' }
      ],
      statusList: [
        { 'KEYC': 'Y', 'VALUEC': '可用' },
        { 'KEYC': 'N', 'VALUEC': '不可用' }
      ],
      queryForm: {
        platformId: ''
      },
      tableData: [],
      tableLoading: false,
      // 分页相关： 当前页、每页显示条数、总条数
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      // 搜索上送表单验证（required为true时生效）
      rules: {
        platformId: [{
          required: false,
          message: '请选择平台编号',
          trigger: 'change'
        }]
      },
      // 弹框相关： 显示隐藏、标题
      dialogVisible: false,
      dialogTitle: '',
      detailForm: {},
      btnLoading: false, // v-loading指令通过给对应dom节点添加遮罩，可以做到【防重】，不需要搞disabled那一套
      flag: '', // 01-查询 02-新增 03-修改 04删除
      row: {},
      // 新增/编辑表单验证
      rulesDetail: {
        platformId: [{
          required: true,
          message: '请选择平台编号',
          trigger: 'change'
        }],
        limitEvent: [{
          required: true,
          message: '请选择限额事件',
          trigger: 'change'
        }],
        limitType: [{
          required: true,
          message: '请选择限额类型',
          trigger: 'change'
        }],
        minAmt: [{
          required: true,
          message: '请输入单笔最小金额',
          trigger: 'change'
        }],
        maxAmt: [{
          required: true,
          message: '请输入单笔最大金额',
          trigger: 'change'
        }],
        totalAmt: [{
          required: true,
          message: '请输入单日限额额度',
          trigger: 'change'
        }],
        status: [{
          required: true,
          message: '请选择状态',
          trigger: 'change'
        }]
      }
    }
  },
  // 初始化
  created() {
    // 查字典（）
    this.getLoadData()
  },
  methods: {
    // 新增
    bindClickAdd(formName) {
      this.flag = 'add'
      this.dialogTitle = '新增平台'
      this.detailForm = {
        platformId: '',
        limitEvent: 'WITHDRAW',
        limitType: '',
        minAmt: 0,
        maxAmt: '',
        totalAmt: '',
        status: '',
        updateDate: this.$getDefaultDate()
      }
      // 清理关闭弹框不规范导致的验证样式
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields()
      }
      // 弹框显示
      this.dialogVisible = true
    },
    // 编辑
    bindClickEdit(row) {
      this.flag = 'edit'
      this.dialogTitle = '编辑平台'
      // 列表点击当前项赋值给弹框
      this.detailForm = {
        platformId: row.platformId,
        limitEvent: row.limitEvent,
        limitType: row.limitType,
        minAmt: row.minAmt,
        maxAmt: row.maxAmt,
        totalAmt: row.totalAmt,
        status: row.status,
        updateDate: row.updateDate // 显示上次修改时间
      }
      this.dialogVisible = true
    },
    // 点击确定提交表单数据
    submit(formName) {
      // vue-validate输入验证
      this.$refs[formName].validate(valid => {
        // 验证为true
        if (valid) {
          // 防重提交
          this.btnLoading = true
          let param = {}
          // 单笔 - 日累计
          if (this.detailForm.limitType === 'SIN') {
            param = {
              flag: this.flag === 'add' ? '02' : '03',
              platformId: this.detailForm.platformId,
              limitEvent: this.detailForm.limitEvent,
              limitType: this.detailForm.limitType,
              // 处理提交数据数据类型
              minAmt: Number(this.detailForm.minAmt),
              maxAmt: Number(this.detailForm.maxAmt),
              // totalAmt: this.detailForm.totalAmt,
              status: this.detailForm.status,
              updateDate: this.$getDefaultDate() // 本次修改时间
            }
          } else {
            param = {
              flag: this.flag === 'add' ? '02' : '03',
              platformId: this.detailForm.platformId,
              limitEvent: this.detailForm.limitEvent,
              limitType: this.detailForm.limitType,
              // minAmt: this.detailForm.minAmt,
              // maxAmt: this.detailForm.maxAmt,
              totalAmt: Number(this.detailForm.totalAmt),
              status: this.detailForm.status,
              updateDate: this.$getDefaultDate() // 本次修改时间
            }
          }
          axios.post(Api.genericIfp, {
            sysHead: {
              'sceneId': 'quota/withdrawal/limitCheck/manage'
            },
            body: param
          })
            .then((response) => {
              this.btnLoading = false
              const retStatus = response.sysHead.retStatus
              if (retStatus === 'S') {
              // 提交成功：关闭弹框、刷新列表
                this.dialogVisible = false
                this.$refs[formName].resetFields()
                this.$message.success('操作成功')
                this.query('queryForm')
              }
            })
            .catch((error) => {
            // 异常 不关闭弹框 仅关闭loading
              console.log(error)
              this.btnLoading = false
            })
        }
      })
    },
    // 点击取消关闭弹窗
    cancel(formName) {
      this.dialogVisible = false
      this.$refs[formName].resetFields()
    },
    // 删除
    bindClickDel(row) {
      // 删除的二次确认一般使用$confirm来弹框，自己写telement模板控制也可以
      this.$confirm('请确定是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
        // 点击确定
          this.row = { ...row }
          this.row.flag = '04'
          // genericIfp 是bm-core/va-front的默认公共转发方法
          axios.post(Api.genericIfp, {
            sysHead: {
            // 请求其他中心的路径
              'sceneId': 'quota/withdrawal/limitCheck/manage'
            },
            body: this.row
          })
            .then(response => {
              // 判断标识
              const retStatus = response.sysHead.retStatus
              if (retStatus === 'S') {
                // 操作成功弹框提示、刷新列表
                this.$message.success('操作成功')
                this.query('queryForm')
              }
            })
            .catch(error => {
              // 出错走公共弹框
              console.log(error)
            })
        })
        .catch(() => {
        // 用户取消删除
          this.$message.info('已取消')
        })
    },
    getLoadData() {
      // 查询字典
      // 注意 bm-front的pkInfo EC_PLATFORM.PLATFORM_ID|PLATFORM_NAME?COMPANY
      // va-front 少了 “?COMPANY”
      getSelectData(this, {
        pkInfo: `EC_PLATFORM.PLATFORM_ID|PLATFORM_NAME`
      }, Api.getref, 'platformIdList')
    },
    // 查询列表
    query(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tableLoading = true
          axios.post(Api.genericIfp, {
            sysHead: {
              sceneId: 'quota/withdrawal/limitCheck/manage'
            },
            // appHead 分页参数
            appHead: {
              totalNum: this.pageSize,
              currentPage: this.currentPage
            },
            body: {
              platformId: this.queryForm.platformId,
              flag: '01'
            }
          })
            .then(response => {
              this.tableLoading = false
              if (response.body) {
              // 后端返回体  字符串/对象 不稳定，这里做下适配
                if (response.body instanceof Object) {
                  this.tableData = response.body.wirhdrawInfoList
                } else {
                  this.tableData = JSON.parse(response.body).wirhdrawInfoList
                }
              // this.totalCount = Number(response.appHead.totalRows)
              } else {
                this.tableData = []
              // this.totalCount = 0
              }
            })
            .catch(error => {
              console.log(error)
              this.tableLoading = false
              this.tableData = []
            // this.totalCount = 0
            })
        }
      })
    },
    // 改变每页显示条数
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.query('queryForm')
    },
    // 改变当前页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.query('queryForm')
    },
    // 单笔最小金额
    minAmtInputMoney(value) {
      // 去掉数字和.以外的内容
      value = value.replace(/[^\d.]/g, '')
      // 不允许.开头
      value = value.replace(/^\./g, '')
      // 去掉连续的.
      value = value.replace(/\.{2,}/g, '.')
      // 只允许一个点，第一个会匹配到第一个点，第二个会匹配到剩余的点
      // 因为是输入框，最多会呈现到‘1.23.’这种方式
      // 注意第一个点是字符串方式匹配，第二个是正则匹配
      value = value
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      // 两位小数，‘\.(\d\d)’匹配到两位数
      value = value.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      this.detailForm.minAmt = value
    },
    // 单笔最大金额
    maxAmtInputMoney(value) {
      // 去掉数字和.以外的内容
      value = value.replace(/[^\d.]/g, '')
      // 不允许.开头
      value = value.replace(/^\./g, '')
      // 去掉连续的.
      value = value.replace(/\.{2,}/g, '.')
      // 只允许一个点，第一个会匹配到第一个点，第二个会匹配到剩余的点
      // 因为是输入框，最多会呈现到‘1.23.’这种方式
      // 注意第一个点是字符串方式匹配，第二个是正则匹配
      value = value
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      // 两位小数，‘\.(\d\d)’匹配到两位数
      value = value.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      this.detailForm.maxAmt = value
    },
    // 单日限额金额
    totalAmtInputMoney(value) {
      // 去掉数字和.以外的内容
      value = value.replace(/[^\d.]/g, '')
      // 不允许.开头
      value = value.replace(/^\./g, '')
      // 去掉连续的.
      value = value.replace(/\.{2,}/g, '.')
      // 只允许一个点，第一个会匹配到第一个点，第二个会匹配到剩余的点
      // 因为是输入框，最多会呈现到‘1.23.’这种方式
      // 注意第一个点是字符串方式匹配，第二个是正则匹配
      value = value
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      // 两位小数，‘\.(\d\d)’匹配到两位数
      value = value.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      this.detailForm.totalAmt = value
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
// 样式卸载这里    注意  scoped 限制样式作用范围仅当前页面生效
// 使用 less scss 可以支持css变量设置、支持嵌套
</style>
