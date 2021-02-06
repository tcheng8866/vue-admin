<template>
  <div class="datav-container">
    <data-v />
  </div>
</template>

<script>
import dataV from './components/datav/index.vue'

export default {
  name: 'DataV',
  components: {
    dataV
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.datav-container {
  overflow: hidden;
}
</style>
