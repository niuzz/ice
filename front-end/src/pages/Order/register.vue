<!-- register -->
<template>
  <div class='wrap'>
    <group>
      <x-input v-model="mobile" placeholder="请输入手机" title="手机"></x-input>
      <x-input v-model="password" placeholder="请输入密码" title="密码"></x-input>
      <x-input v-model="realName" placeholder="请输入姓名" title="姓名"></x-input>

    </group>
    <group>
      <x-button type="primary">提交</x-button>
    </group>
  </div>
</template>

<script>
import { XButton, XInput, Group } from 'vux'

export default {
  data () {
    return {
      mobile: '',
      password: '',
      realName: ''
    }
  },

  components: {
    XButton,
    XInput,
    Group
  },

  computed: {},

  mounted () {},

  methods: {}
}

</script>
<style lang='less' scoped>

</style>
