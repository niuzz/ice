<!-- order -->
<template>
  <div class='wrap'>
    <div class='date-wrap'>
      <div class='date-item' v-for="item in list" :key="item.key" @click="chooseOrder(item)">
        <div class='up'>
          <p class='month'> {{ item.tMonth }} 月</p>
          <p class='day'> {{ item.tDate }}</p>
        </div>
        <p class='week'> 周 {{ item.tWeek }} <i class='el-icon-check'></i></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },

  components: {},

  computed: {},

  mounted () {
    this._getDays(15)
  },

  methods: {
    _getDays (days) {
      this.list = this.orderList(days)
    },
    orderList (days) {
      let arr = []
      for (let index = 0; index < days; index++) {
        arr.push(this.getDate(index))
      }
      return arr
    },
    getDate (targetDaysNumber) {
      let today = new Date()

      let targetdayMilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * targetDaysNumber

      today.setTime(targetdayMilliseconds)

      let tYear = today.getFullYear()
      let tMonth = today.getMonth() + 1
      let tDate = today.getDate()
      let tWeek = this.transformWeek(today.getDay())

      return {
        key: targetdayMilliseconds,
        tYear,
        tMonth,
        tDate,
        tWeek
      }
    },
    transformWeek (week) {
      switch (week) {
        case 0:
          return '日'
        case 1:
          return '一'
        case 2:
          return '二'
        case 3:
          return '三'
        case 4:
          return '四'
        case 5:
          return '五'
        case 6:
          return '六'
        default:
          break
      }
    },
    chooseOrder (item) {
      this.$router.push({ path: '/detail?id=' + item.key })
    }
  }
}

</script>
<style lang='scss' scoped>
.date-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .date-item {
    width: 19%;
    margin-bottom: 10px;
    .up {
      background: rgb(190, 238, 245);
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      .month {
        padding: 10px 0;
      }
      .day {
        padding-bottom: 10px;
        font-size: 14px;
        font-weight: bold;
      }
    }
    p {
      font-size:12px;
      &.week {
        background: #fff;
        padding: 10px 0;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
  }
}
</style>
