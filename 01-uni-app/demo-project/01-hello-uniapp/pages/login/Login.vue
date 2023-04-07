<template>
  <view class="login">
    <uni-forms ref="formRef" :model-value="formData" :rules="formRules">
      <!-- 表单项：帐号 -->
      <uni-forms-item label="帐号" name="username" required>
        <uni-easyinput
          type="text"
          v-model="formData.username"
          placeholder="请输入帐号"
        ></uni-easyinput>
      </uni-forms-item>

      <!-- 表单项：密码 -->
      <uni-forms-item label="密码" name="password" required>
        <uni-easyinput
          type="password"
          v-model="formData.password"
          placeholder="请输入面膜"
        ></uni-easyinput>
      </uni-forms-item>
    </uni-forms>

    <button type="default" @click="onSubmitClick">提交信息</button>
    <button type="default" @click="onResetClick">重置</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      // 验证规则
      formRules: {
        username: {
          rules: [
            {
              required: true,
              errorMessage: '请输入帐号'
            }
          ]
        },
        password: {
          rules: [
            {
              required: true,
              errorMessage: '请输入密码'
            },
            {
              minLength: 6,
              maxLength: 8,
              errorMessage: '请输入6-8位的密码'
            }
          ]
        }
      }
    }
  },
  methods: {
    onSubmitClick() {
      console.log('onSubmitClick')
      this.$refs.formRef
        .validate()
        .then(res => {
          console.log('onSubmitClick res:', res)
        })
        .catch(err => {
          console.log('onSubmitClick err:', err)
        })
    },
    onResetClick() {
      console.log('onResetClick')
      this.$refs.formRef.clearValidate()
      Object.keys(this.formData).forEach(key => {
        this.formData[key] = ''
      })
    }
  }
}
</script>

<style lang="less">
// 小程序端可，可直接使用类选择器进行重置。
.uni-forms-item__label {
  color: blue;
  padding-left: 10rpx;
}

// 如果要适配 H5，App 和小程序，需要使用 :deep/:global + !important
:deep(.uni-forms-item__label) {
  color: orange !important;
}

:global(.uni-forms-item__label) {
  color: green !important;
}
</style>
