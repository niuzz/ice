<!-- register -->
<template>
  <div class='wrap'>
    <group>
      <x-input v-model="mobile" placeholder="请输入手机" title="手机" is-type="china-mobile" required ref="mobile">
        <i class='common nj-user' slot="label" style="padding-right:10px;display:inline-block; "></i>
      </x-input>
      <x-input v-model="password" placeholder="请输入密码" title="密码" ref="password"></x-input>
      <x-input v-model="realName" placeholder="请输入姓名" title="姓名" ref="realName"></x-input>
      <toast v-model="show" type="cancel" :time="800" is-show-mask :text="toastContent" position="default">{{ toastContent }}</toast>
    </group>
    <group>
      <x-button type="primary" @click.native="submit">提交</x-button>
    </group>
  </div>
</template>

<script>
import { XButton, XInput, Group, Toast } from 'vux'
import { register } from '@/api/user'

export default {
  data () {
    return {
      mobile: '',
      password: '',
      realName: '',
      toastContent: '',
      show: false
    }
  },

  components: {
    XButton,
    XInput,
    Group,
    Toast
  },

  computed: {},

  mounted () {},

  methods: {
    submit () {
      if (this.$refs.mobile.valid && this.$refs.realName.valid && this.$refs.password.valid) {
        let params = {}
        params.realName = this.realName
        params.mobile = this.mobile
        params.password = this.password
        params.role = '5b69678871bce95223c3508c'
        register(params).then(response => {
          console.log(response)
        })
      } else {
        this.toastContent = '请完善个人信息再提交'
        this.show = true
      }
    }
  }
}

</script>
<style lang='less' scoped>

</style>
