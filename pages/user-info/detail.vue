<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, loading, error}" collection="user-info" field="username,gender,birth_date,weight,mobile,email,url,favorite_book,address,party_member,hobby,comment" :where="queryWhere" :getone="true" :manual="true">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="loading">
        <uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
      </view>
      <view v-else-if="data">
          <view>   <text>生日</text>      <uni-dateformat :date="data.birth_date" :threshold="[0, 0]" />    </view>  <view>   <text>体重</text>      <text>{{data.weight}}</text>    </view>  <view>   <text>手机号码</text>      <text>{{data.mobile}}</text>    </view>  <view>   <text>邮箱账号</text>      <text>{{data.email}}</text>    </view>  <view>   <text>个人博客</text>      <text>{{data.url}}</text>    </view>  <view>   <text>喜欢的书</text>      <text>{{data.favorite_book}}</text>    </view>  <view>   <text>地址</text>      <text>{{data.address}}</text>    </view>  <view>   <text>是否为党员</text>      <text>{{data.party_member}}</text>    </view>  <view>   <text>业余爱好</text>      <text>{{data.hobby}}</text>    </view>  <view>   <text>备注</text>      <text>{{data.comment}}</text>    </view>  <view>   <text>真实姓名</text>      <text>{{data.username}}</text>    </view>  <view>   <text>性别</text>      <text>{{data.gender}}</text>    </view>  
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
          url: '/pages/user-info/edit?id=' + this._id,
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
              url: '/pages/user-info/list'
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
