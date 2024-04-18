import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {userAuthStore} from './store';
import { createPinia } from 'pinia';
import './app.css';




// 创建一个包含所有 Element Plus 组件的对象
const components = Object.values(ElementPlus);

document.documentElement.style.setProperty('--background-color', '#fff0f0');

// 基于根组件 创建 Vue 应用程序
const app = createApp(App);

// 遍历并注册所有 Element Plus 组件
components.forEach(component => {
    app.component(component.name, component);
});
// 注册所有 Element Plus Icon 组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const pinia = createPinia();

// 使用路由器实例
app.use(pinia);
app.use(router);
app.use(ElementPlus);
app.use({ state: userAuthStore });
app.config.errorHandler = (err) => {
  /* 处理错误 */
  console.log(err)
}

const store = userAuthStore();

// 路由守卫
router.beforeEach((to, from, next) => {
  // 检查用户是否已登录，这里我们假设 Vuex 中有一个 state 叫做 isAuthenticated
  if (to.meta.requiresAuth && !localStorage.getItem('isAuthenticated')) {
    console.log("校验身份失败", to.path, from.path, store.isLoggedIn)
    // 如果用户未登录，重定向到登录页面
    localStorage.setItem('redirect', to.path); // 将目标路由保存到localStorage
    next({ path: '/login' });
  } else {
    console.log("校验身份成功！", to.path, from.path, localStorage.getItem('isAuthenticated'))
    next(); // 如果用户已登录或路由不需要身份验证，继续路由
  }
});


// 挂载应用程序
app.mount('#app');