<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" collection="user-info" field="username,gender,birth_date,weight,mobile,email,url,favorite_book_id,address_code,party_member,hobby,comment">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="data">
        <uni-list>
          <uni-list-item v-for="(item, index) in data" :key="index" showArrow :clickable="true" @click="handleItemClick(item._id)">
            <view slot="body">
              <!-- 此处默认显示为_id，请根据需要自行修改为其他字段 -->
              {{item._id}}
            </view>
          </uni-list-item>
        </uni-list>
      </view>
      <uni-load-more v-if="loading" :contentText="loadMore" status="loading"></uni-load-more>
    </unicloud-db>
    <uni-fab ref="fab" horizontal="right" vertical="bottom" :pop-menu="false" @fabClick="fabClick" />
  </view>
</template>

<script>
  export default {
    data() {
      return {
        loadMore: {
          contentdown: '',
          contentrefresh: '',
          contentnomore: ''
        },
		dataList:[]
      }
    },
    onPullDownRefresh() {
      this.$refs.udb.loadData({
        clear: true
      }, () => {
        uni.stopPullDownRefresh()
      })
    },
    onReachBottom() {
      this.$refs.udb.loadMore()
    },
	onLoad() {
		setTimeout(()=>{
			this.dataList = this.$refs.udb.dataList
		}, 2000);
	},
    methods: {
      handleItemClick(id) {
        uni.navigateTo({
          url: '/pages/user-info/detail?id=' + id
        })
      },
      fabClick() {
        // 打开新增页面
        uni.navigateTo({
          url: '/pages/user-info/add',
          events: {
            // 监听新增数据成功后, 刷新当前页面数据
            refreshData: () => {
              this.$refs.udb.loadData({
                clear: true
              })
            }
          }
        })
      }
    }
  }
</script>

<style>
</style>
