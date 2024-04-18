import { createRouter, createWebHistory } from 'vue-router';
import BlogHome from '../views/BlogHome.vue';
import BlogArticle from '../views/BlogArticle.vue';
import AboutMe from '../views/AboutMe.vue';
import EditBlog from '@/views/EditBlog.vue';
import EditBlogs from '@/views/EditBlogs.vue';
import AddBlog from '@/views/AddBlog.vue';
import BlogLogin from '@/views/BlogLogin.vue';

const routes = [
  {
    path: '/',
    component: BlogHome
  },
  {
    path: '/article/:id',
    component: BlogArticle,
    props: true, // 这允许从路由参数中传递 props
  },
  {
    path: '/about',
    component: AboutMe
  },
  {
    path: '/article/edit/:id',
    component: EditBlog,
    props: true, // 这允许从路由参数中传递 props
    meta: { requiresAuth: true } // 表示需要登录
  },
  {
    path: '/articles/edit',
    component: EditBlogs,
    meta: { requiresAuth: true } // 表示需要登录
  },
  {
    path: '/new',
    component: AddBlog,
    meta: { requiresAuth: true } // 表示需要登录
  },
  {
    path: '/login',
    component: BlogLogin
  }
];

// 创建router实例
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;