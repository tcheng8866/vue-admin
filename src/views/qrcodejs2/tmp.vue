<template>
  <div class="app-container">
    <el-button @click="show()">生成二维码</el-button>
    <div ref="cutScreen">
      <div id="qrcode" ref="qrcode" />
      <div>谢谢惠顾！</div>
    </div>
    <el-button @click="download()">下载</el-button>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2' // 引入qrcode
export default {
  name: 'Qrcodejs2',
  data() {
    return {
      url: 'http://www.baidu.com'
    }
  },

  methods: {
    show() {
      this.$refs.qrcode.innerHTML = ''
      this.qrcode()
    },
    qrcode() {
      new QRCode('qrcode', {
        width: 132,
        height: 132,
        text: this.url, // 二维码地址
        colorDark: '#000',
        colorLight: '#fff'
      })
    },
    download() {
      const myCanvas = document.getElementById('qrcode').getElementsByTagName('canvas')
      const a = document.createElement('a')
      a.href = myCanvas[0].toDataURL('image/png')
      a.download = '付款二维码'
      a.click()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
