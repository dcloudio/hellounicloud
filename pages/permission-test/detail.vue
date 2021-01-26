<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, loading, error}" collection="permission-test" field="nickname,username,state,phone" :where="queryWhere" :getone="true" :manual="true">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="loading">
        <uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
      </view>
      <view v-else-if="data">
          <view>   <text>nickname</text>      <text>{{data.nickname}}</text>    </view>  <view>   <text>username</text>      <text>{{data.username}}</text>    </view>  <view>   <text>state</text>      <text>{{data.state}}</text>    </view>  <view>   <text>phone</text>      <text>{{data.phone}}</text>    </view>  
      </view>
    </unicloud-db>
    <view class="btns">
      <button type="primary" @click="handleUpdate">修改</button>
      <button type="warn" @click="handleDelete">删除</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryWhere: '',
        loadMore: {
          contentdown: '',
          contentrefresh: '',
          contentnomore: ''
        }
      }
    },
    onLoad(e) {
      this._id = e.id
    },
    onReady() {
      if (this._id) {
        this.queryWhere = '_id=="' + this._id + '"'
      }
    },
    methods: {
      handleUpdate() {
        uni.navigateTo({
          url: '/pages/permission-test/edit?id=' + this._id,
          events: {
            refreshData: () => {
              this.$refs.udb.loadData({
                clear: true
              })
            }
          }
        })
      },
      handleDelete() {
        this.$refs.udb.remove(this._id, {
          success: (res) => {
            uni.navigateTo({
              url: '/pages/permission-test/list'
            })
          }
        })
      }
    }
  }
</script>

<style>
  .btns {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
  }

  .btns button {
    flex: 1;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
