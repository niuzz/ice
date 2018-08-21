// components/modal/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    backClick() {
      this.triggerEvent('hiddenModal')
    },

    btnClick() {
      console.log(222)
    }
  }
})
