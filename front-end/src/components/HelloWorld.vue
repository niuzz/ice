<template>
  <div class="hello">
    <h1>
      公众号授权测试
    </h1>
    <el-button type='primary' @click="test('sdk')">test sdk</el-button>
    <el-button type='primary' @click="test('oauth')">test oauth</el-button>
    <div style="margin-top: 20px;">
      <el-button type='primary' @click="test('direct')">test 重定向</el-button>
    </div>
  </div>
</template>

<script>
import { signature, oauth, test } from '@/api/'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
  },
  methods: {
    test (type) {
      if (type === 'sdk') {
        const url = window.location.href
        signature({ url }).then(response => {
          if (response.data.success) {
            const params = response.data.params
            this.$wx.config({
              debug: true,
              appId: params.appId,
              timestamp: params.timestamp,
              nonceStr: params.noncestr,
              signature: params.signature,
              jsApiList: ['hideAllNonBaseMenuItem', 'previewImage', 'chooseImage']
            })
            this.$wx.ready(() => {
              this.$wx.hideAllNonBaseMenuItem()
              console.log('success')
            })
          }
        })
      } else if (type === 'oauth') {
        const url = encodeURIComponent('http://vue.chinabyte.com')
        const visit = 'a'
        const id = 'b'
        oauth({url, visit, id}).then(response => {
          // const url = decodeURIComponent(response.data)
          console.log('redirect')
          // window.location = url
        })
      } else if (type === 'direct') {
        test().then(response => {
          console.log(response)
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
