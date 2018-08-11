<template>
  <div class="hello">
    <img src="../assets/logo.png">
    <h1 @click="$router.push({path: '/order'})" style="cursor: pointer">
      公众号授权测试
    </h1>
    <x-button type='primary' @click.native="test('sdk')">test sdk</x-button>
    <x-button type='primary' @click.native="test('redirect')">test oauth</x-button>
    <x-button type='primary' @click.native="test('userInfo')">get UserInfo</x-button>
    <x-button type='primary' @click.native="test('serviceRedirect')">跳转</x-button>
  </div>
</template>

<script>
import { signature, redirect, oauth } from '@/api/'
import { XButton } from 'vux'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
  },
  components: {
    XButton
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
      } else if (type === 'redirect') {
        const url = encodeURIComponent('http://vue.chinabyte.com')
        const visit = 'a'
        const id = 'b'
        redirect({url, visit, id}).then(response => {
          window.location = response.data
        })
      } else if (type === 'userInfo') {
        let params = (new URL(document.location)).searchParams
        let code = params.get('code')
        console.log(code)
        oauth({code}).then(response => {
          console.log(response.data)
        })
      } else if (type === 'serviceRedirect') {
        this.$router.push('/order')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  text-align: center;
  h1 {
    margin-bottom: 1em;
  }
}

</style>
