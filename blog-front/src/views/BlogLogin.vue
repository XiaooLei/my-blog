<template>
  <div class="form-container">
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="账号">
        <el-input v-model="form.account" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" class="button-center" @click="onSubmit">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { tryLogin } from "@/api/index.js"
import { userAuthStore } from '@/store';
import { ElMessage } from 'element-plus';
export default {
  data() {
    return {
      form: {
        account: "",
        password: "",
      }
    }
  },
  created() {
    this.store = userAuthStore(); // 将存储实例的创建移到 created 钩子中
  },
  methods: {
    // do not use same name with ref
    async onSubmit() {
      const response = await tryLogin(this.form.account, this.form.password);
      console.log("response:", response)
      console.log("this.store.isAuthenticated:", this.store.isLoggedIn)
      if (response.message == "success") {
        localStorage.setItem('isAuthenticated', true);
        this.store.loginSuccess()
        console.log("登录成功")
        ElMessage.success('登录成功！');
        console.log("this.store.isAuthenticated:", this.store.isLoggedIn)
        const redirect = localStorage.getItem('redirect');
        if (redirect) {
          this.$router.replace(redirect).then(() => { localStorage.removeItem('redirect'); });
        } else {
          this.$router.push('/');
        }

      } else {
        console.log("登录失败")
      }
    }
  }
}
</script>

<style>
.form-container {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  height: 600px;
}

.button-center {
  display: flex;
  justify-content: center;
  width: 100px;
}
</style>