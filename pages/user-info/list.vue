<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" collection="user-info" field="username,gender,birth_date,weight,mobile,email,url,favorite_book,address,party_member,hobby,comment">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="data">
        <uni-list>
          <uni-list-item v-for="(item, index) in data" :key="index" showArrow :to="navigateToPage+item._id">
            <view slot="body">
              {{item._id}}
            </view>
          </uni-list-item>
        </uni-list>
      </view>
      <uni-load-more v-if="loading" :contentText="loadMore" status="loading"></uni-load-more>
    </unicloud-db>
    <uni-fab ref="fab" horizontal="right" vertical="bottom" @fabClick="fabClick" />
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
        navigateToPage: '/pages/user-info/detail?id='
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
    methods: {
      fabClick() {
        uni.navigateTo({
          url: '/pages/user-info/add'
        })
      }
    }
  }
</script>

<style>
</style>
