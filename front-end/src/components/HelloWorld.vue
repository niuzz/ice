<template>
  <div class="hello">
    <h1>
      test-page
    </h1>
    <el-button type='primary' @click="test">test server</el-button>
  </div>
</template>

<script>
import { signature } from '@/api/'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    console.log(this.$wx)
  },
  methods: {
    test () {
      const url = window.location.href
      signature({ url }).then(response => {
        console.log(response)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
