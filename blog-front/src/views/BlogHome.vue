<template>
  <div class="home-container">
    <div class="card w-96 bg-base-100 shadow-xl">
      <figure class="px-10 pt-10">
        <img src="../assets/avator.jpeg" alt="Shoes" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">小磊</h2>
        <div class="flex gap-8">
          <span class="font-medium">文章 {{articles.length}}</span> 
          <span class="font-medium">标签 {{tags.length}}</span>   
        </div>
        <p class="font-normal text-sm	">千里之行,始于足下</p>
        <div class="card-actions">
          <button class="btn btn-primary btn-block	 w-full h-12"
          @click="this.$router.replace({ path: '/about'})">个人主页</button>
        </div>
        <div class="social-links">
          <a href="https://github.com/xiaoolei" target="_blank" class="text-blue-500 hover:text-blue-600">
            <i class="fa fa-github"></i> GitHub
          </a>
          <span class="mx-4">|</span> <!-- 分隔符 -->
          <a href="" class="text-green-500 hover:text-green-600">
            <i class="fa fa-weixin"></i> 微信
          </a>
          <!-- 可以继续添加其他链接 -->
        </div>
      </div>
    </div>
    <div class="flex gap-4 flex-row flex-wrap justify-center">
      <div v-for="article in articles" :key="article.id" class="card card-compact w-96 bg-base-100 shadow-xl">
        <figure><img src="../assets/avator.jpeg" alt="Album" /></figure>
        <div style="position: relative;" class="card-body">
          <h2 class="card-title">{{ article.title }}</h2>
          <p v-html="renderMarkdown(article.summary)"></p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary h-1.5"
              @click="this.$router.replace({ path: '/article/' + article.id })">阅读全文</button>
            <span class="absolute bottom-4 left-3 font-normal">发布于 {{formatTimestamp(article.create_time)}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tags flex flex-col gap-4">
      <p v-for="tag in tags" :key="tag.id" style="cursor: pointer;" :class="{ active: selectedTagId === tag.id }"
      class="text-lg font-medium"
        @click="filterByTags(tag.id)">{{ tag.name }}</p>
    </div>
  </div>
</template>

<script>
import { } from 'vue';
import { fetchArticles } from '@/api';
import MarkdownIt from 'markdown-it';

export default {
  data() {
    return {
      articles: [],
      md: new MarkdownIt({
        html: true,
        linkify: true,
        // 其他配置...
      }),
      selectedTagId: 0
    }
  },
  inject: ['tags'],
  methods: {
    renderMarkdown(text) {
      return this.md.render(text);
    },
    async loadArticles() {
      try {
        const data = await fetchArticles();
        const summaryLength = 200;
        for (const article of data) {
          // 确保article对象有content属性
          if (article && typeof article.content === 'string') {
            let summary = article.content.slice(0, summaryLength);
            // 如果内容被截断，添加省略号
            if (summary.length < article.content.length) {
              summary += '...';
            }
            // 设置文章的summary属性
            article.summary = summary;
          }
        }
        this.articles = data;
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    },
    filterByTags(id) {
      this.selectedTagId = id
      console.log("filter", id, this.selectedTagId)
    },
    formatTimestamp(timestamp) {
      // 将秒级别时间戳转换为毫秒级别
      const date = new Date(timestamp * 1000);

      // 获取年、月、日、时、分
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      // 返回格式化后的时间字符串
      return `${year}/${month}/${day} ${hours}:${minutes}`;
    }
  },
  mounted() {
    this.loadArticles();
  }
}

fetchArticles();

</script>

<style scoped>
.home-container {
  max-width: full;
  margin: 0 auto;
  padding: 20px;
  margin-top: 60px;
  display: flex;
  align-items: center;
  gap:20px;
}

.home-title {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.blog-list {
  list-style: none;
  padding: 0;
}

.blog-post {
  background-color: #f4f0f0;
  border-radius: 5px;
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-title {
  color: #333;
  margin: 10px;
  font-size: 1.5em;
}

.post-summary {
  margin: 10px;
  color: #666;
  line-height: 1.6;
  font-size: small;
}

.read-more {
  display: block;
  margin: 10px;
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
  text-align: center;
}

.tags {
  width: 20%;
}

.read-more:hover {
  background-color: #0056b3;
}

.active {
  color: rgb(48, 116, 199);
}
</style>