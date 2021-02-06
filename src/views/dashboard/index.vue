<template>
  <div class="app-container">
    <a href="https://github.com/tcheng8866/vue-admin">点击查看说明文档</a>
    <div>{{ this.$store.state.app }}</div>
    <div>{{ this.$store.state.settings }}</div>
    <div>{{ this.$store.state.user }}</div>
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
