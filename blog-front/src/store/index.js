// store/index.js
import { defineStore } from 'pinia';

export const userAuthStore = defineStore('auth', {
  // 定义 state 属性
  state: () => ({
    isAuthenticated: false,
  }),
  // 定义 getters，类似于 Vuex 的 getters
  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
  },
  // 定义 actions，用于处理异步登录和注销逻辑
  actions: {
    async login(credentials) {
      try {
        // 这里应该是登录逻辑，比如调用 API 验证用户凭证
        // 验证成功后，我们假设从服务器获取用户信息
        // const user = await someApiLogin(credentials);
        console.log(credentials);
        this.isAuthenticated = true;
        // this.currentUser = user;
      } catch (error) {
        // 处理登录错误，例如显示错误消息
        console.error('Login failed:', error);
      }
    },
    logout() {
      // 这里应该是注销逻辑，比如调用 API 清除用户凭证
      // 清除当前用户信息和登录状态
      this.isAuthenticated = false;
      this.currentUser = null;
    },
    loginSuccess() {
        localStorage.setItem('isAuthenticated', true);
        this.isAuthenticated = true;
    }
  },
});