<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, loading, error}" collection="article" :where="queryWhere" :getone="true" :manual="true">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="loading">
        <uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
      </view>
      <view v-else-if="data">
          <view>   <text>组织机构</text>      <text>{{data.organization}}</text>    </view>  <view>   <text>组织名称</text>      <text>{{data.text1}}</text>    </view>  <view>   <text>备注</text>      <text>{{data.text2}}</text>    </view>  <view>   <text>姓名</text>      <text>{{data.text3}}</text>    </view>  <view>   <text>邮箱账号</text>      <text>{{data.email}}</text>    </view>  <view>   <text>下载地址</text>      <text>{{data.dowload_url}}</text>    </view>  <view>   <text>选项来源data-list表</text>      <text>{{data.enum_link}}</text>    </view>  <view>   <text>地址</text>      <text>{{data.address}}</text>    </view>  <view>   <text>整数框</text>      <text>{{data.user_number}}</text>    </view>  <view>   <text>生产日期</text>      <uni-dateformat :date="data.birth_date" :threshold="[0, 0]" />    </view>  <view>   <text>开关</text>      <text>{{data.charge}}</text>    </view>  <view>   <text>多选框</text>      <text>{{data.system}}</text>    </view>  
      </view>
    </unicloud-db>
    <view>
      <button type="primary" @click="handleUpdate">更新</button>
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
          url: './edit?id=' + this._id,
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
              url: '/pages/article/list'
            })
          }
        })
      }
    }
  }
</script>

<style>
</style>
