<template>
  <div class="app-container">
    <el-button @click="show()">生成二维码</el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      center
      width="30%"
    >
      <div class="position">
        <div ref="cutScreen" class="cutScreen">
          <div id="qrcode" ref="qrcode" class="qrcode" />
          <div style="padding: 10px; width: 200px;">谢谢惠顾！</div>
        </div>
        <img ref="newImage" :src="dataURL" class="newImage">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="html2canvas()">html2canvas截屏</el-button>
        <el-button @click="download()">下载</el-button>
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2' // 引入qrcode
import html2canvas from 'html2canvas'

export default {
  name: 'Qrcodejs2',
  data() {
    return {
      url: 'http://www.baidu.com',
      dialogVisible: false,
      dataURL: ''
    }
  },
  methods: {
    async show() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.qrcode()
      })
    },
    qrcode() {
      document.getElementById('qrcode').innerHTML = ''
      // document.getElementById('newImage').innerHTML = ''
      new QRCode('qrcode', {
        width: 200,
        height: 200,
        text: this.url, // 二维码地址
        colorDark: '#000',
        colorLight: '#fff'
      })
    },
    html2canvas() {
      // 不能有竖向滚动条，不然会导致异常
      html2canvas(this.$refs.cutScreen, {
        logging: false, // 日志开关，便于查看html2canvas的内部执行流程
        // scrollY: 0,
        // scrollX: 0,
        useCORS: true // 【重要】开启跨域配置
      }).then(canvas => {
        const dataURL = canvas.toDataURL('image/png')
        this.dataURL = dataURL
      })
    },
    async download() {
      const aLink = document.createElement('a')
      const evt = document.createEvent('HTMLEvents')
      evt.initEvent('click', true, true)
      aLink.download = '标题'
      aLink.href = this.$refs.newImage.src
      aLink.click()
    }
  }
}
</script>

<style lang="scss" scoped>
.position {
  position: relative;
  text-align: center;
  transform: translateX(-50%);
  width: 200px;
  left: 50%;
}
.cutScreen {
  position: relative;
  text-align: center;
  width: 200px;
  // height: 230px;
  height: 100%;
  .qrcode {
    position: relative;
    width: 200px;
    height: 200px;
  }
}
.newImage {
  position: absolute;
  left: 0;
  top: 0;
  width: 200px;
  height: 250px;
}
</style>
