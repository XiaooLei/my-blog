<template>
  <!-- <div class="home-container min-h-screen "> -->
  <div class="flex h-screen overflow-hidden home-container">
    <div style="margin-top: 40px;">
      <div class="card w-48 h-auto bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
          <img src="../assets/avator.jpeg" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">小磊</h2>
          <div class="flex gap-8">
            <span class="font-medium">文章 {{ articles.length }}</span>
            <span class="font-medium">标签 {{ tags.length }}</span>
          </div>
          <p class="font-normal text-sm	">千里之行,始于足下</p>
          <div class="card-actions">
            <button class="btn btn-primary btn-block	 w-full h-12"
              @click="this.$router.push({ path: '/about' })">个人主页</button>
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
    </div>
    <div class="flex overflow-y-auto gap-4 flex-row flex-wrap justify-center py-5" style="min-width: 60%;">
      <!-- <div style="height: 20px; width:auto">xxxx </div> -->
      <div v-for="article in articlesTaged" :key="article.id" class="card card-compact w-96 bg-base-100 shadow-xl">
        <figure><img src="../assets/avator.jpeg" alt="Album" /></figure>
        <div style="position: relative;" class="card-body">
          <h2 class="card-title">{{ article.title }}</h2>
          <p v-html="renderMarkdown(article.summary)"></p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary h-1.5"
              @click="this.$router.push({ path: '/article/' + article.id })">阅读全文</button>
            <span class="absolute bottom-4 left-3 font-normal">发布于 {{ formatTimestamp(article.create_time) }}</span>
          </div>
        </div>
      </div>

      <span v-show="articlesTaged.length===0">没有该标签的文章哦</span>
    </div>
    <div class="tags flex flex-col gap-4">
      <p v-for="tag in tags" :key="tag.id" style="cursor: pointer;"
        :class="['hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring', { active: selectedTagId === tag.id }]"
        class="text-lg font-medium" @click="filterByTags(tag.id)">{{ tag.name }}</p>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import { } from 'vue';
import { fetchArticles } from '@/api';
import MarkdownIt from 'markdown-it';

export default {
  data() {
    return {
      articles: [],
      articlesTaged:[],
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
        // console.log("data_1:", data)
        const summaryLength = 200;
        for (const article of data) {
          // 确保article对象有content属性
          if (article && typeof article.content === 'string') {
            let summary = article.content.slice(0, summaryLength);
            // 如果内容被截断，添加省略号
            if (summary.length < article.content.length) {
              summary += '...';
            }
            // console.log("article.tags:", article.tags)
            // 设置文章的summary属性
            article.summary = summary;
            if (article.tags === undefined) {
              article.tags = ""
            }
            // console.log("article.tags 2:", article.tags)
            article.tags = article.tags.split(',').map(element => {return Number(element);})
            // console.log("article.tags 3:", article.tags)
          }
        }
        console.log("data:", data)
        this.articles = data;
        this.articlesTaged = this.articles;
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    },
    filterByTags(id) {
      if (id===0) {
        this.articlesTaged = this.articles
        return
      }
      this.selectedTagId = id
      let filteredArticles = []
      console.log("debug articles:", this.articles)
      console.log("filter tag id:", id)
      for (let article of this.articles) {
        console.log("debug article one:", article)
        if (article.tags.includes(id)) {
          filteredArticles.push(article)
        }
      }
      console.log("filter", id, this.selectedTagId)
      console.log("filtered articles:", filteredArticles)
      this.articlesTaged = filteredArticles
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

// fetchArticles();

</script>

<style scoped>
.home-container {
  max-width: full;
  margin: 0 auto;
  /* padding: 20px; */
  margin-top: 60px;
  gap: 20px;
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
  margin-top: 20%;
  width: 20%;
}

.read-more:hover {
  background-color: #0056b3;
}

.active {
  color: rgb(48, 116, 199);
}
</style>