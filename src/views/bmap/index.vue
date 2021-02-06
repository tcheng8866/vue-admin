<template>
  <div class="app-container">
    <baidu-map class="bmap" :center="center" :zoom="15" :scroll-wheel-zoom="true">
      <bm-marker :position="markerPoint" :dragging="true" @click="infoWindowOpen">
        <bm-info-window :show="true" @close="infoWindowClose" @open="infoWindowOpen">我爱北京天安门</bm-info-window>
      </bm-marker>
      <!-- 缩略图 -->
      <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :is-open="true" />
    </baidu-map>
  </div>
</template>

<script>
export default {
  name: 'Bmap',
  data() {
    return {
      center: '北京', // 直接字符串 “北京”
      markerPoint: { lng: 116.404, lat: 39.915 }
    }
  },
  methods: {
    infoWindowClose() {
      this.show = false
    },
    infoWindowOpen() {
      this.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
.bmap {
  // 处理高度：屏幕高度-topbar
  height: calc(100vh - 84px);
}
</style>
