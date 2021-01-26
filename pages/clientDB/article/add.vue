
<template>
  <view class="uni-container">
    <uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
      <uni-forms-item name="organization" label="组织机构">
  <uni-data-checkbox v-model="formData.organization" :localdata="formOptions.organization_localdata" />
</uni-forms-item>
<uni-forms-item name="text1" label="组织名称">
  <uni-easyinput placeholder="个人填姓名，公司写完整名称" v-model="formData.text1" />
</uni-forms-item>
<uni-forms-item name="text2" label="备注">
  <uni-easyinput placeholder="拒绝违禁词,如：test" v-model="formData.text2" />
</uni-forms-item>
<uni-forms-item name="text3" label="姓名">
  <uni-easyinput placeholder="限制只能输入中文" v-model="formData.text3" />
</uni-forms-item>
<uni-forms-item name="email" label="邮箱账号">
  <uni-easyinput placeholder="请输入你的邮箱账号" v-model="formData.email" />
</uni-forms-item>
<uni-forms-item name="dowload_url" label="下载地址">
  <uni-easyinput placeholder="请输入网址的地址" v-model="formData.dowload_url" />
</uni-forms-item>
<uni-forms-item name="enum_link" label="选项来源data-list表">
  <uni-data-checkbox v-model="formData.enum_link" collection="data-list" field="text, _id as value" orderby="desc" />
</uni-forms-item>
<uni-forms-item name="address" label="地址">
  <uni-data-picker self-field="code" parent-field="parent_code" v-model="formData.address" collection="opendb-city-china" orderby="value asc" field="code as value, name as text"></uni-data-picker>
</uni-forms-item>
<uni-forms-item name="user_number" label="整数框">
  <uni-easyinput placeholder="请输入-100<=，<100的整数" type="number" v-model="formData.user_number" />
</uni-forms-item>
<uni-forms-item name="birth_date" label="生产日期">
  <uni-datetime-picker :timestamp="true" :value="formData.birth_date" />
</uni-forms-item>
<uni-forms-item name="charge" label="开关">
  <switch @change="binddata('charge', $event.detail.value)" :checked="formData.charge" />
</uni-forms-item>
<uni-forms-item name="system" label="多选框">
  <uni-data-checkbox :multiple="true" v-model="formData.system" :localdata="formOptions.system_localdata" />
</uni-forms-item>

      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import validator from '@/js_sdk/validator/article.js';

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dbCollectionName = 'article';

  function getValidator(fields) {
    let reuslt = {}
    for (let key in validator) {
      if (fields.indexOf(key) > -1) {
        reuslt[key] = validator[key]
      }
    }
    return reuslt
  }

  export default {
    data() {
      return {
        formData: {
  "organization": 0,
  "text1": "",
  "text2": "",
  "text3": "",
  "email": "",
  "dowload_url": "",
  "enum_link": "",
  "address": "",
  "user_number": null,
  "birth_date": null,
  "charge": null,
  "system": []
},
        formOptions: {
  "organization_localdata": [
    {
      "text": "个人",
      "value": 0
    },
    {
      "text": "公司",
      "value": 1
    }
  ],
  "system_localdata": [
    {
      "text": "Mac",
      "value": "Mac"
    },
    {
      "text": "Windows",
      "value": "Windows"
    },
    {
      "text": "Linux",
      "value": "Linux"
    }
  ]
},
        rules: {
          ...getValidator(["organization","text1","text2","text3","email","dowload_url","enum_link","address","user_number","birth_date","charge","system"])
        }
      }
    },
    mounted() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      /**
       * 触发表单提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.submit().then((res) => {
          this.submitForm(res)
        }).catch((errors) => {
          uni.hideLoading()
        })
      },

      submitForm(value) {
        // 使用 uni-clientDB 提交数据
        db.collection(dbCollectionName).add(value).then((res) => {
          uni.showToast({
            icon: 'none',
            title: '新增成功'
          })
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        }).finally(() => {
          uni.hideLoading()
        })
      }
    }
  }
</script>

<style>
  .uni-container {
    padding: 15px;
  }

  .uni-input-border,
  .uni-textarea-border {
    width: 100%;
    font-size: 14px;
    color: #666;
    border: 1px #e5e5e5 solid;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .uni-input-border {
    padding: 0 10px;
    height: 35px;

  }

  .uni-textarea-border {
    padding: 10px;
    height: 80px;
  }

  .uni-button-group {
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }

  .uni-button {
    width: 184px;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    line-height: 1;
    margin: 0;
  }
</style>

