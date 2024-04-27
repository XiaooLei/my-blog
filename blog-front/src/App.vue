<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <header>
    <div class="navbar bg-base-100 h-5 fixed top-0 bg-gray-100">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <router-link to="/">博客</router-link>
            </li>
            <li>
              <router-link to="/new">写博客</router-link>
            </li>
            <li>
              <router-link to="/articles/edit">管理</router-link>
            </li>
            <li>
              <router-link to="/about">关于</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="navbar-center">
        <a class="btn btn-ghost text-xl">小磊的世界</a>
      </div>
      <div class="navbar-end">
        <div class="form-control">
          <input type="text" placeholder="Search" v-model="searchKey" @keydown.enter="handleSearch" class="input input-bordered w-24 md:w-auto" />
        </div>
        <div style="width:1%"></div>
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src="./assets/avator.jpeg" />
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="main-container">
    <router-view> </router-view>
  </div>
  <footer class="site-footer">
    <div class="footer-content">
      <p>© 2024 版权所有 - 小磊的世界</p>
      <p>保留所有权利。</p>
    </div>
  </footer>
</template>


<script>
// import HelloWorld from './components/HelloWorld.vue'
// import BlogHome from './views/BlogHome.vue'
import { userAuthStore } from '@/store';
export default {
  name: 'BlogApp',
  data() {
    return {
      activeIndex: '/about', // 如果你想在页面加载时默认激活"关于我"链接，可以设置为'/about'
      tags: [
        {
          id: 0,
          name: "全部",
        },
        {
          id: 1,
          name: "技术",
        },
        {
          id: 2,
          name: "旅行"
        },
        {
          id: 3,
          name: "生活"
        },
        {
          id: 4,
          name: "创业"
        },
        {
          id: 5,
          name: "恋爱"
        },
        {
          id: 6,
          name: "其他"
        }
      ],
        searchKey: ""
    };
  },
  provide() {
    return {
      tags: this.tags
    };
  },
  created() {
    this.store = userAuthStore(); // 将存储实例的创建移到 created 钩子中
  },
  methods: {
    handleMenuSelect(index) {
      // 根据 index 切换到对应的路由
      this.$router.push({ path: index });
    },
    handleSearch() {
      console.log("search word:", this.searchKey)
    }
  },
  components: {
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

/* 固定导航栏样式 */
header {
  position: fixed;
  /* 固定定位 */
  top: 0;
  /* 距离顶部的距离为0 */
  left: 0;
  /* 距离左侧的距离为0 */
  width: 100%;
  /* 宽度设置为100%，覆盖整个视口宽度 */
  z-index: 1000;
  /* 高层级，确保导航栏在其他内容之上 */
  background-color: #f6f5f5;
  /* 背景颜色，根据需要调整 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* 阴影效果，根据需要调整 */
}

.site-footer {
  background-color: #f2f2f2;
  padding: 20px 0;
  text-align: center;
  font-size: 0.875rem;
  color: #6c757d;
}


/* 头部容器样式 */
.avatar-container {
  display: flex;
  /* 启用Flexbox布局 */
  justify-content: space-between;
  /* 两端对齐，元素之间的间隔都相等 */
  align-items: center;
  /* 垂直居中 */
  padding: 0 20px;
  /* 根据需要添加内边距 */
}

/* 头像容器样式 */
.avatar-container img {
  width: 40px;
  /* 头像的宽度 */
  height: 40px;
  /* 头像的高度 */
  border-radius: 50%;
  /* 圆形头像 */
  border: 2px solid white;
  /* 边框，可根据需要调整 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  /* 阴影效果 */
  cursor: pointer;
  /* 鼠标悬停时显示手形光标 */
  transition: transform 0.3s ease;
  /* 鼠标悬停时的变换过渡效果 */
}


.footer-content {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 15px;
}

.el-menu-demo {
  background-color: #4b5a69;
  color: #000;
}

.main-container {
  margin-right: 2%;
  margin-left: 2%;
  min-height: 100vh;
}

</style>
