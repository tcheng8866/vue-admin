<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryForm" :rules="rules" :inline="true" label-width="130px">
      <el-form-item label="姓名:" prop="documentName">
        <el-input v-model="queryForm.documentName" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item label="身份证号:" prop="documentId">
        <el-input v-model="queryForm.documentId" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item label="手机号:" prop="phone">
        <el-input v-model="queryForm.phone" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item label="平台编号:" prop="platformId">
        <el-select v-model="queryForm.platformId" filterable allow-create clearable placeholder="请输入">
          <el-option
            v-for="item in platformIdList"
            :key="item.KEYC"
            :label="item.KEYC + ' ' + item.VALUEC"
            :value="item.KEYC"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="时间范围:" class="date-box" prop="date">
        <el-date-picker
          v-model="queryForm.date"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyyMMdd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <!-- <el-form-item label="对账日期:" class="date-box" prop="collateDate">
        <el-date-picker
          v-model="queryForm.collateDate"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyyMMdd"
          placeholder="请选择对账日期"
        ></el-date-picker>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="currentPage=1;query('queryForm')">查询</el-button>
        <el-button type="primary" icon="el-icon-download" @click="currentPage=1;exportALL('queryForm')">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="tableLoading" :data="tableData" border style="width: 100%">
      <el-table-column prop="documentName" label="姓名" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="documentId" label="身份证号" />
      <el-table-column prop="platformId" label="平台编号">
        <template slot-scope="scope">{{ $getLableBykey(scope.row.platformId, platformIdList) }}</template>
      </el-table-column>
      <el-table-column prop="baseAcctNo" label="电子账户" />
      <el-table-column prop="acctOpenDate" label="开户时间" />
      <el-table-column prop="acctCloseDate" label="销户时间" />
    </el-table>
    <el-pagination
      background
      :current-page="currentPage"
      :page-sizes="[10,20,50,100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      style="text-align: right; margin-top: 5px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { axios } from '@/utils/requestService'
import Api from '@/constants/Api'
import { getSelectData } from '@/utils/dataUtils'
export default {
  // 支持keeep-alive必须配组件名称，且和文件名称相同
  name: 'QueryDemo',
  data() {
    return {
      platformIdList: [],
      exportData: [],
      tableData: [],
      tableLoading: false,
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      queryForm: {
        documentName: '',
        documentId: '',
        phone: '',
        platformId: 'XSB',
        date: [this.$getAMonthAgoDate(), this.$getDefaultDate()]
      },
      rules: {
        documentName: [{
          required: false,
          message: '请输入',
          trigger: 'change'
        }],
        documentId: [{
          required: false,
          message: '请输入',
          trigger: 'change'
        }],
        phone: [{
          required: false,
          message: '请输入',
          trigger: 'change'
        }],
        platformId: [{
          required: false,
          message: '请选择',
          trigger: 'change'
        }],
        date: [{
          required: false,
          message: '请选择',
          trigger: 'change'
        }]
      }
    }
  },
  created() {
    this.getLoadData()
  },
  methods: {
    getLoadData() {
      getSelectData(this, {
        pkInfo: `EC_PLATFORM.PLATFORM_ID|PLATFORM_NAME`
      }, Api.getref, 'platformIdList')
    },
    // 查询列表
    query(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$validateNull(this.queryForm.documentName) && this.$validateNull(this.queryForm.documentId) &&
            this.$validateNull(this.queryForm.phone) && this.$validateNull(this.queryForm.platformId) && this.$validateNull(this.queryForm.date)) {
            this.$message.info('姓名、身份证号、手机号、平台编号、时间范围必输其一！')
            return
          }
          if (this.queryForm && this.queryForm.date && this.queryForm.date.length > 0) {
            const resDiff = this.$isDateDiffOver(this.queryForm.date[0], this.queryForm.date[1])
            if (resDiff) {
              this.$message.info('日期范围应在30天内')
              return
            }
          }
          this.tableLoading = true
          const param = {
            documentName: this.queryForm.documentName,
            documentId: this.queryForm.documentId,
            phone: this.queryForm.phone,
            platformId: this.queryForm.platformId,
            startDate: this.$validateNull(this.queryForm.date) ? '' : this.queryForm.date[0],
            endDate: this.$validateNull(this.queryForm.date) ? '' : this.queryForm.date[1]
          }
          axios.post(Api.genericIfp, {
            sysHead: {
              'sceneId': 'bp/acct/cancel/query'
            },
            appHead: {
              totalNum: this.pageSize,
              currentPage: this.currentPage
            },
            body: param
          })
            .then(response => {
              this.tableLoading = false
              if (response.body) {
                if (response.body instanceof Object) {
                  this.tableData = response.body.cancelAcctArray
                } else {
                  this.tableData = JSON.parse(response.body).cancelAcctArray
                }
                this.totalCount = Number(response.appHead.totalRows)
                this.retStatus = response.sysHead.retStatus
              } else {
                this.tableData = []
                this.totalCount = 0
              }
            })
            .catch(error => {
              console.log(error)
              this.tableLoading = false
              this.tableData = []
              this.totalCount = 0
            })
        }
      })
    },
    // 导出全部（需要先查全部）
    exportALL(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$validateNull(this.queryForm.documentName) && this.$validateNull(this.queryForm.documentId) &&
            this.$validateNull(this.queryForm.phone) && this.$validateNull(this.queryForm.platformId) && this.$validateNull(this.queryForm.date)) {
            this.$message.info('姓名、身份证号、手机号、平台编号、时间范围必输其一！')
            return
          }
          if (this.queryForm && this.queryForm.date && this.queryForm.date.length > 0) {
            const resDiff = this.$isDateDiffOver(this.queryForm.date[0], this.queryForm.date[1])
            if (resDiff) {
              this.$message.info('日期范围应在30天内')
              return
            }
          }
          const param = {
            documentName: this.queryForm.documentName,
            documentId: this.queryForm.documentId,
            phone: this.queryForm.phone,
            platformId: this.queryForm.platformId,
            startDate: this.$validateNull(this.queryForm.date) ? '' : this.queryForm.date[0],
            endDate: this.$validateNull(this.queryForm.date) ? '' : this.queryForm.date[1]
          }
          axios.post(Api.genericIfp, {
            sysHead: {
              'sceneId': 'bp/acct/cancel/query'
            },
            appHead: {
              totalNum: this.totalCount,
              currentPage: 1
            },
            body: param
          })
            .then(response => {
              if (response.body) {
                if (response.body instanceof Object) {
                  this.exportData = response.body.cancelAcctArray
                } else {
                  this.exportData = JSON.parse(response.body).cancelAcctArray
                }
                const jsonData = [...this.exportData]
                jsonData.map(item => {
                  item.platformId = this.$getLableBykey(item.platformId, this.platformIdList)
                  return item
                })
                console.log(jsonData)
                // 姓名、手机号、身份证号、平台编号(渠道)、电子账户、开户时间、销户时间
                import('@/vendor/Export2Excel').then(excel => {
                  const tHeader = ['姓名', '手机号', '身份证号', '平台编号', '电子账户', '开户时间', '销户时间']
                  const filterVal = ['documentName', 'phone', 'documentId', 'platformId', 'baseAcctNo', 'acctOpenDate', 'acctCloseDate']
                  const data = this.formatJson(filterVal, jsonData)
                  excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: 'eaQueryDestroyAccount',
                    autoWidth: true
                  })
                })
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    },
    // 对象数组 ==> Value数组
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.query('queryForm')
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.query('queryForm')
    }
  }
}
</script>

<style type="text/scss" lang="scss">
</style>
